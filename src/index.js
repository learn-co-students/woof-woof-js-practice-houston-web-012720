document.addEventListener('DOMContentLoaded', ()=>{
    const div = document.querySelector('#dog-info')
    const img = document.createElement('img')
    const h2 = document.createElement('h2')
    const newButton = document.createElement('button')
    const div1 = document.querySelector('#dog-bar')
   
    

    fetch(" http://localhost:3000/pups")
    .then(resp => resp.json())
    .then(dogs => {showDogs(dogs)})
  
    const showDogs = (dogs) =>{
        dogs.forEach(dog =>{
            addDog(dog)

        })

    }

    const addDog = (dog) =>{
    
    const span = document.createElement('span')
    span.innerText = dog.name
   
       span.addEventListener('click', ()=>{
            img.src = dog.image
            h2.innerText = dog.name
            let dogStatus = dog.isGoodDog
            dogStatus === true ? newButton.innerText = "Good Dog": newButton.innerText = "Bad dog"
            newButton.addEventListener('click',() =>{
                fetch("http://localhost:3000/pups/"+dog.id,{
                    method: "PATCH",
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        isGoodDog: !dogStatus
                    })

                })
                .then(resp=> resp.json())
                .then(dog=>{
                    dog.isGoodDog === true ? newButton.innerText = "Good Dog": newButton.innerText = "Bad dog"
                })


            });

            div.append(img,h2,newButton)
        }); 

        div1.append(span)  

    }
    

});