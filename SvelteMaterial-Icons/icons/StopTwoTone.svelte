<script>
    import SvgIcon from './util/SvgIcon.svelte';
    export let color;
</script>

<SvgIcon color={color}>
    <path d="M8 8h8v8H8z" opacity=".3" /><path d="M6 18h12V6H6v12zM8 8h8v8H8V8z" />
</SvgIcon>