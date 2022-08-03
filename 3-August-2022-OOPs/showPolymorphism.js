// class Show{
//     constructor(date, name, price, venue){
//         this.date = date;
//         this.name = name;
//         this.venue = venue;
//         this.price = price;
//     }
//     display(){
//         console.log("Name: ", this.name);
//         console.log("Date is ", this.date);
//         console.log("Venue is ", this.venue);
//         console.log("Price is ", this.price);
//     }
// }

// class Movie extends Show{
//     constructor(myDate, moviName, movieVenue, price, cast){
//         super(myDate, moviName, price, movieVenue);
//         this.cast = cast;
//     }
//     getPrice(){
//         console.log(this.price);
//     }
//     display(){
//         super.display();
//         console.log("Cast is ", this.cast);
//     }
// }
// class Standup extends Show{
//     constructor(myDate, showName, showVenue, price, comic){
//         super(myDate, showName, price, showVenue);
//         this.artist = comic;
//     }
//     display(){
//         super.display();
//         console.log("Comic is ", this.artist);
//     }
// }

// let anyShow = new Show("10 Aug 2022", "my show", 500, "Banglore");
// anyShow.display();

// console.log("=======================");
// let drStrange = new Movie("20 Aug 2022","Dr Stange in space", "New Delhi", 600, ["xyz", "abc", "def"]);
// drStrange.display();

// console.log("=======================");
// let standupShow = new Standup("21 Aug 2022","BassKarBassi", "Noida", 700, "Anubhav");
// standupShow.display();


class Animal{
    constructor(name){
        this.name = name;
    }
    speak(){
        console.log(this.name, "is having a different sound");
    }
}

class Cat extends Animal{
    constructor(name){
        super(name);
    }
    speak(){
        console.log(this.name, " says meow meow");
    }
}

class Dog extends Animal{
    constructor(name){
        super(name);
    }
    speak(){
        super.speak();
        console.log(this.name, " says Woof Woof");
    }
}
let a = new Cat("Billy");
let b = new Dog("Browny");
let c= new Cat("Zora");
let myAnimals = [a, b, c];

myAnimals.forEach((animal) => {
    animal.speak();
});