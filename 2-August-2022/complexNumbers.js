class Complex{
    constructor(real, img){
        this.real = real;
        this.imaginary = img;
    }
    display(){
        console.log(this.real, " + i", this.imaginary);
    }
    add(otherNum){
        let result = new Complex(this.real+otherNum.real, this.imaginary+otherNum.imaginary);
        return result;
    }
}

let c1 = new Complex(3, 2);
c1.display();

let c2 = new Complex(4, 5);
c2.display();

let result = c1.add(c2);
result.display();