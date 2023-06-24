const cardsWrapper = document.getElementById("cards-wrapper")

import {getAllcharacters, getCharacterCount }from "../controllers/character.js";
import {getEpisode, getEpisodeCount} from "../controllers/episode.js"
import {getLocationCount} from "../controllers/location.js";
import { getCardStatus } from "../utils/getCardStatus.js";
import { groupButtons } from "../utils/groupButtons.js";
import { createBtns } from "./pagination.js";
import { controllers } from "./pagination.js";


document.addEventListener("DOMContentLoaded", async () =>{


    const characterCount = await getCharacterCount()
    const locationCount = await getLocationCount()
    const episodeCount = await getEpisodeCount()
    const character = await getAllcharacters()

    cardRender(character)

    setfooterInfo(characterCount, locationCount, episodeCount)

    const groupedButtons = groupButtons(character.info.pages, 6)

    controllers(character.info.pages, groupedButtons, 6, groupButtons)

    createBtns(character.info.pages, 6, groupButtons)
   
})


export async function cardRender (pages){
    cardsWrapper.innerHTML = ""
    
    const character = await getAllcharacters(pages)

    const CharacterEpisodePromisses = character.results.map(async (character)=>{
        let len = character.episode.length - 1
        let lastEpisode = character.episode[len]
        const episode = await getEpisode(lastEpisode)
        return {character, episode}        
    })
 
    const resolvePromisses = Promise.all(CharacterEpisodePromisses)
    const data = await resolvePromisses
    cardTemplate(data)
}

 
function cardTemplate(data){
    
    data.map((item)=>{
       
        const {id, image, name, status, species, location} = item.character
        const {episode} = item 
       
        const col = document.createElement("div")
        col.setAttribute("class", "col-12 col-lg-6")

        const container = document.createElement("div")
        container.setAttribute("class", "container d-flex justify-content-center")

        const card = document.createElement("div")
        card.setAttribute("class", "card mb-3")

        const cardContent = document.createElement("div") 
        cardContent.setAttribute("class","row g-0" )

        const cardLeftCol = document.createElement("div") 
        cardLeftCol.setAttribute("class", "col-md-5 ")

        const cardImg = document.createElement("img")
        cardImg.setAttribute("src", image)
        cardImg.setAttribute("class", "img-fluid img-custom w-100 h-100")
        cardImg.setAttribute("alt", name)
    
        const cardRightCol = document.createElement("div")
        cardRightCol.setAttribute("class", "col-md-7")

        const cardBody = document.createElement("div")
        cardBody.setAttribute("class", "card-body p-3")

        const cardDetailsIcon = document.createElement("i")
        cardDetailsIcon.setAttribute("class", "bi bi-info-circle-fill")
        cardDetailsIcon.setAttribute("id", `detailsId-${id}`)
        charactersDetailsPage(cardDetailsIcon)
        
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

        cardBody.appendChild(cardDetailsIcon)
        cardBody.appendChild(cardTitle)
        cardBody.appendChild(cardStatus)
        cardBody.appendChild(cardDescription)
        cardBody.appendChild(cardLocationTitle)
        cardBody.appendChild(cardLocationName)
        cardBody.appendChild(cardEpisodeTitle)
        cardBody.appendChild(cardEpisodeName)
        
        cardsWrapper.appendChild(col)
 
    })
}

function charactersDetailsPage(cardDetailsIcon){
    
    cardDetailsIcon.addEventListener("click", (e)=>{
        console.log(e.target.id)
        window.localStorage.setItem("characterId", e.target.id)
        window.location.href = "/src/pages/character-details.html"
        cardDetailsIcon.setAttribute("class", "d-none")
    })
}

function setfooterInfo(characterCount, locationCount, episodeCount){
    const characterCounterText = document.getElementById("qtd-characters")
    const locationCounterText = document.getElementById("qtd-locations")
    const episodeCounterText = document.getElementById("qtd-episodes")

    characterCounterText.innerText = characterCount
    locationCounterText.innerText = locationCount
    episodeCounterText.innerText = episodeCount
}

