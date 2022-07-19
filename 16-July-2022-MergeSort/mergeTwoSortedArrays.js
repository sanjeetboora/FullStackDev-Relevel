function mergeTwoSortedArrays(arr1, m, arr2, n){
    let resultArr = new Array();
    let i=0, j=0;
    for( ;i<m && j<n; /*updated according to condition inside the loop*/){
        if(arr1[i] <= arr2[j]){
            resultArr.push(arr1[i]);
            i++;
        }
        else{
            resultArr.push(arr2[j]);
            j++;
        }
    }
    // let i=0, j=0;
    // while( i<m && j<n){
    //     if(arr1[i] <= arr2[j]){
    //         resultArr.push(arr1[i]);
    //         i++;
    //     }
    //     else{
    //         resultArr.push(arr2[j]);
    //         j++;
    //     }
    // }


    //remaining elements in arr1, push them in resultArr
    while(i<m){
        resultArr.push(arr1[i]);
        i++;
    }

     //remaining elements in arr2, push them in resultArr
     while(j<n){
        resultArr.push(arr2[j]);
        j++;
    }

    return resultArr;
}


// let A = [10, 20, 50, 100];
// let B = [4, 8, 15, 99, 110, 111, 114];
let A = [1, 2, 3];
let B = [4, 5, 6];

let result = mergeTwoSortedArrays(A, A.length, B, B.length);
console.log(result);