/******************************************
Treehouse Techdegree:
FSJS project 5 - Request API
Written by: Aaron Lipinski
******************************************/
const gallery = document.querySelector('#gallery');
const search_container = document.querySelector('.search-container');
const body = document.querySelector('body');
let employee_results = [];


/**
 * This function fetches the data from the URL and converts into JSON. a "catch" method also captures any errors that
 * might occur and logs them to the console for viewing. 
 * @param {*} url 
 */

function fetchData(url) {
    return fetch(url)
    //   .then(checkStatus)
      .then(res => res.json())
      .catch(error => console.log('Looks like there was a problem', error))
}

/**
 * The fetchData promise fetches data asynchronously from the URL provided. An "click" event listener is also created 
 * to each card that was generated. For each card clicked, that info is passed to the "generate_modal" function. 
 */

fetchData('https://randomuser.me/api/?results=12&nat=US')
    .then(data => {
        const employee_info = data.results;
        employee_results.push(employee_info);

        generate_cards(employee_info);

        const cards = document.querySelectorAll('.card');
        cards.forEach((card, index) => {
            card.addEventListener('click', () => {
            const card_data = employee_info[index];
            generate_modal(card_data);
        });
    })
})



/**
 * This function uses the data from the "fetchData" promise, then creates and appends the HTML necessary
 * to display twelve employee cards on the page. 
 * @param {*} data 
 */

const generate_cards = (data) => { 
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

/**
 * This function appends to the DOM all the necessary information needed to display when an employee card is clicked
 * and displayed. A click event is also created to close the window that was selected. 
 * @param {*} card 
 */

const generate_modal = (card) => {
    //Creates the correct formatting for the birthday field.
    const birthday_info = new Date(`${card.dob.date}`);
    const options = {month: 'long', day: 'numeric', year: 'numeric'}
    const DOB = new Intl.DateTimeFormat('en-US', options).format(birthday_info)
    
    const modal_card =  
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
                <p class="modal-text">DOB: ${DOB}</p>
            </div>
        </div>
        <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
                </div>
            </div>`
    gallery.insertAdjacentHTML('afterend', modal_card);

   
    const close_button = document.getElementById('modal-close-btn');
    const previous_button = document.getElementById('modal-prev');
    
     //Creates an Event Listener for the "X" button on a employee card. Closes the Card when the "X" is clicked. 
    close_button.addEventListener('click', () => {
        document.querySelector('.modal-container').remove();
    });
    
    
    previous_button.addEventListener('click', () => {
        document.querySelector('.modal-container').remove();
        for(let i = 0; i < employee_results.length; i++){
            
        }
    });
}

const search_bar = (names) => {
    const form = 
    `<form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>`
    search_container.innerHTML = form;
    
    const search_input = document.querySelector('#search-input');
    let searched = [];
    for(let i = 0; i < names.length; i++){
        const name_searched = names[i];
        const variable_name = name_searched.innerHTML;
        name_searched.style.display = 'none'

        if(variable_name.toLowerCase().includes(search_input.value.toLowerCase())){
            searched.push(name_searched);
         }
        if(search_input.value === ''){
            searched.style.display = 'block';
        }
        console.log(searched);
    }
    search_input.addEventListener('keyup', () => {
        search_bar(employee_results);
     });
}
search_bar(employee_results);
