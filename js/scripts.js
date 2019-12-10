// BEGIN: Global variables

// random user api endpoint
const randomUserUrl = "https://randomuser.me/api/?results=12&nat=us";

// reference gallery div
const galleryDiv = document.getElementById("gallery");

// reference the search input element
const searchElement = document.getElementById("search-input");

let randomUsersObject = {};
let randomUserArray = [];
// END: Global variables

// BEGIN: Handle all fetch requests
// random user object
const randomUsers = fetchRequest(randomUserUrl).then(randomUser => {
  generateGalleryUI(randomUser.results);
});
// END: Handle all fetch requests

// BEGIN: Handle markup generation

/**
 * will remove element by class name
 *
 * @param {string} className - class name
 *
 *     removeElementByClass('className')
 */
function removeElementByClass(className) {
  let div = document.querySelectorAll("." + className);
  Array.from(div).forEach(d => d.remove());
}

/**
 * will format date as m-d-yy
 *
 * @param {string} d - date
 * @return {string} string
 *
 *     formatDate('yyyy-mm-dd')
 */
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

/**
 * will display user profile on modal
 *
 * @param {object} randomUser - random user to show on modal
 *
 *     generateModalUI(randomUser)
 */
function generateModalUI(randomUser) {
  removeElementByClass("modal-container");

  const modalDiv = document.createElement("div");
  modalDiv.classList = "modal-container";
  modalDiv.setAttribute("id", randomUser.profileId);
  document.body.appendChild(modalDiv);

  // set up modal ui
  let modalUI = `
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X (x)</strong></button>
            <div class="modal-info-container">
                <div id="msg"></div>
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
            <button type="button" id="modal-prev" class="modal-prev btn">Prev (p)</button>
            <button type="button" id="modal-next" class="modal-next btn">Next (n)</button>
        </div>
    </div>
    `;
  // add modal to the ui
  modalDiv.innerHTML = modalUI;
  const x_close_modal = document.getElementById("modal-close-btn");
  // listen for click event to exit out from modal
  x_close_modal.addEventListener("click", e => {
    modalDiv.remove();
  });

  // handle next / previous click events
  const next = document.getElementById("modal-next");
  const prev = document.getElementById("modal-prev");

  // handle physical keyboard clicks to navigate through cards
  document.onkeypress = function(e) {
    // handle when user presses 'n' to advance to next profile
    if (e.key.toLowerCase() === "n") {
      showCard(randomUser.profileId + 1);
    }

    // handle when user presses 'p' to advance to previous profile
    if (e.key.toLowerCase() === "p") {
      showCard(randomUser.profileId - 1);
    }

    // handle when user presses 'x' to exit out of modal
    if (e.key.toLowerCase() === "x") {
      modalDiv.remove();
    }
  };

  // handle next click event
  next.addEventListener("click", () => {
    showCard(randomUser.profileId + 1);
  });

  // handle previous click event
  prev.addEventListener("click", () => {
    showCard(randomUser.profileId - 1);
  });
}

/**
 * will display the random users in the ui
 *
 * @param {array} randomUsers - random users object
 *
 *     generateGalleryUI(randomUsers)
 */
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

// set up search ui
let searchUI = `
  <form action="#" method="get">
      <input type="search" id="search-input" class="search-input" placeholder="Search...">
      <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
  </form>
`;
// reference the search div
const searchDiv = document.querySelector(".search-container");
// add the search ui
searchDiv.innerHTML = searchUI;
// END: Handle markup generation

// BEGIN: Handle events

// handle search
searchDiv.addEventListener("input", e => {
  if (e.target && e.target.id === "search-input") {
    const allUsers = document.querySelectorAll(".card");
    allUsers.forEach(u => {
      const currentUser = u.getElementsByClassName("card-name")[0].innerHTML;
      if (
        currentUser.toLowerCase().indexOf(e.target.value.toLowerCase()) >= 0
      ) {
        // found
        u.style.display = "block";
      } else {
        // not found
        u.style.display = "none";
      }
    });
  }
});

/**
 * will show the card with the profile id passed in
 *
 * @param {int} profileId - the profile id to show
 *
 *     showCard(1)
 */
function showCard(profileId) {
  const randomUsersLength = randomUserArray.length;

  if (profileId > 0 && profileId <= randomUsersLength) {
    document.getElementById("msg").innerHTML = "";
    generateModalUI(randomUserArray[profileId - 1]);
  } else {
    document.getElementById("msg").innerHTML = "No more profiles";
  }
}
// END: Handle events

// BEGIN: Helper functions
/**
 * will call the provided url and return
 * and return a json object
 *
 * @param {string} url - the url to call
 * @return {json} json object
 *
 *     fetchRequest('http://end.point')
 */
async function fetchRequest(url) {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (e) {
    throw e;
  }
}

/**
 * will set the background color to random rgb color
 *
 * setBackgroundRandomColor()
 */
function setBackgroundRandomColor() {
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  var bgColor = "rgb(" + r + "," + g + "," + b + ")";
  document.body.style.background = bgColor;
}
// END: Helper functions

window.setInterval(function() {
  setBackgroundRandomColor();
}, 3000);
