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

class Movie{
    constructor(date, name, venue, price, cast){
        this.date = date;
        this.name = name;
        this.venue = venue;
        this.price = price;
        this.cast = cast;
    }
    display(){
        console.log("Name: ", this.name);
        console.log("Cast: ", this.cast);
        console.log("Date is ", this.date);
        console.log("Venue is ", this.venue);
        console.log("Price is ", this.price);
    }
}

let anyShow = new Show("10 Aug 2022", "my show", 500, "Banglore");
anyShow.display();

let drStrange = new Movie("20 Aug 2022","Dr Stange in space", "New Delhi", 600, ["xyz", "abc", "def"]);
drStrange.display();