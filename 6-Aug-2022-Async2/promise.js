function fetchData(url){
    return new Promise((shivam, akash) =>{ //resolve => shivam, reject => akash
        console.log("fetch data started");
        setTimeout(function(){
            let success = false;
            if(success){
                console.log("successfully fetched data");
                shivam("this is data");
            }else{
                console.log("failed to fetch data");
                akash("Error");
            }
            
        }, 3000);
    })
}

function display(data){
    console.log(data);
}

function details(data){
    console.log("This is the received data => ",data);
}

let fd = fetchData("www.google.com"); //returning a promise
//console.log(fd);
// display(fd);
// details(fd);

//fd.then(display); //resolve
fd.then(details)
.catch(function(data){
    console.log(data);
})
// for(let i=0; i<10000000;i++){
//     if(i == 1000000){
//         console.log("for loop execution");
//     }
// }


