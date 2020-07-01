<script>
    import SvgIcon from './util/SvgIcon.svelte';
    export let color;
</script>

<SvgIcon color={color}>
    <circle cx="12" cy="19" r="2" /><path d="M10 3h4v12h-4z" />
</SvgIcon>