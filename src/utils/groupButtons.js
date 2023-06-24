export function groupButtons(pages, btnByGroup){
    const groupedButtons = []
    let qtd = btnByGroup -1

    for(let i = 1; i <= pages; i += btnByGroup){
        const groupCurrent = []

        for(let j = i; j <= i + qtd; j++){

            if(j === pages + 1){
                break
            }

            groupCurrent.push(j)
        }
        
        groupedButtons.push(groupCurrent)
    }
    return groupedButtons
}