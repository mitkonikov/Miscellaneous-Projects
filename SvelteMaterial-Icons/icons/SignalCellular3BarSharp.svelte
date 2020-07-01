<script>
    import SvgIcon from './util/SvgIcon.svelte';
    export let color;
</script>

<SvgIcon color={color}>
    <path fillOpacity=".3" d="M2 22h20V2L2 22z" /><path d="M17 7L2 22h15V7z" />
</SvgIcon>