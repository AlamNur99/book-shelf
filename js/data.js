const STORAGE_KEY = "BOOK_SELF";

let bookself = [];

function isStorage(){
    if(typeof(Storage) === undefined){
        alert("Browser kamu tidak mendukung local storage");
        return false;
    }
    return true;
}

function saveData() {
    const parsed = JSON.stringify(bookself);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event("ondatasaved"));
}

function loadData() {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(serializedData);

    if(data !== null)
    bookself = data;
    document.dispatchEvent(new Event("ondataloaded"));
}

function updataDataToStorage() {
    if(isStorage())
    saveData();
}

function composeBookselfObject(title, author, year, isComplete){
    return {
        id: +new Date,
        title,
        author,
        year,
        isComplete
    };
}

function findBook(bookId) {
    for (book of bookself){
        if(book.id === bookId)
        return book;
    }
    return null;
}

function findBookIndex(bookId){
    let index = 0;
    for (book of bookself){
        if(book.id === bookId)
        return index;
        index++;
    }

    return -1;
}

function refreshDataFromBookSelf() {
    const listUncompleted = document.getElementById(UNREAD_LIST);
    let listCompleted = document.getElementById(FINIS_READ);

    for (book of bookself){
        const newBook = readingCategory(book.title, book.author, book.year, book.isComplete);
        newBook[BOOK_ITEMID] = book.id;
        if(book.isComplete){
            listCompleted.append(newBook);
        } else {
            listUncompleted.append(newBook);
        }
    }
}