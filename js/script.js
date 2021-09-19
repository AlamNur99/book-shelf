document.addEventListener("DOMContentLoaded", function(){
    const bookSubmit = document.getElementById("inputBook");

    bookSubmit.addEventListener("submit", function(event) {
        event.preventDefault();
        addBook();
    });

    if(isStorage()){
        loadData();
    }
});

document.addEventListener("ondatasaved", () => {
    console.log("data berhasil disimpan");
});

document.addEventListener("ondataloaded", () => {
    refreshDataFromBookSelf();
})