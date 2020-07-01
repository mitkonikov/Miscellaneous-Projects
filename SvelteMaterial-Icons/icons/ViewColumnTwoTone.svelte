<script>
    import SvgIcon from './util/SvgIcon.svelte';
    export let color;
</script>

<SvgIcon color={color}>
    <path d="M6 7h3v9H6zm5 0h3v9h-3zm5 0h3v9h-3z" opacity=".3" /><path d="M4 5v13h17V5H4zm5 11H6V7h3v9zm5 0h-3V7h3v9zm5 0h-3V7h3v9z" />
</SvgIcon>