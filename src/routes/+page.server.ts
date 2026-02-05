import axios from "axios"

export async function load(){
    const latestMusics = await axios({url:"http://localhost:8000/music/d/latest"})
    const latestPlaylists = await axios({url:"http://localhost:8000/playlist/d/latest"})

    return {music: latestMusics.data.music, playlist: latestPlaylists.data.playlist}
}