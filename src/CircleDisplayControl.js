const valueContainer = document.querySelector(".value-container")
const container = document.getElementById("circleContainer")
let progressBars = [document.getElementById("bar0")]
let progressValues = [D(0)];

function progress(i, x){
    let hexAdds = [126+(i*(25+(i*5))), i*(25+(i*5)), 180-(i*(15+(i*5)))]
    progressValues[i]=x;
    valueContainer.textContent = `${format(progressValues[0])}/10`
    progressBars[i].style.background = `conic-gradient(
      rgb(${hexAdds[0]}, ${hexAdds[1]}, ${hexAdds[2]}) ${progressValues[i].times(36)}deg,
      #000 ${progressValues[i].times(36)}deg
    )`
}
function createBars(su=false){
    if(data.numbers[data.numbers.length-1].gte(10) || su){
        let newBar = document.createElement('div')
        let prevBar = document.getElementById(`bar${progressBars.length-1}`)
        newBar.classList.add('circular-progress')
        newBar.id = `bar${progressBars.length}`
        newBar.style.height = `${180+(progressBars.length)}px`
        newBar.style.width = `${180+(progressBars.length)/5}px`
        container.appendChild(newBar)
        newBar.appendChild(prevBar)
        if (!su){
            data.numbers.push(new Decimal(1))
            for(let i=0;i<data.numbers.length;i++) data.numbers[i] = minimumNumber(i)
        }
        progressValues.push(new Decimal(1))
        progressBars.push(newBar)
        if (data.numbers.length>=2) data.textTriggers[0] = true
        if (data.numbers.length>=3) data.textTriggers[1] = true
    }
}
function setupBars(x){
    let i=0
    if(x>0){
        while (data.numbers.length-1>i){
            createBars(true)
            i++
        }
    }
}

function makeCircleEffectText(){
    let string = ""
    for (let i = 2; i < data.numbers.length; i++) {
        string += `Circle ${i+1} (${formatWhole(data.numbers[i])}/10): ${format(higherEffects[i-2])}x to the Circle ${i} effect.\n`
    }
    return string
}

function circleTextControls(){
    document.getElementById("descText").style.display = data.textTriggers[0]?`flex`:`none`
    document.getElementById("descText").innerText = `Circle 2 (${formatWhole(data.numbers[1])}/10) provides a ${format(effect)}x multiplier to the speed of Circle 1.`
    document.getElementById("descText2").style.display = data.textTriggers[1]?`block`:`none`
    document.getElementById("descText2").innerHTML = `All circles above Circle 2 multiply the effect of the previous Circle.<br><span style="font-size: 0.9rem">Hover to see precise values.</span>`

    DOM(`descText3`).innerText = makeCircleEffectText()

    DOM(`descText4`).style.display = data.numbers.length > 19 ? `block` : `none`
    document.getElementById("descText4").innerText = `Circle 20 (${formatWhole(data.numbers[19])}/10) increases the minimum percent of all lower Circles by ${format(minimumNumber(0).sub(1))}/10`
}
