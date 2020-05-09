/******************************************
Treehouse Techdegree:
FSJS project 5 - Request API
Written by: Aaron Lipinski
******************************************/

/**
 * Global Variables
 */
const gallery = document.querySelector('#gallery');
const searchContainer = document.querySelector('.search-container');
const body = document.querySelector('body');
const noMatch = document.createElement('h3');

//CSS style change
body.style.backgroundColor = '#525d6d';

/**
 * This function fetches the data from the URL and converts into JSON. a "catch" method also captures any errors that
 * might occur and logs them to the console for viewing. 
 * @param {*} url 
 */

function fetchData(url) {
    return fetch(url)
      .then(res => res.json())
      .catch(error => console.log('Looks like there was a problem', error))
}


/**
 * The fetchData promise fetches data asynchronously from the URL provided. An "click" event listener is also created 
 * to each card that was generated. For each card clicked, that info is passed to the "generateModal" function. 
 */

fetchData('https://randomuser.me/api/?results=12&nat=US')
    .then(data => {
        employeeResults = data.results;
        
    generateCards(employeeResults);
    searchCards(employeeResults);
})



/**
 * This function uses the data from the "fetchData" promise, then creates and appends the HTML necessary
 * to display twelve employee cards on the page. 
 * @param {*} data 
 */

const generateCards = (data) => { 
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
        

        //Adds the 'click' event to each card. 
        const cards = document.querySelectorAll('.card');
        cards.forEach((card, index) => {
            card.addEventListener('click', () => {
            const card_data = employeeResults[index];
            generateModal(card_data);
        });
    })
}

/**
 * This function appends to the DOM all the necessary information needed to display when an employee card is clicked
 * and displayed. A click event is also created to close the window that was selected. 
 * @param {*} card 
 */

const generateModal = (card) => {
    //Creates the correct formatting for the birthday field.
    const birthdayInfo = new Date(`${card.dob.date}`);
    const options = {month: 'long', day: 'numeric', year: 'numeric'}
    const DOB = new Intl.DateTimeFormat('en-US', options).format(birthdayInfo)
    
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

    const currentIndex = employeeResults.findIndex((employee) => employee.login.uuid === card.login.uuid);
    const closeButton = document.getElementById('modal-close-btn');
    const previousButton = document.getElementById('modal-prev');
    const nextButton = document.getElementById('modal-next');
    
     //Creates an Event Listener for the "X" button on a employee card. Closes the Card when the "X" is clicked. 
    closeButton.addEventListener('click', () => {
        document.querySelector('.modal-container').remove();
    });
    
    //Creates the event 'click' for the "Previous" button.
    previousButton.addEventListener('click', () => {
        if(currentIndex > 0){
            document.querySelector('.modal-container').remove();
            const prevIndex = currentIndex -1;
            generateModal(employeeResults[prevIndex])
        }
    });
    //Creates the event 'click' for the "Next" button.
    nextButton.addEventListener('click', () => {
        if(currentIndex < 11){
            document.querySelector('.modal-container').remove();
            const nextIndex = currentIndex + 1;
            generateModal(employeeResults[nextIndex])
        }
    });

    //CSS style changes for the modal card.
    
    document.querySelector('.modal').style.backgroundColor = 'rgb(189, 201, 220 , 1)';
    document.querySelector('.modal-btn-container').style.backgroundColor = 'rgb(189, 201, 220 , 1)';
};

/**
 * This function appends the search bar and submit button to the DOM. Also add the event listener
 * to the search input field. The function "searchCards" is passed the input value of the search field. 
 */

const appendSearchBar = () => {
    const form = 
    `<form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
    </form>`
    searchContainer.innerHTML = form;
    
    const searchInput = document.querySelector('.search-input');
    searchInput.addEventListener('keyup', (e) => {
        e.preventDefault()
        searchCards(e.target.value);
     });
}
appendSearchBar();

/**
 * This function compares what entered into the search field, and compares it to see a name matches.
 * If a name is matched, only those matches will be displayed.
 */

const searchCards = () => {
    const searchInput = document.querySelector('.search-input');
    const cards = document.querySelectorAll('.card');
    searchContainer.appendChild(noMatch);
    let searchResults = []
    for(let i = 0; i < cards.length; i++){
        searched = cards[i];
        if(searched.innerHTML.toLowerCase().includes(searchInput.value.toLowerCase())){
            searchResults.push(searched);
            cards[i].style.display = '';
        } else {
            cards[i].style.display = 'none'
        }
    }
    if(searchResults.length > 0){
        noMatch.style.display = 'none';
    } else if(searchResults.length === 0){
        noMatch.style.display = 'block';
        noMatch.style.color = '#d87676';
        noMatch.textContent = 'Sorry, no match found.';
    } 
    if(searchInput.value === '') {
        noMatch.style.display = 'none';
    }
}
