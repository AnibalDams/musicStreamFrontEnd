<script>
    let {text} = $props();

</script>

<a href="#">{text}</a>




<style>
    a{
        color: var(--secondary-text-light);
        
        text-decoration: none;
        padding: 4px;
        display: flex;
        align-items: center;
        border-radius: 8px;
        transition:0.1s;
    }
    a:hover{
        background: var(--primary-color);
        color: var(--primary-text);
        transform: translateX(4px);

    }
</style>