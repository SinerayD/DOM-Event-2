const noteInput = document.getElementById("noteInput");
const textareaInput = document.getElementById("textareaInput");
const circles = document.querySelectorAll(".circle");
const saveBtn = document.querySelector(".saveBtn");
const cardContainer = document.querySelector(".card_container");
const searchInput = document.getElementById("search");
const searchIcon = document.querySelector(".search_box ion-icon");

saveBtn.addEventListener("click", function () {
  const noteTitle = noteInput.value.trim();
  const noteText = textareaInput.value.trim();
  const selectedColor = document.querySelector(".circle.selected");

  if (noteTitle === "") {
    alert("Please write a note title.");
    return;
  }

  if (noteText === "") {
    alert("Please add a note.");
    return;
  }

  if (!selectedColor) {
    alert("Please select a color.");
    return;
  }

  const color = selectedColor.style.backgroundColor;

  const card = document.createElement("div");
  card.classList.add("card");
  card.style.borderColor = color;

  const cardContent = `
    <h4 style="background-color:
     ${color};">
     ${noteTitle}
    </h4>
    <ion-icon name="trash-outline" class="deleteBtn"></ion-icon>
    <p>${noteText}</p>
  `;
  card.innerHTML = cardContent;

  cardContainer.appendChild(card);

  noteInput.value = "";
  textareaInput.value = "";
  noteInput.focus();
});

circles.forEach((circle) => {
  circle.addEventListener("click", function () {
    const selectedCircle = document.querySelector(".circle.selected");
    if (selectedCircle) {
      selectedCircle.classList.remove("selected");
    }
    circle.classList.add("selected");

    const checkIcons = document.querySelectorAll(".circle .checkIcon");
    checkIcons.forEach((icon) => {
      icon.style.display = "none";
    });

    const checkIcon = circle.querySelector(".checkIcon");
    checkIcon.style.display = "block";
  });
});

searchIcon.addEventListener("click", searchNotes);

function searchNotes() {
  const searchValue = searchInput.value.trim().toLowerCase();
  const cards = document.querySelectorAll(".card");

  cards.forEach(function (card) {
    const title = card.querySelector("h4").textContent.toLowerCase();
    if (title.includes(searchValue)) {
      card.style.display = "initial";
    } else {
      card.style.display = "none";
    }
  });
}

cardContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("deleteBtn")) {
    const confirmDelete = confirm("Are you sure?");
    if (confirmDelete) {
      const card = event.target.closest(".card");
      if (card) {
        card.remove();
      }
    }
  }
});
