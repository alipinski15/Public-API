/******************************************
Treehouse Techdegree:
FSJS project 5 - Request API
Written by: Aaron Lipinski
******************************************/
const gallery = document.querySelector('#gallery');
const card = document.getElementsByClassName('card');



function fetchData(url) {
    return fetch(url)
    //   .then(checkStatus)
      .then(res => res.json())
      .catch(error => console.log('Looks like there was a problem', error))
}

Promise.all([fetchData('https://randomuser.me/api/?results=12&nat=US')])
    .then(data => {
        const employee_info = data[0].results;
        const info_card = data[0].results;

        generate_card(employee_info);
        generate_modal(info_card);
    })

const generate_card = (data) => { 
    const info = data.map(person => 
    `<div class="card">
        <div class="card-img-container">
            <img class="card-img" src="${person.picture.large}" alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${person.name.first} ${person.name.last}</h3>
            <p class="card-text">${person.email}</p>
            <p class="card-text cap">${person.location.city}, ${person.location.state}</p>
        </div>
    </div>`
    ).join('');
    gallery.innerHTML = info;
}

const generate_modal = (data) => {
    const modal_card = data.map( card => 
    `<div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${card.picture.large}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${card.name.first} ${card.name.last}</h3>
                <p class="modal-text">${card.email}</p>
                <p class="modal-text cap">${card.location.city}</p>
                <hr>
                <p class="modal-text">${card.phone}</p>
                <p class="modal-text">${card.location.street.number} ${card.location.street.name}, ${card.location.state} ${card.location.postcode}</p>
                <p class="modal-text">${card.dob.date}</p>
            </div>
        </div>`
    ).join('');
}

// card.addEventListener('click', (e) => {
//     e.target = generate_modal();
// });