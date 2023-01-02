function canFitNRectanglesInMSizeSquare(n, w, h, m){
    const noOfRectanglesInMSizeSquare = (Math.floor(m/w) * Math.floor(m/h));
    return  noOfRectanglesInMSizeSquare >= n;
}

function fitRectanglesInMinSizeSquare(w, h, n){
    let low = 1; 
    let high = Math.max(w, h)*n;
    let squareSize = 0;
    while(low<=high){
        let mid = low+Math.floor((high-low)/2);
        if(canFitNRectanglesInMSizeSquare(n, w, h, mid)){
            squareSize = mid;
            high = mid-1; //move towards left
        }else{
            low = mid+1;//move towards right
        }
    }
    return squareSize;
}

console.log(fitRectanglesInMinSizeSquare(2, 3, 10));