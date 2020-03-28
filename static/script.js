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
  .addEventListener("click", showOrHideModal);

function showOrHideModal() {
  if (document.querySelector("#modal-container").style.display == "flex") {
    document.querySelector("#modal-container").style.display = "none";
  } else {
    document.querySelector("#modal-container").style.display = "flex";
  }
}

document
  .querySelector("#modal-container")
  .addEventListener("click", function(e) {
    if (e.target.id == "modal-container") {
      showOrHideModal();
    }
  });

function formData2JsonObj(formdata) {
  let jsonObj = {};
  formdata.forEach((val, key) => {
    jsonObj[key] = val;
  });
  return jsonObj;
}

document
  .querySelector("#add-category-form")
  .addEventListener("submit", function(e) {
    e.preventDefault();
    let formdata = new FormData(e.target);
    let jsonObject = formData2JsonObj(formdata);
    let jsonString = JSON.stringify(jsonObject);
    console.log(jsonString);
    fetch("/category", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: jsonString
    })
      .then(response => response.json())
      .then(data => {
        console.log("Success:", data);
        CATEGORIES.push(data);
        createCategoryListItem(data);
      });
  });

let CATEGORIES = [];
document.querySelector("#category-list").addEventListener("click", function(e) {
  if (e.target.classList.contains("close")) {
    let id = parseInt(e.target.parentNode.dataset.categoryId);
    CATEGORIES = CATEGORIES.filter(obj => obj.id !== id);
    deleteStuffCategory(id);
    e.target.parentNode.parentNode.removeChild(e.target.parentNode);
  }
});

(function() {
  fetch("/category")
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data);
      data.forEach(el => {
        CATEGORIES.push(el);
        createCategoryListItem(el);
      });
    });
})();

function createCategoryListItem(object) {
  let listTag = document.createElement("li");
  let paragraphTag = document.createElement("p");
  let anchorTag = document.createElement("a");

  paragraphTag.innerHTML = object.category_description;

  anchorTag.setAttribute("href", "#");
  anchorTag.setAttribute("class", "close");

  listTag.setAttribute("data-category-id", object.id);

  listTag.appendChild(paragraphTag);
  listTag.appendChild(anchorTag);
  document.querySelector("#category-list").appendChild(listTag);
}

// generic get from endpoint function
// generic post to endpoint function
function deleteStuffCategory(id) {
  fetch("/category/" + id, { method: "DELETE" })
    .then(res => res.json())
    .then(res => console.log(res));
}
