import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-e9f3c-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList")
const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
var list = document.getElementById("uli");
var lim = document.getElementById("listItem")

addButtonEl.addEventListener("click", function () {
    addListItem();
    clearInput();
})

// Append list item to ul
function addListItem() {
    const inputFieldText = inputFieldEl.value;
    push(shoppingListInDB, inputFieldText)
}

onValue(shoppingListInDB, function (snapshot) {
    list.innerHTML = "";
    let items = Object.entries(snapshot.val());
    console.log(items);
    items.map((item) => {
        let li = document.createElement("li");
        li.setAttribute("class", "listItem")
        let itemID = item[0];
        let itemValue = item[1];
        li.innerText = itemValue;
        list.append(li);


        li.addEventListener("click", function () {
                console.log(itemID)
                let exactLocation = ref(database, "shoppingList/" + itemID)
                remove(exactLocation);
        })
    })
})

// clear input field
function clearInput() {
    inputFieldEl.value = ""
}


