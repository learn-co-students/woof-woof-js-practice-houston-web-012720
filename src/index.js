filterOn = false

document.addEventListener('DOMContentLoaded', () => {
  const doggo = document.getElementById('dog-info')
  doggo.append(document.createElement('img'))
  doggo.append(document.createElement('h2'))
  const btn = document.createElement('button')
  btn.style.display = "none"
  doggo.append(btn)

  fetch('http://localhost:3000/pups')
  .then(r => r.json())
  .then(pups => {
    addPups(pups)
    addFilter()
  })

})

let addPups = (pups) => {
  pups.forEach (pupper => {
    const doggoBar = document.getElementById('dog-bar')
    const pupperSpan = document.createElement('span')
    pupperSpan.id = pupper.id
    pupperSpan.innerText = pupper.name

    pupperSpan.addEventListener('click', showPup)

    doggoBar.append(pupperSpan)
  })
}

let showPup = () => {
  // event.preventDefault()
  const pupId = event.target.id
  const doggo = document.getElementById('dog-info')
  fetch('http://localhost:3000/pups/' + pupId)
  .then(r => r.json())
  .then(pupper => {
    doggo.querySelector('img').src = pupper.image
    doggo.querySelector('h2').innerText = pupper.name
    const button = doggo.querySelector('button')
    button.style.display = ""
    button.innerText = pupper.isGoodDog ? "Good Dog!" : "Bad Dog!"
    button.addEventListener('click', () => {
      fetch('http://localhost:3000/pups/' + pupper.id, {
        method: 'PATCH',
        headers: {
          "content-type": 'application/json'
        },
        body: JSON.stringify({
          isGoodDog: !pupper.isGoodDog
        })
      })
      .then(r => r.json())
      .then(newPup => {
        debugger //hitting this multiple times on some disposition toggles

        pupper = newPup
        applyFilter()
        doggo.querySelector('button').innerText = pupper.isGoodDog ? "Good Dog!" : "Bad Dog!"
      })
    })
  })
}

let addFilter = () => {
  document.getElementById('good-dog-filter').addEventListener('click', () => {
    filterOn = !filterOn
    applyFilter()
  })
}

let applyFilter = () => {
  const filter = document.getElementById('good-dog-filter')
  const pups = document.getElementById('dog-bar').querySelectorAll('span')
  if (filterOn) {
    filter.innerText = "Filter good dogs: ON"
    for (const pup of pups) {
      fetch('http://localhost:3000/pups/' + pup.id)
      .then(r => r.json())
      .then(pupper => {if (!pupper.isGoodDog) pup.style.display = "none"})
    }
  } else {
    filter.innerText = "Filter good dogs: OFF"
    for (const pup of pups) pup.style.display = ""
  }
}