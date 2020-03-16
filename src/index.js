// come back and check the good bad refreshing situations 

addEventListener("DOMContentLoaded", () => {
  const dogBar = document.querySelector('#dog-bar')
  const filter = document.querySelector("#filter-div")

  fetch("http://localhost:3000/pups")
  .then(resp => resp.json())
  .then(dogData => {showDogs(dogData)})

  function showDogs(arr){
    arr.map(dog => showDog(dog))
    // arr.forEach(dog=> showDog(dog))
    filter.addEventListener("click", ()=>{
      const on = "Filter good dogs: ON"
      const off = "Filter good dogs: OFF"
      const button = document.querySelector("#good-dog-filter")
      dogBar.innerHTML = ""
      button.innerText = button.innerText === on ? button.innerText = off : button.innerText = on
      // console.log(arr)
      // debugger
      let goodDogs = arr.filter(dog => dog.isGoodDog)
      // debugger
      if (button.innerText === on) {
        goodDogs.forEach(dog=> showDog(dog))
      } else {
        arr.forEach(dog=> showDog(dog))
      }
      // (button.innerText === on) ? goodDogs.forEach(dog=> showDog(dog)) : arr.forEach(dog=> showDog(dog))
    })
  }
  
  function showDog(dog){
    const div = document.createElement("span")
    div.innerText = dog.name
    dogBar.append(div)
    div.addEventListener("click", () => {
      // alert("you clicked a dog")
      showDogsInfo(dog)
    })
  }





  function showDogsInfo(dog){
    const dogInfoDiv = document.querySelector("#dog-info")
    dogInfoDiv.innerHTML = ""
    const img = document.createElement("img")
    img.src = dog.image
    const h2 = document.createElement("h2")
    h2.innerText = dog.name
    const btn = document.createElement("button")
    dog.isGoodDog ? btn.innerText = "Is Bad Dog" : btn.innerText = "Is Good Dog"
    btn.addEventListener("click", ()=>{
      // debugger
      fetch("http://localhost:3000/pups/"+dog.id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          isGoodDog: !dog.isGoodDog
        })
      })
      .then(resp => resp.json())
      .then(updatedDog => {
        dog = updatedDog
        console.log(updatedDog.isGoodDog)
        btn.innerText = dog.isGoodDog ? btn.innerText = "Is Bad Dog" : btn.innerText = "Is Good Dog"
      })
      .catch(error => console.log("that didn't work"))
    })
    dogInfoDiv.append(img, h2, btn)
  }





})

