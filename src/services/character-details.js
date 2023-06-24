const cardsWrapper = document.getElementById("cards-wrapper")
const botaoHome = document.getElementById("botao-home")

import {getCharacterById, getCharacterCount }from "../controllers/character.js";
import {getEpisode, getEpisodeCount} from "../controllers/episode.js"
import {getLocationCount} from "../controllers/location.js";
import { getCardStatus } from "../utils/getCardStatus.js";

document.addEventListener("DOMContentLoaded", async () =>{
    console.log("loaded")
    
    const characterCount = await getCharacterCount()
    const locationCount = await getLocationCount()
    const episodeCount = await getEpisodeCount()

    const id = window.localStorage.getItem("characterId")
    const splitId = id.split("-")
    console.log(splitId)
    const len = splitId.length - 1
    const character = await getCharacterById(splitId[len])

    cardRender(character)
    setfooterInfo(characterCount, locationCount, episodeCount)
})

botaoHome.addEventListener("click", ()=>{
    window.location.href = "/index.html"
})
export async function cardRender(character){
    cardsWrapper.innerHTML = ""
    
    let len = character.episode.length - 1
    let lastEpisode = character.episode[len]
    const episode = await getEpisode(lastEpisode)
    const data = {character, episode}        
    console.log(data)
    cardTemplate(data)
}

 
function cardTemplate(data){
    cardsWrapper.innerHTML = ""
   
    const {image, name, status, species, location} = data.character
    const {episode} = data
    
    const col = document.createElement("div")
    col.setAttribute("class", "col-12")

    const container = document.createElement("div")
    container.setAttribute("class", "container d-flex justify-content-center")

    const card = document.createElement("div")
    card.setAttribute("class", "card mb-3")

    const cardContent = document.createElement("div") 
    cardContent.setAttribute("class","row g-0 overflow-hidden" )

    const cardLeftCol = document.createElement("div") 
    cardLeftCol.setAttribute("class", "col-md-5 z-1 ")

    const cardImg = document.createElement("img")
    cardImg.setAttribute("src", image)
    cardImg.setAttribute("class", "img-fluid img-custom w-100")
    cardImg.setAttribute("alt", name)

    const cardRightCol = document.createElement("div")
    cardRightCol.setAttribute("class", "col-md-7 motion")
     
    const cardBody = document.createElement("div")
    cardBody.setAttribute("class", "card-body p-3")

    const cardTitle = document.createElement("h5")
    cardTitle.setAttribute("class", "card-title mb-0 text-light")
    cardTitle.innerText = name

    const cardStatus = document.createElement("p")
    cardStatus.setAttribute("class", "card-text mb-2 text-light")
    cardStatus.innerHTML = `${getCardStatus(status)} - ${species}`

    const cardDescription = document.createElement("dl")
    cardDescription.setAttribute("class", "m-0")

    const cardLocationTitle = document.createElement("dt")
    cardLocationTitle.setAttribute("class", "text-secondary")
    cardLocationTitle.innerText = "Última localização conhecida:"

    const cardLocationName = document.createElement("dd")
    cardLocationName.setAttribute("class", "mb-2 text-light")
    cardLocationName.innerText = location.name

    const cardEpisodeTitle = document.createElement("dt")
    cardEpisodeTitle.setAttribute("class", "text-secondary")
    cardEpisodeTitle.innerText = "Visto a última vez em:"

    const cardEpisodeName = document.createElement("dd")
    cardEpisodeName.setAttribute("class", "text-light m-0")
    cardEpisodeName.innerText = episode

    col.appendChild(container)
    container.appendChild(card)
    card.appendChild(cardContent)
    cardContent.appendChild(cardLeftCol)
    cardContent.appendChild(cardRightCol)
    cardLeftCol.appendChild(cardImg)
    cardRightCol.appendChild(cardBody)

    cardBody.appendChild(cardTitle)
    cardBody.appendChild(cardStatus)
    cardBody.appendChild(cardDescription)
    cardBody.appendChild(cardLocationTitle)
    cardBody.appendChild(cardLocationName)
    cardBody.appendChild(cardEpisodeTitle)
    cardBody.appendChild(cardEpisodeName)
    
    cardsWrapper.appendChild(col)
 
   
}


function setfooterInfo(characterCount, locationCount, episodeCount){
    const characterCounterText = document.getElementById("qtd-characters")
    const locationCounterText = document.getElementById("qtd-locations")
    const episodeCounterText = document.getElementById("qtd-episodes")

    characterCounterText.innerText = characterCount
    locationCounterText.innerText = locationCount
    episodeCounterText.innerText = episodeCount
}

