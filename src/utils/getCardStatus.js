export function getCardStatus(status){

    switch (status) {
        case "Alive":
            return  `<span class="circle circle__green"></span> ${status}`
        case "Dead":
            return `<span class="circle circle__red"></span> ${status} `
        default:
            return `<span class="circle circle__gray"></span> ${status} `
    }
    
}