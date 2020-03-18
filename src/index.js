const PUPS_URL = "http://localhost:3000/pups"

let dogBar = document.querySelector("#dog-bar")
let dogFilter = document.querySelector("#good-dog-filter")
let dogInfo = document.querySelector("#dog-info")

function populateDogBar() {
    dogBar.innerHTML = ""
    fetch(PUPS_URL)
    .then(res => res.json())
    .then(dogs => dogs.forEach(dog => {addDog(dog)}))
}

function addDog(dog){
    
    let dogSpan = document.createElement("span")
    dogSpan.innerText = dog.name
    
    dogSpan.addEventListener("click", () => {showDog(dog)})
    
    showGoodDogs(dog, dogSpan)
    
    dogBar.append(dogSpan)

}

function showDog(dog){
    dogInfo.innerHTML = ""

    let dogPic = document.createElement("img")
    dogPic.src = dog.image

    let dogName = document.createElement("h2")
    dogName.innerText = dog.name

    let goodDog = document.createElement("button")
    setGoodDogButton(dog, goodDog)
    goodDog.addEventListener("click", () => {
        updateDogGoodness(dog, goodDog)
    })

    dogInfo.append(dogPic, dogName, goodDog)

}

function showGoodDogs(dog, dogSpan){
    if (dogFilter.innerText == "Filter good dogs: ON"){
        if (dog.isGoodDog == false){
            dogSpan.style.display = "none";
        }
        else {
            dogSpan.style.display = "flex";
        }
    }
    else {
        dogSpan.style.display = "flex";
    }
}

function setGoodDogButton(dog, button){
    if (dog.isGoodDog){
        button.innerText = "Dog is Good. Make dog bad?"
    }
    else button.innerText = "Dog is Bad. Make dog good?"
}

function updateDogGoodness(dog, button) {
    fetch(PUPS_URL+"/"+dog.id, {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            isGoodDog: !dog.isGoodDog
        })
    })
    .then(res => res.json())
    .then(dogRes => {
        setGoodDogButton(dogRes, button)
        dog.isGoodDog = dogRes.isGoodDog
    })
}

dogFilter.addEventListener("click", () => {
    if (dogFilter.innerText == "Filter good dogs: OFF"){
        dogFilter.innerText = "Filter good dogs: ON"
    }
    else {
        dogFilter.innerText = "Filter good dogs: OFF"
    }
    populateDogBar()
})

populateDogBar()
