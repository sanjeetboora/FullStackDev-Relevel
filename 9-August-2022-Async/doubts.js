

// for(var i=0; i<4; i++){
//     setTimeout(function(){
//         console.log(i);
//     }, 1000);
// }


// var x = 5;
// function fun(){
//     console.log("inside fun",x); 
// }

// fun();
// console.log(x);


// var myFun = fun();
// // console.log(myName);
// let myName = "ABCD";

// function fun(){
//     var x = 5;
//     console.log("inside fun",x); 
//     return function(){
//         console.log("inside returned function", x);
//     }
// }

// myFun();

// myFun => function(){
//     console.log("inside returned function", x);
// }






// function fun(){
//     var xyz = "xyz";
//     let hello = "hello";
//     for(let i = 0; i<1; i++){
//         const bhi = "bhi";
//         var abc = "abc";
//         let hi = "hi";
//     }
//     console.log(bhi);
//     console.log(xyz);
//     console.log(hello);
//     console.log(abc);
//     console.log(hi);//error
// }
// console.log(bhi);
//error
// console.log(xyz);
//     console.log(hello);
//     console.log(abc);
//     console.log(hi);

//fun();




// var xyz = "xyz";
// let hello = "hello";
// for(let i = 0; i<1; i++){
//     const bhi = "bhi";
//     var abc = "abc";
//     var abc = "hjk";
//     let hi = "hi";
// }
// // console.log(bhi);
// console.log(xyz);
// console.log(hello);
// console.log(abc);
// console.log(hi);


// let i = 0;
// for(let i=0; i<4; i++){
//     setTimeout(function(){
//         console.log(i);
//     }, 1000);
// }






function download(url, filePath, toCompress) {
    console.log("Started Downloading The File from", url);
    setTimeout(() => {
      console.log("File Downloaded Succesfully")
      toCompress(filePath , url);
    }, 3000);
  }
  function compress(filePath, url) {
    console.log("Started Compressing The file at", filePath,"and", url);
    setTimeout(() => {
      console.log("File Compressed Successfully");
     
    }, 4000)
  }

  download("https://www.downloadfile.com/image.jpg", "./image.jpg" , function(url , filePath){
    compress(url , filePath );
  });
