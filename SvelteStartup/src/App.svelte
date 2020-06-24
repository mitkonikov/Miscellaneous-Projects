<script>
	import Button, {Group, GroupItem, Label, Icon} from '@smui/button';
	import Card, {Content, PrimaryAction, Media, MediaContent, Actions, ActionButtons, ActionIcons} from '@smui/card';
	
	// We want to load the theme file last,
	// this way, it will give the priority to our theme file
  	import './theme/_smui-theme.scss';

	export let name;
	
	let TestComponent;

	import('./TestComp.svelte')
		.then(comp => TestComponent = comp.default)
		.catch(err => console.error(err))
</script>

<main>
	<h1>Hello {name}!</h1>

	<Button variant="unelevated"><Label>Test Button</Label></Button>

	<div id="dynamic-components">
		{#if TestComponent}
			<svelte:component this={TestComponent} />
			<svelte:component this={TestComponent} />
			<svelte:component this={TestComponent} />
			<svelte:component this={TestComponent} />
		{/if}
	</div>

	<Card style="width: 320px;">
        <Content>A card with actions.</Content>
        <Actions>
          <Button on:click={() => console.log("action!")}>
            <Label>Action</Label>
          </Button>
          <Button>
            <Label>Another</Label>
          </Button>
        </Actions>
    </Card>
</main>

<style>
	#dynamic-components {
		padding: 0.5em;
	}
</style>