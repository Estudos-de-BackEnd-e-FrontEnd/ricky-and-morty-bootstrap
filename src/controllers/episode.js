import api from "../config/axios-config.js"

export const getEpisode = async (lastEpisode)=>{
    const episode = await api.get(`${lastEpisode}`)
    return episode.data.name
}

export const getEpisodeCount = async ()=>{
    const episode = await api.get(`/episode`)
    const episodeCount = episode.data.info.count

    return episodeCount
}

