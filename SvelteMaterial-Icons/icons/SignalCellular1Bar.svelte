<script>
    import SvgIcon from './util/SvgIcon.svelte';
    export let color;
</script>

<SvgIcon color={color}>
    <path fillOpacity=".3" d="M2 22h20V2z" /><path d="M12 12L2 22h10z" />
</SvgIcon>