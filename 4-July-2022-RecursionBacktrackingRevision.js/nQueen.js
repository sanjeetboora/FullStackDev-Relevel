function isSafe(currRow, currCol, N, grid){
    //check for same column
    for(let row = currRow -1; row >= 0; row--){
        if(grid[row][currCol] == 'Q'){
            return false;
        }
    }

    //check for left diagonal
    for(let row = currRow -1, col = currCol-1; row>= 0 && col >=0; row--, col--){
        if(grid[row][col] == 'Q'){
            return false;
        }
    }

    //check for right diagonal
    for(let  row = currRow-1, col = currCol+1; row>= 0 && col <= N-1; row--, col++){
        if(grid[row][col] == 'Q'){
            return false;
        }
    }

    return true;
}


function printGrid(N, grid){
    for(let row = 0; row<N; row++){
        let str = '';
        for(let col = 0; col<N; col++){
            str= str + grid[row][col] + " ";
        }
        console.log(str);
    }
    console.log("==========================");
}

function nQueen(row, N, grid){
    //base case
    if(row == N){
        return true;
    }

    let queenPlaced = false;
    
    for(let col = 0; col<N; col++){
        if(isSafe(row, col, N, grid)){ //self work
            grid[row][col] = 'Q';
            printGrid(N, grid);
            queenPlaced = nQueen(row+1, N, grid); //recursive call

            if(queenPlaced == false){
                grid[row][col] = '_'; //backtracking
            }
            else{
                return true;
            }
        }
    }

    return queenPlaced;
}


let grid = [ 
 ['_', '_','_', '_'],
 ['_', '_','_', '_'], 
 ['_', '_','_', '_'], 
 ['_', '_','_', '_']
];
console.log(nQueen(0, 4, grid));

let grid1 = [ 
    ['_', '_','_'],
    ['_', '_','_'], 
    ['_', '_','_'], 
    ['_', '_','_']
   ];
console.log(nQueen(0, 3, grid1));