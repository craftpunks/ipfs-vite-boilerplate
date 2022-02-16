import './style.css'
import toBuffer from 'it-to-buffer'

const cid = 'QmbmesdSusHcvhZwaE4KS8AhhQZS8KEidbiouns3zDCtPX'

const updatePeersCount = (node) => {
  const peers = document.getElementById('peers')
  setInterval(async () => {
    const peersConnected = await node.swarm.peers()
    const stats = await node.stats.repo()
    peers.innerHTML = `Connected to ${peersConnected.length} peers - ${stats.numObjects} objects stored - ${stats.repoSize} bytes`
  }, 1000)
}

const init = async () => {
  console.log('Init IPFS')
  const IpfsModule = await import('./src/modules/ipfs-core/ipfs-core.js')
  const IPFS = IpfsModule.default
  console.log(IPFS)
  const node = await IPFS.create({
    preload: {enabled: true},
  })
  console.log(node)
  updatePeersCount(node)
  const identity = await node.id()
  const nodeId = identity.id
  console.info('nodeId', nodeId)
  const buffer = await toBuffer(node.cat(cid))
  const blob = new Blob([buffer])
  const urlCreator = window.URL || window.webkitURL
  const imageUrl = urlCreator.createObjectURL(blob)
  const loader = document.getElementById('loader')
  const img = document.getElementById('my-image')
  loader.style.display = 'none'
  img.src = imageUrl
  img.classList.remove('hidden')

}

window.addEventListener('load', init)
