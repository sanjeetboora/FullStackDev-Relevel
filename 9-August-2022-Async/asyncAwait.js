function pun(){
    return new Promise((resolve, reject) =>{
        setTimeout(function(){
            console.log("some work is successfully done");
            //resolve("work done!!!");
            reject("work not done!!!");
        }, 5000);
    });
};

function display(){
    console.log("display");
}
async function handler(){
    console.log("earlier");
    try{
        let myPromise = await pun();
        myPromise.then(function(data){
            console.log(data);
        })
        display();
        console.log(typeof myPromise);
        console.log(myPromise);
    }
    catch(err){
        console.log(err);
    }
    
    console.log("later");
}

handler();
