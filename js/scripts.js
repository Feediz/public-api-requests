// BEGIN: Global variables
const randomUserUrl = 'https://randomuser.me/api/?results=12&nat=us';
const galleryDiv = document.getElementById('gallery');
// END: Global variables


// BEGIN: Handle all fetch requests
const randomUsers = fetchRequest(randomUserUrl).then(randomUsers => {
    console.log(randomUsers.results[3]);
    console.log(Object.keys(randomUsers.results[3]));
    console.log(Object.keys(randomUsers.results));
    console.log(randomUsers.results);
    generateGalleryUI(randomUsers.results);
});

// END: Handle all fetch requests


// BEGIN: Handle markup generation

function generateModalUI(randomUser) {
    const modalDiv = document.createElement('div');
    modalDiv.classList = 'modal-container';
    document.body.appendChild(modalDiv);
    let modalUI = `
    
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${randomUser.picture.medium}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${randomUser.title} ${randomUser.firsgt} ${randomUser.last}</h3>
                <p class="modal-text">${randomUser.email}</p>
                <p class="modal-text cap">${randomUser.location.city}</p>
                <hr>
                <p class="modal-text">${randomUser.cell}</p>
                <p class="modal-text">${randomUser.location.street.number} ${randomUser.location.street.name}, ${randomUser.location.city}, ${randomUser.location.state} ${randomUser.location.postcode}</p>
                <p class="modal-text">Birthday: ${randomUser.dob.date}</p>
            </div>
        </div>

        // IMPORTANT: Below is only for exceeds tasks 
        <div class="modal-btn-container">
            <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
            <button type="button" id="modal-next" class="modal-next btn">Next</button>
        </div>
    </div>
    `;
    modalDiv.innerHTML = modalUI;
    const x_close_modal = document.getElementById('modal-close-btn');
    x_close_modal.addEventListener('click', (e) => {
        modalDiv.remove();
    });

    // handle next / previous click events
    const next = document.getElementById('modal-next');
    const prev = document.getElementById('modal-prev');
    next.addEventListener('click', () => {
        nextCard();
    });
    prev.addEventListener('click', () => {
        prevCard();
    });
}

function generateGalleryUI(randomUsers) {
    let cardId = 0;
    randomUsers.map(randomUser => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        cardDiv.id = cardId;
        cardId ++;
        galleryDiv.appendChild(cardDiv);

        let htmlUI = `
            <div class="card-img-container">
                <img class="card-img" src="${randomUser.picture.thumbnail}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${randomUser.name.first} ${randomUser.name.last}</h3>
                <p class="card-text">${randomUser.email}</p>
                <p class="card-text cap">${randomUser.location.city}, ${randomUser.location.state}</p>
            </div>
        `;
        cardDiv.innerHTML = htmlUI;

        cardDiv.addEventListener('click', () => {
            generateModalUI(randomUser);
        });
    });

}
// END: Handle markup generation

// BEGIN: Handle events
function nextCard() {
    console.log('next');
}

function prevCard() {
    console.log('previous');
}
// END: Handle events

// BEGIN: Helper functions
async function fetchRequest(url) {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch(e) {
        throw e;
    }
}
// END: Helper functions