<script>
	import './_index.scss';

	export let color = 'primary';
</script>

<style>
	svg {
		width: 1em;
		height: 1em;
		display: inline-block;
		flex-shrink: 0;
		font-size: 24px;
	}
</style>

<svg
	fill={(color !== 'primary' && color !== 'secondary') ? color : ''}
	class="{color === 'primary' ? 'smui-icon--color-primary' : ''}
	{color === 'secondary' ? 'smui-icon--color-secondary' : ''}"
	viewBox={'0 0 24 24'}>
	<slot />
</svg>
