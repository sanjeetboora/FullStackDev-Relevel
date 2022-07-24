function swap(arr, x, y){
    let temp = arr[x];
    arr[x] = arr[y];
    arr[y] = temp;
}
function permutation(input, position, n){
    //base case
    if(position == n){
        console.log(input);
        return;
    }

    for(let i=position; i<n; i++){
        swap(arr, position, i); //self work
        permutation(input, position+1, n); //recursive call
        swap(arr, position, i);//backtracking
    }
}

let arr = [1, 2, 3];
permutation(arr, 0, arr.length);
