class Product{
    #price; //private data-member
    constructor(title, value){
        this.name = title;
        this.#price = value;
        this.discount = 0;
    }

    display(){
        console.log("name: ", this.name);
        console.log("price: ", this.#price);
        console.log("discount: ", this.discount);
    }
}

let p1 = new Product("iwatch-SE", 32000);
console.log(p1.price);
p1.name = "Anish";
//p1.#price = -1000;
p1.display();

let p2 = new Product("iPhone12", 100000);
p2.display();