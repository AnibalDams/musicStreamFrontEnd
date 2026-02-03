import axios from "axios"

export async function load(){
    const latestMusics = await axios({url:"http://localhost:8000/music/d/latest"})

    return {music: latestMusics.data.music}
}