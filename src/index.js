import Web3 from 'web3'
import express, { Router } from 'express'
import Promise, { promisifyAll } from 'bluebird'
import KeystoreGenerator from './KeystoreGenerator'

import analyticsProcessor from './analytics/index'
import configureAnalytics from './analytics/configure'

import auctionProcessor from './auction/index'
import configureAuction from './auction/configure'

import { smtpServer, smtpHandleAuth } from './smtp/index'
import { socketHandler, socketRouter } from './websocket/index'

import {
  retrieveDetails,
  faucet,
  calculateRewardBonus,
  parseGitHubEvents,
  parsePushEvent,
  parseRepositoryStats,
  retrieveGitHubUser,
  getAuctionPrice
} from './utils/index'

import gittokenAPI from './api/index'
import { gittokenHyperlog, logMessage, logExchange, logVote } from './hyperlog/index'

import {
  handleLogin,
  handleVerification,
  handleContractDetails,
  handleAuthentication,
  ping,
  push,
  pullRequest,
  milestone,
  organization
} from './events/index'

import {
  getContractDetails,
  getSavedContract,
  createGitTokenContract,
  saveContractDetails,
  generateReward,
  verifyContributor,
  initializeAuction
} from './contract/index'

import GitTokenContract from 'gittoken-contracts/build/contracts/GitToken.json'

export default class GitTokenMiddleware extends KeystoreGenerator {
  constructor(options) {
    super(options)
    const { isGitHubHook, config, web3Provider, dirPath, contractFile, faucetActive, mysqlOpts } = options

    this.mysqlOpts        = mysqlOpts
    this.faucetActive     = faucetActive
    this.dirPath          = dirPath
    this.contractFile     = contractFile
    this.gittokenContract = JSON.parse(GitTokenContract)
    this.isGitHubHook     = isGitHubHook
    this.config           = config

    // this.dirPath = dirPath
    // this.web3Provider = web3Provider
    // this.web3 = new Web3(new Web3.providers.HttpProvider(web3Provider))
    // this.eth = promisifyAll(this.web3.eth)
    // this.smtpHandleAuth = smtpHandleAuth.bind(this)
    // this.smtpServer = smtpServer.bind(this)
    // this.smtpServer({
    //   onAuth: this.smtpHandleAuth
    // })


    // this.gittokenSQLite = gittokenSQLite.bind(this)
    this.gittokenHyperlog      = gittokenHyperlog.bind(this)
    this.logMessage            = logMessage.bind(this)
    this.logExchange           = logExchange.bind(this)
    this.logVote               = logVote.bind(this)
    this.handleLogin           = handleLogin.bind(this)
    this.verifyContributor     = verifyContributor.bind(this)
    this.initializeAuction     = initializeAuction.bind(this)
    this.handleVerification    = handleVerification.bind(this)
    this.handleAuthentication  = handleAuthentication.bind(this)
    this.handleContractDetails = handleContractDetails.bind(this)

    this.gittokenHyperlog({})

    this.socketHandler = socketHandler.bind(this)
    this.socketRouter  = socketRouter.bind(this)
    this.socketHandler({})

    // Setup Analytics Processor
    this.analyticsProcessor = analyticsProcessor.bind(this)
    this.configureAnalytics = configureAnalytics.bind(this)
    this.analyticsProcessor({})

    // Setup Auction Processor
    this.auctionProcessor = auctionProcessor.bind(this)
    this.configureAuction = configureAuction.bind(this)
    this.auctionProcessor({})

    // Bind event methods to class scope
    this.ping         = ping.bind(this)
    this.push         = push.bind(this)
    this.pullRequest  = pullRequest.bind(this)
    this.milestone    = milestone.bind(this)
    this.organization = organization.bind(this)

    // bind utility methods to class scope
    this.getSavedContract       = getSavedContract.bind(this)
    this.createGitTokenContract = createGitTokenContract.bind(this)
    this.saveContractDetails    = saveContractDetails.bind(this)
    this.getContractDetails     = getContractDetails.bind(this)
    this.retrieveDetails        = retrieveDetails.bind(this)
    this.parsePushEvent         = parsePushEvent.bind(this)
    this.parseRepositoryStats   = parseRepositoryStats.bind(this)
    this.parseGitHubEvents      = parseGitHubEvents.bind(this)
    this.retrieveGitHubUser     = retrieveGitHubUser.bind(this)
    this.getAuctionPrice        = getAuctionPrice.bind(this)
    this.faucet                 = faucet.bind(this)
    this.generateReward         = generateReward.bind(this)
    this.calculateRewardBonus   = calculateRewardBonus.bind(this)
    this.gittokenAPI            = gittokenAPI.bind(this)

    /**
     * TODO Replace this with database
     */
    this.middlewareState = {
      accounts: {},
      contract: {},
      blockchain: {}
    }

  }

  routeRequests () {
    let router = Router()

    router.post('/verify/:address', (req, res) => {
      this.handleVerification({
        user: req.user,
        address: req.params.address
      })
      .then((authStatus) => {
        const { code, data } = authStatus
        res.status(code).send(data)
      })
      .catch((error) => {
        // console.log('/verify/:address::error', error)
        res.status(500).send(error)
      })
    })

    router.post('/', (req, res, next) => {
      const { headers, body } = req
      Promise.resolve().then(() => {
        if (this.isGitHubHook) {
          // console.log('GitHub WebHook Request')
          return this.handleGitHubWebHookEvent({
            event: headers['x-github-event'],
            data: { headers, body }
          })
        } else {
          throw new Error('Request not yet configured')
        }
      }).then((response) => {
        res.status(200).send(JSON.stringify(response, null, 2))
      }).catch((error) => {
        console.log('routeRequests::error', error)
        res.status(500).send(error.message)
      })
    })

    router.post('/faucet/:address', (req, res, next) => {
      if (!this.faucetActive) {
        res.status(500).send(JSON.stringify({
          message: `Faucet is not active! Set { faucetActive: true } to enable`
        }, null, 2))
      } else {
        let from
        this.importKeystore({}).then((_ks) => {
          from = `0x${this.ks.getAddresses()[0]}`
          return this.eth.getBalanceAsync(from)
        }).then((balance) => {
          console.log(`Balance of ${from}::balance`, balance)
          if (balance.toNumber() > 2e16) {
            return this.signTransaction({
              to: `0x${req.params.address}`,
              from,
              value: 2e16,
              gasLimit: 4e6,
              data: null
            })
          } else {
            res.status(500).send(JSON.stringify({
              message: `Faucet does not have enough funds! Send funds to ${from}`,
              balance
            }, null, 2))
          }
        }).then((signedTx) => {
          // console.log('`0x${signedTx}`', `0x${signedTx}`)
          return this.eth.sendRawTransactionAsync(`0x${signedTx}`)
        }).then((txHash) => {
          // console.log('txHash', txHash)
          return this.getTransactionReceipt(txHash)
        }).then((txReceipt) => {
          // console.log('txReceipt', txReceipt)
          res.status(200).send(txReceipt)
        }).catch((error) => {
          res.status(500).send(error.message)
        })
      }
    })

    router.use('/api/v1', this.gittokenAPI)

    return router
  }

  handleGitHubWebHookEvent ({ event, data }) {
    return new Promise((resolve, reject) => {
      // console.log('handleGitHubWebHookEvent::event', event)
      // console.log('handleGitHubWebHookEvent::data', data)

      switch(event) {
        case 'ping':
          resolve(this.ping({ event, data }))
          break;
        case 'milestone':
          resolve(this.milestone({ event, data }))
          break;
        case 'organization':
          resolve(this.organization({ event, data }))
          break;
        default:
          resolve(this.generateReward({
            rewardType: event,
            deliveryID: data['headers']['x-github-delivery'],
            contributorUsername: data['body']['sender']['login'],
            rewardBonus: 0,
            reservedType: ''
          }))
          // let error = new Error('Invalid Event Found')
          // reject(error)
      }
    })
  }

}
