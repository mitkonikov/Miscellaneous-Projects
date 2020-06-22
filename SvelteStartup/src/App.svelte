<script>
	import Button, {Group, GroupItem, Label, Icon} from '@smui/button';

	export let name;
	
	let TestComponent;

	import('./TestComp.svelte')
		.then(comp => TestComponent = comp.default)
		.catch(err => console.error(err))
</script>

<main>
	<h1>Hello {name}!</h1>

	<Button variant="unelevated"><Label>Test Button</Label></Button>

	{#if TestComponent}
		<svelte:component this={TestComponent} />
		<svelte:component this={TestComponent} />
		<svelte:component this={TestComponent} />
		<svelte:component this={TestComponent} />
	{/if}
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>