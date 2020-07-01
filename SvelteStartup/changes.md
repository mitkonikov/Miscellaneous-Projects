# Changes

These are the changes that we've done to the official Svelte template.

Overview:
 - [Lazy Load Components](#lazy-load-components)
 - [SVELTE to lazy load a component](#SVELTE-to-lazy-load-a-component)
 - [Material UI](#Material-UI)
 - [Theme file](#Theme-file)
 - [Delete prior builds before building the app](#Deleting-prior-builds-when-building-the-app)

---

### Lazy Load Components

Rollup config file changes

```js
    output: {
		sourcemap: true,
		format: 'es',
		name: 'app',
		dir: 'public/build'
	}
```

Dimport module to be able to lazy load components

```html
    <script defer type="module" src="https://unpkg.com/dimport?module"
		data-main="/build/main.js"></script>
	<script defer type="nomodule" src="https://unpkg.com/dimport/nomodule"
		data-main="/build/main.js"></script>
```

---

### SVELTE to lazy load a component

This is in the `script` tag.

```js
    let TestComponent;

	import('./TestComp.svelte')
		.then(comp => TestComponent = comp.default)
        .catch(err => console.error(err))
```

After loading the component, you can use it via svelte:component. The example that follows is in the `main` tag.

```js
    {#if TestComponent}
		<svelte:component this={TestComponent} />
	{/if}
```

---

### Material UI

Installing Material UI
 - `npm install svelte-material-ui`
 - `npm install node-sass`
 - `npm install rollup-plugin-postcss`
 - rollup.config.file changes

### Theme file

`src/theme/smui-theme.scss`

---

### Deleting prior builds when building the app

This is done by changing the `npm run build` and `npm run dev` scripts. How it's done: we `cd` into the public dir, we remove the `build` dir and we cd out it before calling rollup.

Example:

```json
    {
        "scripts": {
            "build": "cd public && rmdir /s /q build && cd .. && rollup -c",
            "dev": "cd public && rmdir /s /q build && cd .. && rollup -c -w",
            "start": "sirv public"
        }
    }
```

### Working on importing Material UI Icons over to Svelte Material UI