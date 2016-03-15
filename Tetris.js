/*
Object: tetrisGame
Attributes: 1) layout               // grid-like tetric space
            2) i_th_dropdown        // the # of dropdowns; automatically accumulates
            3) AddShape             // add shape into the layout
            4) 
            5) 
            
Function: IsShapeFalling        // check that # of dropdown has anything lie on its path in the tetrisGame 
                                // no returns true, yes returns false
                                // [see more restrictions in the function]
                                
Function: IncrementTime         // dropdown the current block (shape); each unit grid with the current dropdown + 10
*/

var tetrisGame = {};



//set up the grid layout
grid = [];
for(var i =0; i < 200; i++){
    grid.push(-1);
}
tetrisGame["grid"] = grid;

//record the i_th dropdown
tetrisGame.i_th_dropdown = 0;


//Add_Shape
tetrisGame.AddShape = function(shapeType, position, i_th_dropdown){
    if(shapeType == 0){
        if(check_if_shape_0_ok(this.grid, position)){
            shape_0(this.grid, position, i_th_dropdown);
        }
        else{
            console.log("game over!");//game over
        }
    }//end if
}


var IsShapeFalling = function(){
    //check evey dropdown #, and then + 10 to see if it's -1
    //boundary of the grid is considered
    //If one of them +10 and did not get -1, then that means there's no further downward space
    for(var i = 1; i <= 200; i++){
        if(tetrisGame.grid[i] == tetrisGame.i_th_dropdown){
            if(tetrisGame.grid[i] <= 190){
                if(tetrisGame.grid[i+10] != -1){
                    return false;
                }
            }
        }
    }
    return true;
}

var IncrementTime = function(){
    // it check reverse up to check each block in shape so blocks don't get conflicted
    for(var i = 190; i >= 1; i--){
        if(tetrisGame.grid[i] == tetrisGame.i_th_dropdown){
            //swap
            var swap = tetrisGame.grid[i+10];
            tetrisGame.grid[i+10] = tetrisGame.grid[i];
            tetrisGame.grid[i] = swap;
        }
    }
}





//shapes
function shape_0(grid, position, id){
    
    //ok to lay bricks; change array values
    for(var j = 0; j < 4; j++){
        grid[position+j] = id;
    }
}

function check_if_shape_0_ok(grid, position){
    //check if it's ok to lay bricks
    for(var i = 0; i < 4; i++){
        if(grid[position + i] == -1)
            {}
        else
            return false;
    }
    return true;
}






// run game
tetrisGame.AddShape(0,4,0);


while(IsShapeFalling()){
    IncrementTime();
}



print_grid(tetrisGame.grid);


//debug check
console.log(tetrisGame.grid.length);
print_grid(grid);



//function print_grid
function print_grid(grid){
    
    for(var i = 1; i <= 20; i++){
        var line = [];
        for(var j = (i*10-9); j <= i*10; j++){
            line += (grid[j-1] + "    ");
        }
        console.log(line);
    }
}
