function ways (r,c,i,j,path){ 
	if(i>=r || j>=c) return 0; 
	if(i==r-1 && j==c-1){
		console.log(path);
		return 1;
	} 
	
	return ways ( r,c,i+1,j, path+'D') +  ways(r,c,i,j+1, path+'R');
		
}
let arr = [[0,0,0],[0,0,0],[0,0,0]];
console.log(ways(3,3,0,0, ""));



function ways1 (arr, r,c,i,j,path){ 
	if(arr[i][j] == 1||i>=r || j>=c) return 0; 
	if(i==r-1 && j==c-1){
		console.log(path);
		return 1;
	} 
	
	return ways1 (arr, r,c,i+1,j, path+'D') +  ways1(arr, r,c,i,j+1, path+'R');
		
}
let arr1 = [[0,1,0],[0,0,0],[1,0,0]];
console.log(ways1(arr1, 2,5,0,0, ""));


