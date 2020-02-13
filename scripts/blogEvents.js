import API from "/scripts/data.js";
import renderBlogEntries from "/scripts/entriesDOM.js";
import createBlogEntry from "/scripts/entryComponent.js";

const blogContainer = document.querySelector("#blogContainer");

const updateFormFields = entryId => {
  const hiddenEntryId = document.querySelector("#entryId");
  const pointOfInterest = document.getElementById("nameOfPlace");
  const description = document.getElementById("description");
  const cost = document.getElementById("cost");
  const review = document.getElementById("review");
  let destination = document.getElementById("destination");
  eventManager.showReviewCost();

  fetch(`http://localhost:3000/interests/${entryId}`)
    .then(response => response.json())
    .then(entry => {
      hiddenEntryId.value = entry.id;
      pointOfInterest.value = entry.name;
      description.value = entry.description;
      cost.value = entry.cost;
      review.value = entry.review;
      if (entry.placeId == 1) {
        destination.value = "italy";
      } else if (entry.placeId == 2) {
        destination.value = "switzerland";
      } else if (entry.placeId == 3) {
        destination.value = "france";
      }
    });
};

const clearForm = () => {
  const hiddenEntryId = document.querySelector("#entryId");
  const pointOfInterest = document.getElementById("nameOfPlace");
  const description = document.getElementById("description");
  const cost = document.getElementById("cost");
  const review = document.getElementById("review");

  hiddenEntryId.value = "";
  pointOfInterest.value = "";
  description.value = "";
  cost.value = "";
  review.value = "";
};

const eventManager = {
  addBlogEntryEventListener() {
    const button = document.querySelector(".saveBtn");
    eventManager.hideReview();
    button.addEventListener("click", () => {
        eventManager.hideReview();
      const hiddenEntryId = document.querySelector("#entryId").value;
      const pointOfInterest = document.getElementById("nameOfPlace").value;
      const description = document.getElementById("description").value;
      const cost = document.getElementById("cost").value;
      const review = document.getElementById("review").value;
      let destination = document.getElementById("destination").value;
      if (destination == "italy") {
        destination = 1;
      } else if (destination == "switzerland") {
        destination = 2;
      } else if (destination == "france") {
        destination = 3;
      }
      if (pointOfInterest == false || description == false) {
        window.alert("Pleae fill out all Entry Fields");
      } else {
        const blogEntry = {
          placeId: destination,
          name: pointOfInterest,
          description: description,
          cost: cost,
          review: review
        };
        if (hiddenEntryId !== "") {
          blogEntry.id = parseInt(hiddenEntryId);
          API.editBlogEntry(blogEntry).then(() => {
            API.getBlogEntries()
              .then(renderBlogEntries)
              .then(clearForm);
          });
        } else {
          API.addBlogEntry(blogEntry).then(() => {
            API.getBlogEntries()
              .then(renderBlogEntries)
              .then(clearForm);
          });
        }
      }
    });
  },

  blogDeleteEventListener() {
    blogContainer.addEventListener("click", event => {
      if (event.target.id.startsWith("deleteBtn--")) {
        const entryIdToDelete = event.target.id.split("--")[1];
        var button = confirm("Are you sure you want to delete this entry?");
        if (button == true) {
          API.deleteBlogEntry(entryIdToDelete).then(() => {
            API.getBlogEntries().then(renderBlogEntries);
          });
        }
      } else if (event.target.id.startsWith("editBtn--")) {
        const entryToEdit = event.target.id.split("--")[1];
        updateFormFields(entryToEdit);
      }
    });
  },
  hideReview() {
    document.getElementById("reviewForm").style = "display:none";
    document.getElementById("nameOfPlaceForm").style = "";
    document.getElementById("descriptionForm").style = "";
    document.getElementById("costForm").style = "";
    document.getElementById("destinationForm").style = "";
  },
  showReviewCost() {
    document.getElementById("reviewForm").style = "";
    document.getElementById("nameOfPlaceForm").style = "display:none";
    document.getElementById("descriptionForm").style = "display:none";
    document.getElementById("costForm").style = "";
    document.getElementById("destinationForm").style = "display:none";
  }
  /*,
  addSearchEntryEventListener() {
    const search = document.getElementById("search");

    search.addEventListener("keypress", event => {
      if (event.keyCode === 13) {
        const searchCriteria = search.value;
        const searchResultPromise = API.getblogEntries();
        const blogContainer = document.querySelector(".entryLog");
        blogContainer.innerHTML = "";
        searchResultPromise.then(object => {
          object.forEach(entry => {
            for (const value of Object.values(entry)) {
              const string = JSON.stringify(value);
              const entryCard = createblogEntry(entry);
              if (string.includes(`${searchCriteria}`)) {
               return blogContainer.innerHTML += entryCard;
              }
            }
          });
        });
      }
    });
  }*/
};
export default eventManager;
