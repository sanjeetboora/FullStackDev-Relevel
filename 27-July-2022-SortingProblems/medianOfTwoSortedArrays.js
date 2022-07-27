function mergeTwoSortedArrays(arr1, arr2, n){
    let i=0, j=0;
    let count =0;
    let sum =0;
    while( count <= n+1){
        if(arr1[i] <= arr2[j]){
            count++;
            if(count == n || count == n+1){
                sum += arr1[i];
            }
            i++;
        }
        else{
            count++;
            if(count == n || count == n+1){
                sum += arr2[j];
            }
            j++;
        }
    }
    return sum/2;
}


// let A = [10, 20, 50, 100];
// let B = [4, 8, 15, 99, 110, 111, 114];
let A = [1,3, 4];
let B = [2, 5, 6];
let n = A.length;
let result = mergeTwoSortedArrays(A,B, n);
console.log(result);
