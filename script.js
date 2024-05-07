import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove, set } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

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
    if (inputFieldText != null && inputFieldText != "") {
        push(shoppingListInDB, inputFieldText)
    }
}

onValue(shoppingListInDB, function (snapshot) {
    list.innerHTML = "";
    if (snapshot.exists()) {
        let items = Object.entries(snapshot.val());
        console.log(items);
        items.map((item) => {
            let li = document.createElement("li");
            li.setAttribute("class", "listItem")
            let itemID = item[0];
            let itemValue = item[1];
            li.innerText = textFixXl1(itemValue);
            if(itemValue.slice(-3) == "xl1"){
                li.setAttribute("class", "listItemCheck")
            } else {
                li.setAttribute("class", "listItem")
            }
            list.append(li);

            // This applis/removes xl1
            li.addEventListener("click", function () {
                console.log(itemID);
                let exactLocation = ref(database, "shoppingList/" + itemID)
                let checker = itemValue.slice(-3)
                if (checker === "xl1") {
                    set(exactLocation, itemValue.slice(0, -3))
                } else {
                    set(exactLocation, itemValue + "xl1")

                }

            })

            li.addEventListener("dblclick", function(){
                console.log(itemID)
                let exactLocation = ref(database, "shoppingList/" + itemID)
                remove(exactLocation);                
            })

            // let timeOutId;
            // let holdTime = 1000;

            // li.addEventListener("", function () {
            //     timeOutId = setTimeout(function () {
            //         console.log(itemID)
            //         let exactLocation = ref(database, "shoppingList/" + itemID)
            //         remove(exactLocation);
            //     }, holdTime);

            // })


            // li.addEventListener("mouseup", function () {
            //     clearTimeout(timeOutId); // Clear the timeout if mouse is released before holdTime
            // });
    
            
        })

    } else {
        list.innerHTML += `<li>No items Added Yet...</li>`

    }
})

// clear input field
function clearInput() {
    inputFieldEl.value = ""
}


function textFixXl1(itemValue){
    if(itemValue.slice(-3) == "xl1"){
        return(itemValue.slice(0,-3));
    } else {
        return itemValue
    }
}

