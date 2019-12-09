// BEGIN: Global variables
const randomUserUrl = "https://randomuser.me/api/?results=12&nat=us";
const galleryDiv = document.getElementById("gallery");
const galleryElements = document.querySelectorAll(".gallery");
const searchElement = document.getElementById("search-input");

let randomUsersObject = {};
let randomUserArray = [];
// END: Global variables

// BEGIN: Handle all fetch requests

const randomUsers = fetchRequest(randomUserUrl).then(randomUser => {
  generateGalleryUI(randomUser.results);
});
// END: Handle all fetch requests

// BEGIN: Handle markup generation
function removeElementByClass(className) {
  let div = document.querySelectorAll("." + className);
  Array.from(div).forEach(d => d.remove());
}
function formatDate(d) {
  let tmpDate = new Date(d);

  let year = tmpDate.getFullYear();
  let month = tmpDate.getMonth() + 1;
  let day = tmpDate.getDate();

  if (day < 10) {
    day = "0" + day;
  }

  if (month < 10) {
    month = "0" + month;
  }

  return month + "-" + day + "-" + year;
}
function generateModalUI(randomUser) {
  removeElementByClass("modal-container");

  const modalDiv = document.createElement("div");
  modalDiv.classList = "modal-container";
  modalDiv.setAttribute("id", randomUser.profileId);
  document.body.appendChild(modalDiv);
  let modalUI = `
    
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${
                  randomUser.picture.medium
                }" alt="profile picture">
                <h3 id="name" class="modal-name cap">${
                  randomUser.name.title
                }. ${randomUser.name.first} ${randomUser.name.last}</h3>
                <p class="modal-text">${randomUser.email}</p>
                <p class="modal-text cap">${randomUser.location.city}</p>
                <hr>
                <p class="modal-text">${randomUser.cell}</p>
                <p class="modal-text">${randomUser.location.street.number} ${
    randomUser.location.street.name
  }, ${randomUser.location.city}, ${randomUser.location.state} ${
    randomUser.location.postcode
  }</p>
                <p class="modal-text">Birthday: ${formatDate(
                  randomUser.dob.date
                )}</p>
            </div>
        </div>

        
        <div class="modal-btn-container">
            <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
            <button type="button" id="modal-next" class="modal-next btn">Next</button>
        </div>
    </div>
    `;
  modalDiv.innerHTML = modalUI;
  const x_close_modal = document.getElementById("modal-close-btn");
  x_close_modal.addEventListener("click", e => {
    modalDiv.remove();
  });

  // handle next / previous click events
  const next = document.getElementById("modal-next");
  const prev = document.getElementById("modal-prev");

  next.addEventListener("click", () => {
    showCard(randomUser.profileId + 1);
  });
  prev.addEventListener("click", () => {
    showCard(randomUser.profileId - 1);
  });
}

function generateGalleryUI(randomUsers) {
  let cardId = 1;
  randomUsers.map(randomUser => {
    randomUserArray.push(randomUser);
    const cardDiv = document.createElement("div");
    cardDiv.className = "card";
    cardDiv.setAttribute("id", cardId);
    randomUser.profileId = cardId;
    cardId++;
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

    cardDiv.addEventListener("click", () => {
      generateModalUI(randomUser);
    });
  });
}

// add search ui
let searchUI = `
  <form action="#" method="get">
      <input type="search" id="search-input" class="search-input" placeholder="Search...">
      <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
  </form>
`;
const searchDiv = document.querySelector(".search-container");
searchDiv.innerHTML = searchUI;
// END: Handle markup generation

// BEGIN: Handle events

// handle search
searchDiv.addEventListener("input", e => {
  if (e.target && e.target.id === "search-input") {
    // console.log(galleryDiv);
    // console.log(`you searched for: ${e.target.value}`);
    galleryElements.forEach(el => {
      console.log(el);
    });
  }
});
function showCard(profileId) {
  const randomUsersLength = randomUserArray.length;

  if (profileId > 0 && profileId <= randomUsersLength) {
    generateModalUI(randomUserArray[profileId - 1]);
  }
}
// END: Handle events

// BEGIN: Helper functions
async function fetchRequest(url) {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (e) {
    throw e;
  }
}
// END: Helper functions
