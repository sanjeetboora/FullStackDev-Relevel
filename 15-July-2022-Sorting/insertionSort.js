function insertionSort(arr, n){
   for(let i = 1; i<n; i++){
        let x = arr[i];
        let j = i-1;
        while(j >= 0 && arr[j] > x){ //shiting greater than x elements on right 
            arr[j+1] = arr[j]; //right shift jth element
            j--;
        }
        arr[j+1] = x;
    }
}
let arr = [40, 20, 10, 30, 5, 25];
let n = 6;
console.log(arr);
insertionSort(arr, n);
console.log(arr);



let str1 = "5";
let str2 = "54"; //57666

console.log(compare(str1, str2)); //str1 > str2

let strArr = ["98", "5", "54", ];
strArr = strArr.sort(compare);
console.log(strArr);

function compare(str1, str2){
    let smallerLength = Math.min(str1.length, str2.length);
    for(let i=0; i<smallerLength; i++){
        if(str1[i] < str2[i]){
            return 1;
        }
        else if(str1[i] > str2[i]){
            return -1;
        }
    }

    if(str1.length > smallerLength){
        let j = smallerLength;
        while(j < str1.length){
            if(str1[j] < str2[smallerLength-1]){
                return 1;
            }
            else if(str1[j] > str2[smallerLength-1]){
                return -1;
            }
            j++;
        }
    }
    else{
        let j = smallerLength;
        while(j < str2.length){
            if(str2[j] > str1[smallerLength-1]){
                return 1;
            }
            else if(str2[j] < str1[smallerLength-1]){
                return -1;
            }
            j++
        }
    }
    return 0;
}

