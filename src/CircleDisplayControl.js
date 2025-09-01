const valueContainer = document.querySelector(".value-container")
const container = document.getElementById("circleContainer")
let progressBars = [document.getElementById("bar0")] // from index.html
let progressValues = [D(0)];
// space filling
function progress(i, x){
    let hexAdds = [126+(i*(25+(i*5))), i*(25+(i*5)), 180-(i*(15+(i*5)))]
    progressValues[i]=x;
    valueContainer.textContent = `${format(progressValues[0])}`
    progressBars[i].style.background = `conic-gradient(
      rgb(${hexAdds[0]}, ${hexAdds[1]}, ${hexAdds[2]}) ${progressValues[i].times(7.2)}deg,
      #000 ${progressValues[i].times(7.2)}deg
    )`
}
function createBars(su=false){
    if(data.numbers[data.numbers.length-1].gte(50) || su){
        let newBar = document.createElement('div')
        let prevBar = document.getElementById(`bar${progressBars.length-1}`) 
        newBar.classList.add('circular-progress') // it's such a pain
        newBar.id = `bar${progressBars.length}` 
        newBar.style.height = `${180+(progressBars.length)*5}px`// this bit is cursed
        newBar.style.width = `${180+(progressBars.length)*5}px` // so is this
        container.appendChild(newBar) // what is this stuff
        newBar.appendChild(prevBar) // i dont really know
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
// space filling
function makeCircleEffectText(){
    let string = ""
    for (let i = 2; i < data.numbers.length; i++) {
        string += `Circle ${i+1} (${formatWhole(data.numbers[i])}/50): ${format(higherEffects[i-2])}x to the power of Circle ${i}.\n` // adding how circle n+1 affects circle n
    }
    return string
}
// space filling
function circleTextControls(){
    document.getElementById("descText").style.display = data.textTriggers[0]?`flex`:`none`
    document.getElementById("descText").innerText = `Circle 2 (${formatWhole(data.numbers[1])}/50) provides a ${format(effect)}x boost to the speed of Circle 1.` // circle 2's effect on circle 1
    document.getElementById("descText2").style.display = data.textTriggers[1]?`block`:`none`
    document.getElementById("descText2").innerHTML = `All circles above Circle 2 boost the power of the previous Circle.<br><span style="font-size: 0.9rem">Hover to see the precise boosts and values of the other Circles.</span>` // other circles, hover over text to see precise data
// space filling
    DOM(`descText3`).innerText = makeCircleEffectText()
// space filling
    DOM(`descText4`).style.display = data.numbers.length > 9 ? `block` : `none`
    document.getElementById("descText4").innerText = `Circle 10 (${formatWhole(data.numbers[9])}/50) increases the minimum percent of all lower Circles by ${format(minimumNumber(0).sub(1))}/50` // the last circle
}
