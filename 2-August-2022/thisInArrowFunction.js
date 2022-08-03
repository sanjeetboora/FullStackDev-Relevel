function ask_doubt(ques){
    console.log(this, ques);
}

//arrow function
let doubt = (ques) => {
    ask_doubt("hey! my new ques");
    console.log(this.educator, ques);
}

let obj = {
    educator: "abc",
    ask: doubt
}

obj.ask("What is js");
//doubt("hdksh");