let filter = false 

const display_dogs = (dog_datas) => {
    const div = document.querySelector("#dog-bar")
    const dog_filter_btn = document.querySelector("#good-dog-filter")
    let filter_dog_datas = dog_datas

    dog_filter_btn.addEventListener("click", () => {
        filter = !filter
        div.innerHTML = ""
        if(filter){
           filter_dog_datas = dog_datas.filter(dog => dog.isGoodDog === true)
           dog_filter_btn.textContent = "Filter good dogs: ON"
        }else{
            filter_dog_datas = dog_datas
            dog_filter_btn.textContent = "Filter good dogs: OFF"
        }
        filter_dog_datas.forEach(dog => {
            div.append(add_dog(dog))
        });
    })
    filter_dog_datas.forEach(dog => {
        div.append(add_dog(dog))
    });
}


const add_dog = (dog) => {
    const dog_info_div = document.querySelector("#dog-info")
    let span = document.createElement("span")
    span.innerText = dog.name
    span.style.cursor = "pointer"
    span.id = dog.id

    span.addEventListener("click", () => {
        dog_info_div.innerHTML = ""
        dog_info_div.append(display_dog_info(dog))
    })

    return span 
}

const display_dog_info = (dog) => {
    let info_div = document.createElement("div")

    let image = document.createElement("img")
    image.src = dog.image 

    let h2 = document.createElement("h2")
    h2.innerText = dog.name

    let goodDog 

    dog.isGoodDog ? goodDog = "Good Dog!" : goodDog = "Bad Dog!"

    let button = document.createElement("button")
    button.innerText = goodDog

    button.addEventListener("click", () => {
        dog.isGoodDog = !dog.isGoodDog
        fetch(`http://localhost:3000/pups/${dog.id}`,{
            method: "PATCH", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "isGoodDog": dog.isGoodDog
            })
        })
        .then(res => res.json())
        .then(dog_update => {
            dog_update.isGoodDog ? goodDog = "Good Dog!" : goodDog = "Bad Dog!"
            button.textContent = goodDog 
            if(filter){
                document.getElementById(`${dog.id}`).remove()
                info_div.remove()
            }   
        })
    })

    info_div.append(image,h2,button)
    return info_div
}


const display_fetch = () => {
    fetch("http://localhost:3000/pups")
    .then(res => res.json())
    .then(dog_datas => display_dogs(dog_datas))
}

display_fetch()
