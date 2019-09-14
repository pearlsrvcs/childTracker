N = 529
let results = []
let count = 0
let highcount = count
const result = (parseInt(N + " ", 10).toString(2))
for (let i=0; i< result.length; i++){
  let x = result.substring(i,1)
  results.push(x)
}
const answer = results[results.length - 1]
let i = 1
while ( i < answer.length){
  let count = answer.indexOf(1, i++)
  console.log(count)
  if (count > highcount) {
    highcount = count
  }
}


console.log(highcount)