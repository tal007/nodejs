setTimeout( () => console.log(4))

new Promise(resolve => {
  resolve()
  console.log(1)
}).then( () => {
  console.log(3)
})

Promise.resolve(5).then(() => console.log(5))

console.log(2)