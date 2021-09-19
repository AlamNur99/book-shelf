const UNREAD_LIST = "incompleteBookshelfList";
const FINIS_READ = "completeBookshelfList";
const BOOK_ITEMID = "itemId";

function readingCategory(title, auth, years, isComplete){
    const bookTitle = document.createElement("h3");
    bookTitle.innerText = title;

    const penulis =document.createElement("div");
    const author = document.createElement("p");
    author.classList.add("auth");
    author.innerText = auth;
    penulis.append(author);

    const year = document.createElement("p");
    year.classList.add("tahun");
    year.innerText = years;

    const article = document.createElement("article");
    article.classList.add("book_item");
    article.append(bookTitle, penulis, year);

    const actionButton = document.createElement("div");
    actionButton.classList.add("action");

    article.append(actionButton);

    if(isComplete){
        actionButton.append(
            uncompleteButton(),
            deleteButton()
        );
    } else {
        actionButton.append(
            completeButton(),
            deleteButton()
        )
    }
    
    
    return article;
}

function createButton(textButton, classButton, evenListener){
    const button = document.createElement("button");
    button.classList.add(classButton);
    button.innerText = textButton;
    button.addEventListener("click", function(event) {
        evenListener(event);
    });
    return button;
}

function completeButton() {
    return createButton("Selesai Dibaca", "green", function(event){
        addBookToComplete(event.target.parentElement.parentElement);
    });
}

function uncompleteButton() {
    return createButton("Belum Selesai Dibaca", "green", function(event){
        undoRead(event.target.parentElement.parentElement);
    });
}

function deleteButton() {
    return createButton("Hapus Buku", "red", function(event){
        removeBook(event.target.parentElement.parentElement);
    });
}

function addBook(){
    const unreadList = document.getElementById(UNREAD_LIST);
    const listCompleteRead = document.getElementById(FINIS_READ);
    const title = document.getElementById("inputBookTitle").value;
    const auth = document.getElementById("inputBookAuthor").value;
    const years = document.getElementById("inputBookYear").value;
    const isComplete = document.getElementById("inputBookIsComplete");
    
    if(isComplete.checked){
        const addBooks = readingCategory(title, auth, Number(years), true);
        const bookObject = composeBookselfObject(title, auth, Number(years), true);
        addBooks[BOOK_ITEMID] = bookObject.id;
        bookself.push(bookObject);
        listCompleteRead.append(addBooks);
        updataDataToStorage();
    } else {
        const addBooks = readingCategory(title, auth, Number(years), false);
        const bookObject = composeBookselfObject(title, auth, Number(years), false);
        addBooks[BOOK_ITEMID] = bookObject.id;
        bookself.push(bookObject);
        unreadList.append(addBooks);
        updataDataToStorage();
    }
    
}

function addBookToComplete(taskElement){
    const listCompleteRead = document.getElementById(FINIS_READ);
    const title = taskElement.querySelector(".book_item > h3").innerText;
    const author = taskElement.querySelector(".book_item > div").innerText;
    const year = taskElement.querySelector(".book_item > p").innerText;

    const addBooksComplete = readingCategory(title, author, year, true);
    const book = findBook(taskElement[BOOK_ITEMID]);
    book.isComplete = true;
    addBooksComplete[BOOK_ITEMID] = book.id;
    listCompleteRead.append(addBooksComplete);
    taskElement.remove();
    updataDataToStorage();
}

function undoRead(taskElement) {
    const unreadList = document.getElementById(UNREAD_LIST);
    const title = taskElement.querySelector(".book_item > h3").innerText;
    const author = taskElement.querySelector(".book_item > div").innerText;
    const year = taskElement.querySelector(".book_item > p").innerText;

    const undoBook = readingCategory(title, author, year, false);
    const book = findBook(taskElement[BOOK_ITEMID]);
    book.isComplete = false;
    undoBook[BOOK_ITEMID] = book.id;
    unreadList.append(undoBook);
    taskElement.remove();
    updataDataToStorage();
}

function removeBook(taskElement) {
    if(confirm("Apakah Anda yakin Ingin Menghapus Ini?")){
        const bookPosition = findBookIndex(taskElement[BOOK_ITEMID]);
        bookself.splice(bookPosition, 1);
        taskElement.remove();
        updataDataToStorage();
    }
}

const textSearch = document.getElementById("searchSubmit");
textSearch.addEventListener("click", (event) => {
    event.preventDefault();
    const bookTitle = document.getElementById("searchBookTitle").value.toLowerCase();
    const listTitle = document.querySelectorAll("article");

    for(title of listTitle){
        const titleBook = title.childNodes[0].innerText.toLowerCase();

        if(titleBook.includes(bookTitle)){
            title.style.display = "block";
        } else {
            title.style.display = "none";
        }
    }
})