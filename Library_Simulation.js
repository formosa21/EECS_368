
function Book(name, numpages) {
    this.name = name;
    this.numpages = numpages;
}

Book.prototype.markedPlace = 0;
Book.prototype.markPlaceInBook = function(pageNumber) {
    this.markedPlace = pageNumber
}

Book.prototype.getNumberOfPages = function() {
    return this.numpages;
}
Book.prototype.finishBook = function() {
    this.markPlaceInBook(this.getNumberOfPages() - 1);
}

//----------------------------------------------------------------------------


function Library(){
    this.bookshelf = [];
}

Library.prototype.addBook = function(bookObject){
    book_new = new Book(bookObject.name, bookObject.numpages)
    book_new.marks = [];
    this["bookshelf"].push(book_new);
}

Library.prototype.getBook = function(index){
    if(this.outOfRange(index))
        return null;
    else    
        return this["bookshelf"][index];
}



Library.prototype.outOfRange = function(index){
    if(index >= this.bookshelf.length)
        return true;
    return false;    
}


Library.prototype.markPlaceInBook = function(readerName, index, pageNumber){
    
    marks_in_that_book = this.bookshelf[index].marks;
    console.log(marks_in_that_book.length);
    marks_in_that_book[marks_in_that_book.length] = {};
    marks_in_that_book[marks_in_that_book.length-1][readerName] = pageNumber;
    
    for(var i = 0; i < this.bookshelf.length; i++){
        if(i != index){
            if( this.bookshelf[i].name === this.bookshelf[index].name)
            this.bookshelf[i].marks.push(marks_in_that_book[marks_in_that_book.length-1]);
        }
    }
}


Library.prototype.getBookForReader = function(readerName,index){
    
    if(this.outOfRange(index))
        return null;
    else{
        
        thebook = this.bookshelf[index];
        for(var i = 0; i < thebook.marks.length; i++){
                if(typeof(thebook.marks[i][readerName]) != 'undefined'){
                    
                    var datpage = thebook.marks[i][readerName];
                    
                    thebook.markPlaceInBook(datpage);
                    return thebook;

                }
        }
        return this.getBook(index);
    }

}



//test------------------------------------------

berk = new Library();
swanLake = new Book("swanLake", 222);
bayadere = new Book("bayadere", 1122);
giselle = new Book("giselle", 333)
//swanlake has index [0,1,2]
berk.addBook(swanLake);
berk.addBook(swanLake);
berk.addBook(swanLake);
//bayadere has index [3]
berk.addBook(bayadere);
berk.addBook(giselle);
//giselle has index [4]
console.log("After adding the book--------");
console.log(berk);

berk.markPlaceInBook("John",0,33);
berk.markPlaceInBook("Bob",0,123);
berk.markPlaceInBook("John",4,45);


console.log("\nAfter marking the book:---------");
console.log(berk);

//get the books
john_swanlake = berk.getBookForReader('John',1);
john_bayadere = berk.getBookForReader('John',3);
Bob_swanlake = berk.getBookForReader('Bob', 2);
john_giselle = berk.getBookForReader('John', 4);


console.log("\nJohn is getting:");
console.log(john_swanlake);
console.log(john_bayadere);
console.log(john_giselle);
console.log("Bob is getting:");
console.log(Bob_swanlake);

