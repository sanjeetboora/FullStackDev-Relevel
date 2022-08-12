class Show{
    #price;
    constructor(name, date, price){
        this.date = date;
        this.#price = price;
        this.name = name;
    }

    display(){
        console.log(this.name, " is conducted on ", this.date, " buy your tickets at ", this.#price, "rupees");
    }

    get getPrice(){ //getter 
        return this.#price;
    }

    set setPrice(amount){ //setter
        if(amount >= 0){
            this.#price =  amount;
        }
        else{
            console.log("invalid price");
        }
    }

}

let s1 = new Show("My Show", "5 August 2022", 500);
s1.display();

// s1.#price = -100; //error as #price is private
// console.log(s1.#price);//error as #price is private
//s1.display();

console.log(s1.name);
console.log(s1.date);
console.log(s1.getPrice);
//console.log(s1.#price);
s1.setPrice = -100;
console.log(s1.getPrice);
s1.setPrice = 100;
console.log(s1.getPrice);