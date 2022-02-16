# IPFS with Vite
Based on [https://github.com/DougAnderson444/ipfs-vite-svelte-kit](https://github.com/DougAnderson444/ipfs-vite-svelte-kit)

## Steps to Reproduce

- Install IPFS-core

`npm i ipfs-core`

- Install process and util, as it comes in node but not the browser

`npm i process util`

- We also need some globals, save them to `src/node-globals.js`:

```js
// file: src/node-globals.js
export const Buffer = require('buffer').Buffer;
export const process = require('process/browser');
export const global =
	typeof global !== 'undefined'
		? global
		: typeof globalThis !== 'undefined'
		? globalThis
		: typeof self !== 'undefined'
		? self
		: typeof window !== 'undefined'
		? window
		: {};

if (globalThis && globalThis.process && globalThis.process.env)
	globalThis.process.env.LIBP2P_FORCE_PNET = false;
```

- We need to build ipfs-core for the browser, use esbuild to do so

`npm i -D esbuild`

- Add a shortcut for the above in package.json

```js
	"scripts": {
		"build:ipfs": "esbuild ./node_modules/ipfs-core --bundle --format=esm --sourcemap --main-fields=browser,module,main --inject:./src/node-globals.js --define:process.env.NODE_ENV='\"production\"' --splitting --outdir=./src/modules/ipfs-core"
	},
```

- run the esbuild script:

```
npm run build:ipfs
```

Results are now in

`src\modules\ipfs-core\ipfs-core.js`

- Import IPFS in the app. 

```js
const init = async () => {
  console.log('Init IPFS')
  const IpfsModule = await import('./src/modules/ipfs-core/ipfs-core.js')
  const IPFS = IpfsModule.default;
  console.log(IPFS)
  const node = await IPFS.create()
  console.log(node)
  const identity = await node.id()
  const nodeId = identity.id
  console.info('nodeId', nodeId)
}

window.addEventListener('load', init)
```

- Run the app:

```
npm run dev
```

- Build the app:

```
npm run build
```

and preview

```
npm run preview
```

open in localhost
