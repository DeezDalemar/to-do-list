let toDoInput = document.querySelector("#toDoInput");
let toDoForm = document.querySelector("#toDoForm");
let toDoListDiv = document.querySelector("#toDoListDiv");
let clearButton = document.querySelector("#clearButton");
let i = 0;

window.onload = initList();

function initList() {
   let maxKey = 0;

   for (const key of Object.keys(window.localStorage)) {
      const keyNumber = parseInt(key);
      if (!isNaN(keyNumber) && keyNumber > maxKey) {
         maxKey = keyNumber;
      }
   }

   i = maxKey + 1;

   for (const key of Object.keys(window.localStorage)) {
      const value = window.localStorage.getItem(key);
      addToList(value);
   }
}

toDoForm.addEventListener("submit", function (event) {
   event.preventDefault();
   addToList();
});

// Using event delegation to handle click events on dynamically added list items
toDoListDiv.addEventListener("click", function (event) {
   if (event.target.classList.contains("listItem")) {
      event.target.classList.toggle("finished-item");
   }
});

clearButton.addEventListener("click", function () {
   clearLocalStorage();
   // Optionally, you can also clear the displayed list on the page
   //clearToDoList();
});


function addToList(storageData) {
   if (!toDoInput.value && !storageData) {
      return; // Don't add empty items to the list or storage
   }

   let newListItem = document.createElement("h5");
   newListItem.innerText = storageData || toDoInput.value;
   newListItem.classList.add("listItem"); // Add your custom class

   toDoListDiv.appendChild(newListItem);

   if (!storageData) {
      addToStorage(newListItem.innerText);
   }

   toDoInput.value = "";
}

function addToStorage(value) {
   const currentKey = i;
   i++;

   window.localStorage.setItem(currentKey, JSON.stringify(value));

   const storageItem = JSON.parse(window.localStorage.getItem(currentKey));
   console.log(storageItem);

   const localStorageData = JSON.stringify(window.localStorage);
   console.log(localStorageData);
}

function clearLocalStorage() {
   window.localStorage.clear();
   // Reset the counter to 0 after clearing storage
   i = 0;
}

function clearToDoList() {
   // Clear the displayed list on the page
   toDoListDiv.innerHTML = "";
}
