<script>
	// Svelte Material UI
	import Button, {Group, GroupItem, Label} from '@smui/button';
	import Card, {Content, PrimaryAction, Media, MediaContent, Actions, ActionButtons, ActionIcons} from '@smui/card';
  	import Textfield, {Input, Textarea} from '@smui/textfield';
	import List, {Item, Graphic, Meta, Subheader, Separator, Text, PrimaryText, SecondaryText} from '@smui/list';

	import IconButton, {Icon} from '@smui/icon-button';

	// Icons from Svelte Material Icons
	import Alarm from 'svelte-material-icons/Alarm.svelte';
	import Magnify from 'svelte-material-icons/Magnify.svelte'

	// We want to load the theme file last,
	// this way, it will give the priority to our theme file
  	import './theme/_smui-theme.scss';

	export let name;
	
	let LazyComponent;
	let textFieldValue;
	let listValue;

	// Import the lazy component
	import('./Lazy.svelte')
		.then(comp => LazyComponent = comp.default)
		.catch(err => console.error(err))
</script>

<main>
	<h1>Hello {name}!</h1>

	<Button variant="unelevated"><Label>Test Button</Label></Button>

	<div id="dynamic-components">
		{#if LazyComponent}
			<svelte:component this={LazyComponent} />
			<svelte:component this={LazyComponent} />
			<svelte:component this={LazyComponent} />
			<svelte:component this={LazyComponent} />
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

    <Textfield>
        <Input bind:value={textFieldValue}/>
    </Textfield>

	<List class="demo-list" dense>
      <Item on:SMUI:action={() => listValue = 'Edit'}>
        <Graphic class="material-icons">
			<Icon class="material-icons">edit</Icon>
		</Graphic>
        <Text>Edit</Text>
      </Item>
      <Item on:SMUI:action={() => listValue = 'Send'}>
        <Graphic class="material-icons">send</Graphic>
        <Text>Send</Text>
      </Item>
      <Item on:SMUI:action={() => listValue = 'Archive'}>
        <Graphic class="material-icons">archive</Graphic>
        <Text>Archive</Text>
      </Item>
      <Separator />
      <Item on:SMUI:action={() => listValue = 'Delete'}>
		<Graphic>
			<Alarm size='2em'/>
		</Graphic>
        <Text>Set Alarm</Text>
      </Item>
    </List>

	<Alarm size='2em'/>
	<Magnify size='2em'/>
</main>

<style>
	#dynamic-components {
		padding: 0.5em;
	}
</style>