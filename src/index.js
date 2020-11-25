document.addEventListener('DOMContentLoaded', () => {

  // Update Dog info that is rendered in fields. Do PATCH resquest to Submit updated dog data in table and persist to table.


  // DOM ELEMENTS
  const baseURL = 'http://localhost:3000'
  const tableHeader = document.querySelector(".blue")
  const editDogs = document.querySelector("#container")

  // variables to render dog info to Edit Existing Dog fields
  const dogName = document.querySelector("[name='name']")
  const dogBreed = document.querySelector("[name='breed']")
  const dogSex = document.querySelector("[name='sex']")

  const dogForm = document.querySelector("#dog-form")
  // console.log(dogForm)

  // RENDERS
  const renderDog = (dogObj) => {
    const tableRow = document.createElement("tr")
    tableRow.dataset.id = dogObj.id
    tableRow.innerHTML = `
  <td>${dogObj.name}</td> <td>${dogObj.breed}</td> <td>${dogObj.sex}</td> <td><button>Edit</button></td>`
    tableHeader.append(tableRow)
  }

  const renderDogInField = dogObj => {
    dogName.value = dogObj.name
    dogBreed.value = dogObj.breed
    dogSex.value = dogObj.sex
    dogForm.dataset.id = dogObj.id
  }


  // EVENT HANDLERS
  const showDog = (event) => {

    if (event.target.matches("button")) {
      const tr = event.target.closest("tr")
      const id = tr.dataset.id
      // console.log(id)

      fetch(`${baseURL}/dogs/${id}`)
        .then(response => response.json())
        .then(dogObj => {
          renderDogInField(dogObj)
          // console.log(dogObj)
        })
    }
  }

  // const renderUpdatedDog = (dogObj) => {
  //   const tableRow = document.querySelector("tr")
  //   tableRow.dataset.id = dogObj.id
  //   tableRow.innerHTML = `
  // <td>${dogObj.name}</td> <td>${dogObj.breed}</td> <td>${dogObj.sex}</td> <td><button>Edit</button></td>`
  // }

  const updateDog = (event) => {
    event.preventDefault()
    if (event.target.matches("#dog-form")) {
      console.log(event.target)
      const id = event.target.dataset.id

      const updatedDog = {
        name: dogName.value,
        breed: dogBreed.value,
        sex: dogSex.value
      }

      fetch(`${baseURL}/dogs/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(updatedDog),
      })
        .then(response => response.json())
        .then(updatedDog => {
          renderDog(updatedDog)
          console.log('Success:', updatedDog);
        })

        tableHeader.innerHTML = ""

        initialize()

    }
  }


  // EVENT LISTENERS

  editDogs.addEventListener("click", showDog)
  dogForm.addEventListener("submit", updateDog)


  // INITIALIZE
  const initialize = () => {
    fetch(`${baseURL}/dogs`)
      .then(response => response.json())
      .then(dogsArray => {
        dogsArray.forEach(dogObj => renderDog(dogObj))
        // console.log(dogsArray)
      })
  }

  initialize()

})