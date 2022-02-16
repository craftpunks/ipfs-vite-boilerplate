import './style.css'
import toBuffer from 'it-to-buffer'

const cid = 'QmbmesdSusHcvhZwaE4KS8AhhQZS8KEidbiouns3zDCtPX'

/*const updatePeersCount = (node) => {
  const peers = document.getElementById('peers')
  setInterval(async () => {
    console.log(await node.swarm.peers())
    //peers.innerHTML = await  node.swarm.peers()
  }, 1000)
}*/

const init = async () => {
  console.log('Init IPFS')
  const IpfsModule = await import('./src/modules/ipfs-core/ipfs-core.js')
  const IPFS = IpfsModule.default;
  console.log(IPFS)
  const node = await IPFS.create({
    preload: {enabled: true},
  })
  console.log(node)
  const identity = await node.id()
  const nodeId = identity.id
  console.info('nodeId', nodeId)
  const buffer = await toBuffer(node.cat(cid))
  const blob = new Blob([buffer])
  const urlCreator = window.URL || window.webkitURL
  const imageUrl = urlCreator.createObjectURL(blob)
  const img = document.getElementById('my-image')
  img.src = imageUrl

}

window.addEventListener('load', init)
