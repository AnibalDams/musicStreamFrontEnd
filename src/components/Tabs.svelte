<script>
        let {active=false, icon="", text=""} = $props();

    let background = active?"var(--primary-color)":"none";
    let color = active?"var(--primary-text)":"var(--secondary-text-light)";
</script>

<a href="/favorites"style={`--background:${background};--color:${color}`}>{@html icon} {text}</a>


<style>
    a{
        color: var(--color);
        background: var(--background);
        
        text-decoration: none;
        padding: 8px;
        display: flex;
        align-items: center;
        font-weight: bold;
        border-radius: 8px;
        gap: 8px;
        transition: 0.1s;

    }
    a:hover{
        background: var(--primary-color);
        color: var(--primary-text);
        transform: translateX(4px);
    }
</style>