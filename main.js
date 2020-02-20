const ideas = document.querySelectorAll(".idea");
//////////////////////////////////
// Call API and get pictures
//////////////////////////////////
const getSearch = async calmInput => {
  console.log("fetching " + calmInput);
  const response = await fetch(
    `https://api.unsplash.com/search/photos?query=${calmInput}&client_id=${key}`
  );
  data = await response.json();
  displayImages(data);

  // console.log(data.results);
};

//////////////////////////////////
// Function to show the images gathered from the API call
//////////////////////////////////
function displayImages(data) {
  let colour = data.results[0].color;
  let gradient = `linear-gradient(to bottom, ${colour},${data.results[1].color}, ${data.results[2].color})`;
  const topContainer = document.querySelector(".main__container");
  topContainer.style.background = `${colour}`;
  console.log(colour);

  const imageContainer = document.querySelector(".main__container--images");
  for (let i = 0; i < 10; i++) {
    // How to insert colour?
    imageContainer.style.background = gradient;
    const img = document.createElement("img");
    // let num = Math.floor(Math.random() * 10) + 1;
    let image = `${data.results[i]["urls"]["raw"]}&w=800&h=800&dpi=2`;
    img.src = image;
    imageContainer.appendChild(img);
  }
}

///////////////////////////////////
// Clear images function
//////////////////////////////////
function clearImages(clicked = null) {
  if (clicked) {
    ideas.forEach(idea => idea.classList.remove("clicked"));
  }
  const imageContainer = document.querySelector(".main__container--images");
  while (imageContainer.firstChild) {
    imageContainer.removeChild(imageContainer.firstChild);
  }
}

///////////////////////////////////
// Event listener on submit button
//////////////////////////////////
document.querySelector("#calm-form").addEventListener("submit", e => {
  e.preventDefault();
  // Get form values
  //Remove existing pictures
  clearImages();
  // Search for new pictures
  const calmInput = document.querySelector("#calm");

  if (calmInput.value === "") {
    getSearch("calm");
  } else {
    getSearch(calmInput.value);
  }

  calmInput.value = "";
});

///////////////////////////////////
// Event Listeners on the buttons
//////////////////////////////////

ideas.forEach(idea => {
  idea.addEventListener("click", e => {
    // Remake
    clearImages("clicked");
    getSearch(e.target.innerHTML);
    idea.classList.add("clicked");
  });
});

// Secret key to access API
const key = "757699383254d35cf4ebae4dd19eb9fda9049e52f394f409aad91358d23a9aea";
