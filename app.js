let db;
const request = indexedDB.open("NHLTeamsDatabase", 1);

request.onerror = function(event) {
    console.error("Database error:", event.target.error);
};

request.onsuccess = function(event) {
    db = event.target.result;
    displayTeams();
};

request.onupgradeneeded = function(event) {
    db = event.target.result;
    const objectStore = db.createObjectStore("teams", { keyPath: "id", autoIncrement: true });
    objectStore.createIndex("market", "market", { unique: false });
    objectStore.createIndex("name", "name", { unique: false });
    objectStore.createIndex("alias", "alias", { unique: false });
};

document.getElementById("clearForm").addEventListener("click", clearForm); //Create clearForm function
document.getElementById("addForm").addEventListener("submit", addData); //Create AddForm function

function addData(event) {
    event.preventDefault();
    const id = document.getElementById("key").value;
    const market = document.getElementById("market").value;
    const name = document.getElementById("name").value;
    const alias = document.getElementById("alias").value;

    const transaction = db.transaction(["teams"], "readwrite");
    const objectStore = transaction.objectStore("teams");

    if (id) {
        const request = objectStore.get(parseInt(id));
        request.onsuccess = function(event) {
            const data = event.target.result;
            data.market = market;
            data.name = name;
            data.alias = alias;
            const updateRequest = objectStore.put(data);
            updateRequest.onsuccess = function() {
                displayTeams(); //Update team list
                clearForm(); //Clear data in form
            };
        };
    } else {
        const request = objectStore.add({ market, name, alias });
        request.onsuccess = function() {
            displayTeams(); //Update team list
            clearForm(); //Clear data in form
        };
    }
}

function displayTeams() {
    const objectStore = db.transaction("teams").objectStore("teams");
    const dataList = document.getElementById("dataList");
    dataList.innerHTML = "";

    objectStore.openCursor().onsuccess = function(event) {
        const cursor = event.target.result;
        if (cursor) {
            const li = document.createElement("li");
            li.textContent = `Market: ${cursor.value.market}, Name: ${cursor.value.name}, Alias: ${cursor.value.alias}`;
            li.dataset.id = cursor.value.id;

            const editButton = document.createElement("button");
            editButton.textContent = "Edit";
            editButton.onclick = function() {
                editData(cursor.value.id);
            };

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.onclick = function() {
                deleteData(cursor.value.id);
            };

            li.appendChild(editButton);
            li.appendChild(deleteButton);
            dataList.appendChild(li);

            cursor.continue();
        }
    };
}


function clearForm() {
    document.getElementById("key").value = "";
    document.getElementById("market").value = "";
    document.getElementById("name").value = "";
    document.getElementById("alias").value = "";
}