let db;
const request = indexedDB.open("NHLTeamsDatabase", 1);

request.onerror = function(event) {
    console.error("Database error:", event.target.error);
};

request.onsuccess = function(event) {
    db = event.target.result;
    console.log("Display Data!");
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
                clearForm(); //Clear data in form
            };
        };
    } else {
        const request = objectStore.add({ market, name, alias });
        request.onsuccess = function() {
            clearForm(); //Clear data in form
        };
    }
}

function clearForm() {
    document.getElementById("key").value = "";
    document.getElementById("market").value = "";
    document.getElementById("name").value = "";
    document.getElementById("alias").value = "";
}