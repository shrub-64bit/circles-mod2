let effect = D(1)
let higherEffects = Array(100).fill(D(1))

function calcCircleEffects(){
    if(data.numbers[1]!==undefined){
        effect = (data.numbers[1]).times(higherEffects[0])
    }

    let i=0
    while(data.numbers[i+2]!==undefined){
        higherEffects[i] = (((data.numbers[i+2].plus(1))).times((higherEffects[i+1])))
        i++
    }
}
