<script>
    import LeftPanel from "../components/leftPanel.svelte";
	import LongMusicCard from "../components/LongMusicCard.svelte";
</script>

<div class="container">
<div class="left">
<LeftPanel/>
</div>
<div class="right">
    <h1>Hi, Anibal!</h1>
    <div class="latest_music_container">
        <LongMusicCard/>
        <LongMusicCard/>
        <LongMusicCard/>
        <LongMusicCard/>
        <LongMusicCard/>
        <LongMusicCard/>
        
    </div>
</div>
</div>


<style>
    h1{
        margin: 20px;
    }
    .container{
        display: flex;
    }
    .container .left{
        width: 15%;
    }
    .container .right{
        width: 80%;
    }
    .latest_music_container{
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        margin: 20px;
    }
</style>