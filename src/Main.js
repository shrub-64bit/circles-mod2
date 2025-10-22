let diff
function gainNumber(lowestGain){
    // Circle 1 Gain
    data.numbers[0] = data.numbers[0].plus((lowestGain).times(data.numbers[1]))
    // circle i gain (nonspecific)
    for(let i=0;i<data.numbers.length;i++){
        if(data.numbers[i].gte(100) && data.numbers[i+1] !== undefined){

            for(let i=0;i<data.numbers.length;i++){
                if(lowestGain.gte(100)){
                    // console.log(`Ran! Current Circle i+1: ${data.numbers[i]}, it should increase by ${lowestGain.div(100)}`) 
                    data.numbers[i+1] = data.numbers[i+1].plus(lowestGain.div(100))
                    numberReset(i+1)
                // console.log(`It is now ${data.numbers[i]}`)

                    continue // Ensure that Circle 2 is only increased once per loop
                }
            }

            data.numbers[i+1] = data.numbers[i+1].plus(1)
            numberReset(i+1)
        }
    }
}
// space filler
let minimumNumber = (i) => i < 99
    ? data.numbers[99] !== undefined ? data.numbers[99].plus(1) : D(1) // affects when last circle appears
    : D(1)
function numberReset(x){
    for(let i=0;i<x;i++) data.numbers[i] = minimumNumber(i)
}

function mainLoop(){
    diff = (Date.now()-data.time)/1000
    data.time = Date.now()
    calcLoop()
    for(let i=0;i<data.numbers.length;i++) progress(i, data.numbers[i])
    createBars()
    circleTextControls()
}
function calcLoop(){
    let gain = (D(1).times(effect).times(effect))
    gainNumber((gain.times(diff)).times(diff))
    calcCircleEffects()
}
function fixNumbers(){
    for(let i=0; i<data.numbers.length;i++){
        data.numbers[i] = D(data.numbers[i])
    }
}
function switchTab(i){
    data.currentTab = i 
}
window.setInterval(function(){
    mainLoop()
}, 50); // idk what that 50 is there for
// space filler
