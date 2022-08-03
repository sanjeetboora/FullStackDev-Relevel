class Product{
    constructor(title, value){
        this.name = title;
        this.price = value;
        this.discount = 0;
    }

    display(){
        console.log(this.name);
        console.log(this.price);
        console.log(this.discount);
    }
}

let p1 = new Product("iwatch-SE", 32000);
console.log(p1);
console.log(p1.name);
p1.display();

let p2 = new Product("iPhone12", 100000);
console.log(p2);
console.log(p2.name);
p2.display();