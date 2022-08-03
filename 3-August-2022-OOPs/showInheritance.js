class Show{
    constructor(date, name, price, venue){
        this.date = date;
        this.name = name;
        this.venue = venue;
        this.price = price;
    }
    display(){
        console.log("Name: ", this.name);
        console.log("Date is ", this.date);
        console.log("Venue is ", this.venue);
        console.log("Price is ", this.price);
    }
}

class Movie extends Show{
    constructor(myDate, moviName, movieVenue, price, cast){
        super(myDate, moviName, price, movieVenue);
        this.cast = cast;
    }
    getPrice(){
        console.log(this.price);
    }
    movieDisplay(){
        this.display();
        console.log("Cast is ", this.cast);
    }
}

let anyShow = new Show("10 Aug 2022", "my show", 500, "Banglore");
anyShow.display();

console.log("=======================");
let drStrange = new Movie("20 Aug 2022","Dr Stange in space", "New Delhi", 600, ["xyz", "abc", "def"]);
drStrange.movieDisplay();
drStrange.display();
drStrange.getPrice();