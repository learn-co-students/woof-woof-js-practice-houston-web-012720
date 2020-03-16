document.addEventListener('DOMContentLoaded', function() {

    fetch('http://localhost:3000/pups')
        .then(function(res) {
            return res.json()
        }).then(function(json) {
            showpop(json)
        })

    function showpop(poparray) {
        poparray.forEach(function(pop) {
            createpop(pop)
        })
    }

    function createpop(pop) {
        let dogbar = document.getElementById('dog-bar')
        let span = document.createElement('span')
        span.innerText = pop.name
        if (!pop.isGoodDog) {
            span.className = "off"
        }
        dogbar.append(span)
        span.addEventListener('click', function() {
            let divinfo = document.getElementById('dog-info')
            let img = document.createElement('img')
            img.src = pop.image
            let h2 = document.createElement('h2')
            h2.innerText = pop.name
            let button = document.createElement('button')
            button.innerText = pop.isGoodDog ? "GoodDog!" : "badDog"
            divinfo.append(img, h2, button)
            button.addEventListener('click', function() {
                fetch(`http://localhost:3000/pups/${pop.id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        isGoodDog: !(pop.isGoodDog)
                    })
                }).then(function(res) {
                    return res.json()
                }).then(function(json) {
                    console.log(json)
                    button.innerText = json.isGoodDog ? "GoodDog!" : "badDog"
                    if (!json.isGoodDog) {
                        span.className = "off"
                    }
                    pop = json
                })
            })
        })

        let filter = false

        let button2 = document.getElementById("good-dog-filter")
        button2.addEventListener('click', function() {
            filter = !filter
            Array.from(dogbar.children).forEach(function(span) {
                if (span.className == "off" && filter) {
                    span.style = "display: none"

                } else {
                    button2.innerText = "filter good dogs off"
                    span.style = ""
                }
            })
            button2.innerText = "filter good dogs ON"
        })
    }




})