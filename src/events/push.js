import Promise from 'bluebird'

export default function push ({ body }) {
  return new Promise((resolve, reject) => {
    const { pusher } = body
    this.importKeystore({}).then((_ks) => {
      console.log('test')
      return this.generateReward({
        rewardType: 'push',
        contributorEmail: pusher['email']
      })
    }).then((txReceipt) => {
      resolve(txReceipt)
    }).catch((error) => {
      reject(error)
    })
  })
}
