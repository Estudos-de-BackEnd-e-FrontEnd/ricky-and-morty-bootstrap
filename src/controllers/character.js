import api from "../config/axios-config.js"

export const getCharacterCount = async ()=>{
    const episode = await api.get(`/character`)
    const episodeCount = episode.data.info.count

    return episodeCount
}

export const getAllcharacters = async (page)=>{
    const response = await api.get(`/character/?page=${page?page:1}`)
    return response.data
}

export const getCharacterById = async(id)=>{
    const response = await api.get(`/character/${id}`)
    return response.data
}
