<script>
    import SvgIcon from './util/SvgIcon.svelte';
    export let color;
</script>

<SvgIcon color={color}>
    <path fillOpacity=".3" d="M22 8V2L2 22h16V8h4z" /><path d="M18 22V6L2 22h16zm2-12v8h2v-8h-2zm0 12h2v-2h-2v2z" />
</SvgIcon>