
document.addEventListener("DOMContentLoaded", () => {

  const filter_btn = document.querySelector("#good-dog-filter")
  const dog_bar = document.querySelector("#dog-bar")
  const dog_summary = document.querySelector("#dog-summary-container")

  let filtered = false

  filter_btn.addEventListener("click", () => {
    filtered = !filtered
    dog_bar.innerHTML = ""
    dog_summary.innerHTML = ""
    getDogs(filtered)
    filtered ? filter_btn.innerText = "Filter good dogs: ON" : filter_btn.innerText = "Filter good dogs: OFF"
  })

  function getDogs(filtered) {
    fetch("http://localhost:3000/pups")
      .then( res => res.json() )
      .then( dogs => {
        if (filtered) {
          dogs.filter(dog => dog.isGoodDog).map(dog => {
            drawDogSpan(dog)
          })
        } else {
          dogs.map(dog => drawDogSpan(dog))
        }
      })
  }

  function drawDogSpan(dog) {
    const dog_bar = document.querySelector("#dog-bar")
    const dog_span = document.createElement("span")

    dog_span.innerText = dog.name

    dog_span.addEventListener("click", () => {
      drawDogCard(dog)
    })

    dog_bar.append(dog_span)
  }

  function drawDogCard(dog) {
    const dog_summary = document.querySelector("#dog-summary-container")

    const dog_card = document.createElement("div")
    const dog_img = document.createElement("img")
    const dog_name = document.createElement("h2")
    const dog_btn = document.createElement("button")

    dog_card.id = "dog-info"

    dog_img.src = dog.image
    dog_name.innerText = dog.name

    isGood(dog, dog_btn)

    dog_btn.addEventListener("click", () => {
      dog.isGoodDog = !dog.isGoodDog
      fetch("http://localhost:3000/pups/" + dog.id, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "isGoodDog": dog.isGoodDog })
      })
        .then(res => res.json())
        .then(dog => {
          dog.isGoodDog ? dog_btn.innerText = "Goodest Boi" : dog_btn.innerText = "Not A Good Boi"
        })
    })

    dog_summary.innerHTML = ""

    dog_summary.append(dog_card)
    dog_card.append(dog_img, dog_name, dog_btn)
  }

  function isGood(dog, dog_btn) {
    if (dog.isGoodDog == true) {
      dog_btn.innerText = "Goodest Boi"
    } else {
      dog_btn.innerText = "Not A Good Boi"
    }
  }

  getDogs(filtered)

})

