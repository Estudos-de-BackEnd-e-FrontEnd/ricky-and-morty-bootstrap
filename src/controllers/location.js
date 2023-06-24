import api from "../config/axios-config.js"

export const getLocationCount = async ()=>{
    const location = await api.get(`/location`)
    const locationCount = location.data.info.count

    return locationCount
}

