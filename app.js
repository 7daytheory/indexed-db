document.getElementById("clearForm").addEventListener("click", clearForm); //Create clearForm function


function clearForm() {
    document.getElementById("key").value = "";
    document.getElementById("market").value = "";
    document.getElementById("name").value = "";
    document.getElementById("alias").value = "";
}