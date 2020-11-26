document.addEventListener('DOMContentLoaded', () => {

  const baseURL = 'http://localhost:3000'

  // DOM ELEMENTS
  const tableHeader = document.querySelector("table .blue")
  const dogNameField = document.querySelector("input[name='name']")
  const dogBreedField = document.querySelector("input[name='breed']")
  const dogSexField = document.querySelector("input[name='sex']")
  const dogForm = document.querySelector("#dog-form")

  // STATE
  let dogId;


  // RENDER

  const renderDogTable = (dogObj) => {
    // console.log(dogObj)
    const tr = document.createElement("tr")
    tr.innerHTML = `
    <td class='dogName'>${dogObj.name}</td> <td class='dogBreed'>${dogObj.breed}</td> <td class='dogSex'>${dogObj.sex}</td> <td><button>Edit</button></td>`
    tr.dataset.id = dogObj.id
    tableHeader.append(tr)
  }


  // *** still need to find the correct dog row to update
  const updateSingleDog = (dogObj, dogId) => {
    
    tr.innerHTML = ""
    tr.innerHTML = `
    <td class='dogName'>${dogObj.name}</td> <td class='dogBreed'>${dogObj.breed}</td> <td class='dogSex'>${dogObj.sex}</td> <td><button>Edit</button></td>`
    tr.dataset.id = dogId
  }


  // EVENT HANDLERS
  const renderDogToEdit = (event) => {
    if (event.target.matches("button")) {
      const tr = event.target.closest("tr")

      dogNameField.value = tr.querySelector(".dogName").textContent
      dogBreedField.value = tr.querySelector(".dogBreed").textContent
      dogSexField.value = tr.querySelector(".dogSex").textContent
      dogForm.dataset.id = tr.dataset.id
    }
  }

  const editDog = (event) => {
    event.preventDefault()
    const id = event.target.dataset.id

    const updatedDog = {
      name: event.target.name.value,
      breed: event.target.breed.value,
      sex: event.target.sex.value
    }


    fetch(`${baseURL}/dogs/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedDog),
    })
      .then(response => response.json())
      .then(updatedDogObj => {
        updateSingleDog(updatedDogObj)
        console.log('Success:', updatedDogObj);
      })
  }


  // EVENT LISTENERS
  tableHeader.addEventListener("click", renderDogToEdit)
  dogForm.addEventListener("submit", editDog)

  // INITIALIZE
  const initializeDogs = () => {
    fetch(`${baseURL}/dogs`)
      .then(response => response.json())
      .then(dogArray => {
        dogArray.forEach(dogObj => renderDogTable(dogObj))
        // console.log(dogArray)
      })
  }

  initializeDogs()

})


