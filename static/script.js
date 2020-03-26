let addStuffForm = document.querySelector("#add-stuff");
addStuffForm.addEventListener("submit", function(e) {
  console.log(e.target);
  let formData = new FormData(e.target);
  console.log(formData);
  e.preventDefault();
  e.target.reset();
  // document.querySelector("#add-stuff").style.display = "none";
});

// // preprends PHP to all the cost value
// let tbody = document.querySelector("#tbody");

// let price_values = document.querySelectorAll(".price-value");
// price_values.forEach(function(cell) {
//   cell.innerText = "PHP " + cell.innerText;
// });

document
  .querySelector("#add-stuff-toggle")
  .addEventListener("click", function(e) {
    let funcContainer = document.querySelector("#addStuffForm");
    //checks if the other function box is visible
    if (document.querySelector("#add-stuff").style.display !== "none") {
      document.querySelector("#add-stuff").style.display = "none";
    } else {
      document.querySelector("#add-stuff").style.display = "flex";
    }
  });

document
  .querySelector("#categories-toggle")
  .addEventListener("click", function() {
    document.querySelector("#modal-container").style.display = "flex";
  });
document
  .querySelector("#modal-container")
  .addEventListener("click", function(e) {
    // console.log(e.target.id);
    // console.log(e.target);
    if (e.target.id === "modal-container") {
      this.style.display = "none";
    } else {
    }
  });
document
  .querySelector("#add-category-form")
  .addEventListener("submit", function(e) {
    e.preventDefault();
    let formdata = new FormData(e.target);
    let formValues = formdata.values();
    for (const val of formValues) {
      CATEGORIES.push(val);
    }
    console.log(CATEGORIES);
  });

let categoryList = document.querySelector("#category-list");

categoryList.addEventListener("click", function(e) {
  console.log(e.target);
  if (e.target.classList.contains("close")) {
    console.log(e.target.parentNode.parentNode);
    console.log("close button clicked!");
    e.target.parentNode.parentNode.removeChild(e.target.parentNode);
  }
});

(function() {
  fetch("/category")
    .then(response => {
      return response.json();
    })
    .then(data => {
      data.forEach(el => {
        let listTag = document.createElement("li");
        let paragraphTag = document.createElement("p");
        let anchorTag = document.createElement("a");

        paragraphTag.innerHTML = el.category_description;
        anchorTag.setAttribute("href", "#");
        anchorTag.setAttribute("class", "close");
        listTag.appendChild(paragraphTag);
        listTag.appendChild(anchorTag);
        categoryList.appendChild(listTag);
      });
    });
})();
