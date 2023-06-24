/* import { groupThePages } from "../utils/groupButtons.js"; */
import { cardRender } from "./home.js";
const btnsContainer = document.getElementById("btns-container")
const btnBack = document.getElementById("botao-prev")
const btnForward = document.getElementById("botao-next")
const header = document.getElementById("header")

let indexgroupButtons = 0
let pageCurrent = 1

export function createBtns(page, btnByGroup, callback){
    const groupedButtons = callback(page, btnByGroup)
    
    let array = []
  
    for(let i = 0; i < groupedButtons[indexgroupButtons].length ; i++){
        const btn = document.createElement("button")
    
        btn.setAttribute("id", `${groupedButtons[indexgroupButtons ][i]}`)
        btn.setAttribute("class", "page-link")
        btn.innerText = `${groupedButtons[indexgroupButtons][i]}`
        btn.classList.add("btn-items")
        btnsContainer.appendChild(btn)
        array.push(btn)

        if(array[0].getAttribute("id") == 1){
            array[0].setAttribute("disabled", true)
        }
         
        btn.addEventListener("click", (e)=>{
            btnBack.innerText = "Anterior"
            btnForward.innerText = "Próximo"
            btnBack.disabled = false
            btnForward.disabled = false

            for(let i = 0; i < array.length; i++){
                array[i].removeAttribute("disabled")
                 
            }

            const btnCurrent = e.target
            const page = Number(e.target.id)
            btnCurrent.disabled = true
            cardRender(page)
            pageCurrent = page

            delayToScroll()
        })
    }
 
}

export function controllers(page, groupedButtons, btnByGroup, callback){

    btnForward.addEventListener("click", ()=>{
        btnBack.removeAttribute("disabled")
        btnBack.innerText = "Anterior"

        console.log(btnByGroup, pageCurrent)
        let arrayBtns = groupedButtons[indexgroupButtons]
        let len = arrayBtns.length - 1
        let lastBtn = groupedButtons[indexgroupButtons][len]
        console.log(lastBtn)
       
        if(pageCurrent < page){

            if(pageCurrent === lastBtn){
                btnsContainer.innerHTML = ""
                indexgroupButtons++
                createBtns(page, btnByGroup, callback)
                
            }
            pageCurrent++

            cardRender(pageCurrent)

            let btnCurrent = document.getElementById(`${pageCurrent}`)
            let btnPrev = document.getElementById(`${pageCurrent - 1}`)
        
            removeDisabled(btnCurrent, btnPrev)
       
        }

        if(pageCurrent === page){
            btnForward.disabled = true
            btnForward.innerText = "Acabou 😉"
        }

        delayToScroll()
        
    })
    
    btnBack.addEventListener("click", ()=>{
        btnForward.removeAttribute("disabled")
        btnForward.innerText = "Próximo"

        let firstBtnByGroup = groupedButtons[indexgroupButtons][0]

        if(pageCurrent === firstBtnByGroup){
            btnsContainer.innerHTML = ""
            if(indexgroupButtons > 0){
                indexgroupButtons-- 
                
            }

            createBtns(page, btnByGroup, callback) 

        }

        if(pageCurrent > 1){
            pageCurrent--

            cardRender(pageCurrent)
             
            const btn1 = document.getElementById("1")
            const btnCurrent = document.getElementById(pageCurrent)
            const btnPrev = document.getElementById(pageCurrent + 1)

            removeDisabled(btnCurrent, btnPrev, btn1)
        }

        if(pageCurrent === 1){
            btnBack.disabled = true
            btnBack.innerText = "Acabou 😉"
        }
        delayToScroll()
    })
    
}


function delayToScroll(){
    setTimeout(()=>{
        header.scrollIntoView({ behavior: "smooth" })
    },800)
}


function removeDisabled(btnCurrent, btnPrev, btn1 = false){
    if(btn1){
        btn1.removeAttribute("disabled")
    } 

    if(btnCurrent){
        btnCurrent.setAttribute("disabled", true)
    }
    
    if(btnPrev){
        btnPrev.removeAttribute("disabled")
    }
}