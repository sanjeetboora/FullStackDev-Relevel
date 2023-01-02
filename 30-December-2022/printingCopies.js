function canMakeGivenCopies(a, b, m, n){
    return (Math.floor(m/a) + Math.floor(m/b)) >= n;
}

function minTimeForNCopies(a, b, n){
    if(n==1) return Math.min(a,b);

    let minTime = 0;
    let maxTime = Math.max(a, b)*n;
    let timeTakenForFirstCopy =  Math.min(a,b);
    let ans = 0; //min time to make n-1 copies
    
    while(minTime <= maxTime){
        // (start+end)/2 == start+(end-start)/2
        let mid = minTime + Math.floor((maxTime-minTime)/2);
        if(canMakeGivenCopies(a, b, mid, n-1)){
            ans = mid;
            maxTime = mid-1; //move towards left
        }
        else{
            minTime = mid+1;//move towards right
        }
    }

    return ans + timeTakenForFirstCopy;
}

console.log(minTimeForNCopies(1, 2, 5));