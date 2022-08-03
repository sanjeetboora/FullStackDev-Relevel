// let obj = {
//   name: "Anish",
//   batch: "FSD",
//   details: function(){
//     console.log(this.name, "is in ", this.batch);
//   }
// }
// //console.log(obj);

// let obj1 = {
//   name: "Akash",
// }
// obj1.__proto__ = obj;

// console.log(obj1);
// obj1.details();

// console.log(obj1.__proto__);
// console.log(obj);

// console.log(obj1.__proto__.__proto__);
// console.log(obj.__proto__);

// console.log(obj.__proto__.__proto__);
// console.log(Object.__proto__.__proto__);



// // obj.details();
// // obj.toString();
// // console.log(obj.__proto__);
// // console.log(Object.__proto__);

// //obj.__proto__.__proto__;
// // Object.create();


//===========Prototypal Inheritance============


// class Animal{
//     constructor(name){
//         this.name = name;
//     }
//     speak(){
//         console.log(this.name, "is having a different sound");
//     }
// }

// class Cat extends Animal{
//     constructor(name){
//         super(name);
//     }
//     speak(){
//         console.log(this.name, " says meow meow");
//     }
// }

let Animal = {
    name: "abc",
    speak: function(){
      console.log(this.name, "is having a different sound");
    }
  }
  
  let Cat = {
    name: "def",
    walk: function(){
      console.log(this.name, " is walking");
    }
  }
  Cat.__proto__ = Animal;
  
  // console.log(Cat);
  // Cat.speak();
  
  let Kitten = {
    name: "xyz"
  }
  
  Kitten.__proto__ = Cat;
  console.log(Kitten);
  Kitten.speak();
  Kitten.walk();
  console.log(Kitten.__proto__.__proto__.__proto__);
  