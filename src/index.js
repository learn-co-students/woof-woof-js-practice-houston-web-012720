addEventListener("DOMContentLoaded", () => {
  const dogBar = document.querySelector('#dog-bar')
  const filter = document.querySelector("#filter-div")
  const button = document.querySelector("#good-dog-filter")
  const on = "Filter good dogs: ON"
  const off = "Filter good dogs: OFF"

    fetch("http://localhost:3000/pups")
    .then(resp => resp.json())
    .then(dogData => {showDogs(dogData)})

  function showDogs(arr){
    arr.map(dog => showDog(dog))
    filter.addEventListener("click", ()=>{
      button.innerText = button.innerText === on ? button.innerText = off : button.innerText = on
      fetchDogs()
    })
  }

  function fetchDogs(){
    fetch("http://localhost:3000/pups")
    .then(resp => resp.json())
    .then(dogData => {
      dogBar.innerHTML = ""
      if (button.innerText === on) {
        let goodDogs = dogData.filter(dog => dog.isGoodDog)
        goodDogs.forEach(dog=> showDog(dog))
      } else {
        dogData.forEach(dog=> showDog(dog))
      }
    })
  }
  
  function showDog(dog){
    const span = document.createElement("span")
    span.innerText = dog.name
    span.id = `dog-${dog.id}`
    dogBar.append(span)
    span.addEventListener("click", () => {
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
        btn.innerText = dog.isGoodDog ? btn.innerText = "Is Bad Dog" : btn.innerText = "Is Good Dog"
        fetchDogs()
      })
      .catch(error => console.log("that didn't work"))
    })
    dogInfoDiv.append(img, h2, btn)
  }

})




