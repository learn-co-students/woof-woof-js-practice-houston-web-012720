document.addEventListener("DOMContentLoaded", () => {
  const dogBar = document.querySelector("div#dog-bar")
  const dogInfo = document.querySelector("div#dog-info")
  const goodDoggoButton = document.querySelector("button#good-dog-filter")
  fetchDoggos()

  goodDoggoButton.addEventListener("click", () => {
    if (goodDoggoButton.innerText == "Filter good dogs: ON"){
      goodDoggoButton.innerText = "Filter good dogs: OFF"
      fetchDoggos()
    }
    else{
      goodDoggoButton.innerText = "Filter good dogs: ON"
      fetchDoggos()
    }
  })

  function fetchDoggos() {
    fetch("http://localhost:3000/pups")
      .then(res => res.json())
      .then(doggos => addDoggos(doggos))
  }
  

  function addDoggos(doggos){
    dogBar.innerHTML = ""
    doggos.forEach(doggo => {
      if (whatDoggosToDisplay().includes(doggo.isGoodDog)){
        span = document.createElement("span")
        span.innerText = doggo.name
        dogBar.append(span)
        span.addEventListener("click", () => displayDoggo(doggo))
      }
    })
  }

  function whatDoggosToDisplay(){
    if (goodDoggoButton.innerText == "Filter good dogs: ON"){
      return [true]
    }
    else{
      return [true, false]
    }
  }

  function displayDoggo(doggo){
    dogInfo.innerHTML = ""
    h = document.createElement("h2")
    h.innerText = doggo.name
    img = document.createElement("img")
    img.src = doggo.image
    btn = document.createElement("button")
    doggo.isGoodDog? btn.innerText = "Bad Dog" : btn.innerText = "Good Dog" 
    dogInfo.append(h, img, btn)
    btn.addEventListener("click", () => {
      params = {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({

          "isGoodDog": !doggo.isGoodDog
        })
      }
      fetch(`http://localhost:3000/pups/${doggo.id}`, params)
        .then(btn.innerText == "Bad Dog" ? btn.innerText = "Good Dog"  : btn.innerText = "Bad Dog")
        .then(fetchDoggos())
      
    })
  }
})