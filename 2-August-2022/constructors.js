function product(title, value){
    this.name = title;
    this.price = value;
    this.discount = 0;
}

let p1 = new product("iwatch-SE", 32000);
console.log(p1);

let p2 = new product("iPhone12", 100000);
console.log(p2);