let toDoInput = document.querySelector("#toDoInput");
let toDoForm = document.querySelector("#toDoForm");
let toDoListDiv = document.querySelector("#toDoListDiv");
let i = 0;

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

function addToList() {
   let newListItem = document.createElement("h5");
   newListItem.innerText = toDoInput.value;
   newListItem.classList.add("listItem"); // Add your custom class

   toDoListDiv.appendChild(newListItem);

   addToStorage(toDoInput.value);

   toDoInput.value = " ";

   
}


function addToStorage(value) {
   window.localStorage.setItem(i, JSON.stringify(value))

   const storageItem = JSON.parse(window.localStorage.getItem(i))
   console.log(storageItem);

   const localStorageData = JSON.stringify(window.localStorage);
   console.log(localStorageData);

   i++
}