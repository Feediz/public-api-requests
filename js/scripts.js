// BEGIN: Global variables
const randomUserUrl = 'https://randomuser.me/api/?results=12';
const galleryDiv = document.getElementById('gallery');
// END: Global variables


// BEGIN: Handle all fetch requests
const randomUsers = fetchRequest(randomUserUrl).then(randomUsers => {
    // console.log(randomUsers.results);
    generateGalleryUI(randomUsers.results);
});

// END: Handle all fetch requests


// BEGIN: Handle markup generation
function generateGalleryUI(randomUsers) {
    console.log(randomUsers);
    // const htmlUIArray = [];
    randomUsers.map(randomUser => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';
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
        
        // htmlUIArray.push(htmlUI);
    });

}
// END: Handle markup generation

// BEGIN: Handle events
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