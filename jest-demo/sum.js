function sum(a, b){
    return a+b;
}

function sumObjects(data){
    /*
        data={
            num1: Integer value,
            num2: Integer value
        }
    */
    const sum = data.num1 + data.num2;

    return {sum: sum};
}

function truthyValues(myString){
    if(myString === 'raining'){
        return null;
    }
    else if(myString === 'winter'){
        return undefined;
    }
    else{
        return myString;
    }
}

function showErrors(value){
    if(value){
        return value;
    }
    else{
        throw new Error('This is a falsy value', value);
    }
}

function promiseFun(value){
    return new Promise((resolve, reject) =>{
        if(value){
            resolve("Promise is resolved");
        }
        else{
            reject("Promise is rejected");
        }  
    });
}

function fun2(){
    return 15;
}

function addTwo(){
    const data = fun2();
    return 2 + data;
}



module.exports = {sum, sumObjects, truthyValues, showErrors, promiseFun, fun2, addTwo};