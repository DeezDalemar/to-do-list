// Selectors
const toDoInput = document.querySelector("#toDoInput");
const toDoForm = document.querySelector("#toDoForm");
const toDoListDiv = document.querySelector("#toDoListDiv");
const clearButton = document.querySelector("#clearButton");

// Counter for localStorage keys
let keyCounter = 0;

// Event listener for page load
window.onload = initList;

// Initialize the to-do list on page load
function initList() {
   keyCounter = getMaxKey() + 1;

   for (const key of Object.keys(localStorage)) {
      const value = localStorage.getItem(key);
      addToList(value);
   }
}

// Event listener for form submission
toDoForm.addEventListener("submit", function (event) {
   event.preventDefault();
   addToList();
});

// Event listener for click events on list items
toDoListDiv.addEventListener("click", function (event) {
   if (event.target.classList.contains("listItem")) {
      event.target.classList.toggle("finished-item");
   }

   //Craig recommendation, attach event handler to h5
});

// Event listener for clear button
clearButton.addEventListener("click", function () {
   clearLocalStorage();
});

// Function to add item to the to-do list
function addToList(storageData) {
   const inputValue = toDoInput.value.trim();

   if (!inputValue && !storageData) {
      return; // Skip empty items
   }

   const newListItem = document.createElement("h5");
   newListItem.innerText = storageData || inputValue;
   newListItem.classList.add("listItem");

   toDoListDiv.appendChild(newListItem);

   if (!storageData) {
      addToStorage(newListItem.innerText);
   }

   toDoInput.value = "";
}

// Function to add item to localStorage
function addToStorage(value) {
   const currentKey = keyCounter++;
   localStorage.setItem(currentKey, JSON.stringify(value));

   console.log("Added to localStorage:", value);
   console.log("Current localStorage data:", localStorage);
}

// Function to clear localStorage and reset counter
function clearLocalStorage() {
   localStorage.clear();
   keyCounter = 0;

   console.log("LocalStorage cleared.");
   console.log("Current localStorage data:", localStorage);
}

// Function to get the maximum key in localStorage
function getMaxKey() {
   let maxKey = 0;

   for (const key of Object.keys(localStorage)) {
      const keyNumber = parseInt(key);
      if (!isNaN(keyNumber) && keyNumber > maxKey) {
         maxKey = keyNumber;
      }
   }

   return maxKey;
}
