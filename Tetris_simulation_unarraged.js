tetrisGame = {};
tetrisGame.currentState = [];
tetrisGame.initialized = false;
tetrisGame.falling = false;
tetrisGame.dotLocation = 0;


tetrisGame.diffPos = 0;
tetrisGame.id = 0;
tetrisGame.diff = 0; //desicion to move left or right
tetrisGame.curPosAndLvl = 0;
tetrisGame.curShape;
tetrisGame.rotType = 0; // 0, 1 ,2 ,3 based on optimal result


tetrisGame.AddShape = function(shapeType, position, id){
	if(!this.initialized){this.Initialize();}

	this.falling = true;
	this.curPosAndLvl = position;
	
	this.id = id;
	var optimal;
	switch(shapeType){
            
            case 0: // ==== shape
            	this.curShape = shape_0;
                optimal = optimize(this.currentState, shape_0, position);
                console.log(optimal[0]);
                console.log("got here");
                this.rotType = optimal[0];
                console.log("rotTYpe!!!:" + this.rotType);
                
                draw_shape_on_grid(this.currentState, shape_0, position, optimal[0], id);
                break;
                 
            case 1:
            	this.curShape = shape_1;
                optimal = optimize(this.currentState, shape_1, position);
                this.rotType = optimal[0];
                draw_shape_on_grid(this.currentState, shape_1, position, optimal[0], id);
                break;
                 
            case 2:
            	this.curShape = shape_2;
                optimal = optimize(this.currentState, shape_2, position);
                this.rotType = optimal[0];
                draw_shape_on_grid(this.currentState, shape_2, position, optimal[0], id);
                break;
            case 3:
            	this.curShape = shape_3;
                optimal = optimize(this.currentState, shape_3, position);
                this.rotType = optimal[0];
                draw_shape_on_grid(this.currentState, shape_3, position, optimal[0], id);
                break;
            case 4:
            	this.curShape = shape_4;
                optimal = optimize(this.currentState, shape_4, position);
                this.rotType = optimal[0];
                draw_shape_on_grid(this.currentState, shape_4, position, optimal[0], id);
                break;
            case 5:
            	this.curShape = shape_5;
                optimal = optimize(this.currentState, shape_5, position);
                this.rotType = optimal[0];
                draw_shape_on_grid(this.currentState, shape_5, position, optimal[0], id);
                break;
            case 6:
            	this.curShape = shape_6;
                optimal = optimize(this.currentState, shape_6, position);
                this.rotType = optimal[0];
                draw_shape_on_grid(this.currentState, shape_6, position, optimal[0], id);
                break;
            case 7:
            	this.curShape = shape_7;
                optimal = optimize(this.currentState, shape_7, position);
                this.rotType = optimal[0];
                draw_shape_on_grid(this.currentState, shape_7, position, optimal[0], id);
                break;
            default: //
                console.log("game over!");//game over
        }
	
	this.diff = position - optimal[1];
}

tetrisGame.IncrementTime = function(){
	if(!this.initialized){this.Initialize();}
	this.curPosAndLvl += 10;
	
	if(this.curPosAndLvl > 200)
		return;
	
	console.log("DIFF: " + this.diff)

	if((this.diff) < 0){ 
		

    	move_right(this.currentState, this.id);
		this.curPosAndLvl += 1;
    	this.diff += 1;

	}
	else if((this.diff) > 0){
	    move_left(this.currentState, this.id);
	    this.curPosAndLvl -= 1;
	    this.diff -= 1;
	}
	else{ // they equal
	    //do nothing
	}
	

	//move down
	// it check reverse up to check each block in shape so blocks don't get conflicted
	console.log("rotTYpe:" + this.rotType);
	console.log("curPosANDlvl: " + this.curPosAndLvl);
	console.log("curShape: " + this.curShape);
	clean(this.currentState, this.id);
	draw_shape_on_grid(this.currentState, this.curShape, this.curPosAndLvl, this.rotType, this.id);
	
	
	/*
    for(var i = 189; i >= 0; i--){
        if(this.currentState[i] == this.id){
            //swap
            var swap = this.currentState[i+10];
            this.currentState[i+10] = this.currentState[i];
            this.currentState[i] = swap;
        }
    }*/
    
    //if the current dropping block is no longer falling
    if(!this.IsShapeFalling())
    	chk_line_and_collect_points(this.currentState);
    	
    
}

tetrisGame.GetCurrentState = function(){
	if(!this.initialized){this.Initialize();}
	return this.currentState;
}

tetrisGame.IsShapeFalling = function(){
	if(!this.initialized){this.Initialize();}
	//from bottom to top
    //check evey dropdown #, and then + 10 to see if it's -1
    //boundary of the grid is considered
    //If one of them +10 and did not get -1, then that means there's no further downward space
    
    //This method must set one constraint -- that is, all the blocks that have block(s) above-
    //must be omitted in our loop scan. Otherwise, obviously that above block's position + 10 won't be -1,
    //and in our seven diffent shapes. So we set an array to handle this.
    
    
    
    var record_position = [];
    flag_result = true;

    for(var i = 199; i >= 0; i--){
        if(tetrisGame.currentState[i] == tetrisGame.id){
                //detect if falling is ok
                if(tetrisGame.currentState[i+10] != -1){
                	console.log("FLAGGED FALSE!");
                    flag_result = false;
                }
                //handle
                if(tetrisGame.currentState[i-10] === tetrisGame.id){
                    record_position.push(i-10);
                    tetrisGame.currentState[i-10] = -1;
                }
        }
    }
    //store back the handled blocks; at this point, falling is ok, so we store the 
    //original above blocks back w.r.t the i_th_dropdown #
    //if no handles, array length = 0. So this block won't execute.
    for(var k = 0; k < record_position.length; k++){
        tetrisGame.currentState[record_position[k]] = tetrisGame.id;
    }
    return flag_result;
}

tetrisGame.Initialize = function(){
	for(var i = 0; i < 10; i++){
		for(var j = 0; j < 20; j++){
			this.currentState.push(-1);
		}
	}
	this.initialized = true;
}


//AI 
function convert(x){
    position_code = x.toString(2);
    if(x.toString(2).length != 16){
        remain = 16 - x.toString(2).length;
        for(var i = 0; i < remain; i++){position_code = "0" + position_code;}
    }
    return position_code;
}


//left_lower_most & left_top_most
/*  most left and lowest of that column
    0  1  2  3
    4  5  6  7
    8  9  10 11
    12 13 14 15
    
    hml: how many columns to the left (exclusive to the left element)
    hmlb: how many columns to the right towards the boundary (exclusive to the left element)
*/


var shape_0 = { blocks: [0x4444, 0x0F00, 0x2222, 0x00F0], left_lower_most:[13,4,14,8], left_top_most:[1,4,2,8], hml:[0,3,0,3], hmlb:[2,3,1,3], mark: 0};
var shape_1 = { blocks: [0x0E40, 0x4C40, 0x4E00, 0x4640], left_lower_most:[4,4,4,9], left_top_most:[4,4,4,1], hml:[2,1,2,1], hmlb:[3,3,3,2], mark: 1};
var shape_2 = { blocks: [0x0C60, 0x4C80, 0xC600, 0x2640], left_lower_most:[4,8,0,9], left_top_most:[4,4,0,5], hml:[2,1,2,1], hmlb:[3,3,3,2], mark: 2};
var shape_3 = { blocks: [0x06C0, 0x8C40, 0x6C00, 0x4620], left_lower_most:[8,4,4,5], left_top_most:[8,0,4,1], hml:[2,1,2,1], hmlb:[3,3,3,2], mark: 3};
var shape_4 = { blocks: [0x0660, 0x0660, 0x0660, 0x0660], left_lower_most:[9,9,9,9], left_top_most:[5,5,5,5], hml:[1,1,1,1], hmlb:[2,2,2,2], mark: 4};
var shape_5 = { blocks: [0x44C0, 0x8E00, 0x6440, 0x0E20], left_lower_most:[8,4,9,4], left_top_most:[8,0,1,4], hml:[1,2,1,2], hmlb:[2,2,3,3], mark: 5};
var shape_6 = { blocks: [0x4460, 0x0E80, 0xC440, 0x2E00], left_lower_most:[9,8,0,4], left_top_most:[1,4,0,4], hml:[1,2,1,2], hmlb:[3,3,2,3], mark: 6};


//blocktype -- pass in shape_n variable
function optimize(grid, blocktype, position){
    var most_optimal = 200;
    var most_optimal_block_set = []
    var result = null;;
    //for 2,3,4 left leaning
    var column_select = 9;
    
    //check 4 different rotation shapes
    for(var i = 0; i < 4; i++){
    	if(result == 0)
    		break;
        //set columns to check for each shapes
        cols = 10-(blocktype["hml"][i]);
        console.log("TOTAL COLS: " + cols);

        for(var j = 0; j < cols; j++){
        	console.log("Current column testing: " + j);
            if(land_ok_for_left_lower_most_AND_no_crossover(grid, position, j, blocktype, i)){
                result = calculate_left_lower_level(grid, j, blocktype, i);
    			console.log("haha: " + result);
    			if(blocktype["mark"] == 2|| blocktype["mark"] == 3 || blocktype["mark"] == 4){
    				console.log("HAHAHAAAAAAAAAAAAAAAAAAAAAAAAAA!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1");
    				if(j < column_select){
    					if(result < most_optimal){
    							most_optimal = result;
			                    console.log("most optimal: " + most_optimal);
			                    most_optimal_block_set = [];
			                    most_optimal_block_set.push(i);
			                    console.log("OPTIMAL SHAPE[" + i + "]PUSHED!");
			                    most_optimal_block_set.push(j);
			                    console.log("OPTIMAL COLUMN[" + j + "]PUSHED!");
			                    if(most_optimal_block_set[1] == 7)
			                    	break;
			                    if(result == 0)
			                    	break;
    					}
    				}
    				
    				
    			}
    			else{
    				 if(result < most_optimal){

            		most_optimal = result;
                    console.log("most optimal: " + most_optimal);
                    most_optimal_block_set = [];
                    most_optimal_block_set.push(i);
                    console.log("OPTIMAL SHAPE[" + i + "]PUSHED!");
                    most_optimal_block_set.push(j);
                    console.log("OPTIMAL COLUMN[" + j + "]PUSHED!");
                    if(result == 0)
			                    	break;

    			}
    			
               // i is the shape,
                    // j is the column
                    //if(result  == 0)
                    	//break;
                }
            }
        }
    }
    
    return most_optimal_block_set;
}

//check whether the landing distance is smaller than h 
//column: 0 1 2 3 4 5 6 7 8 9
function land_ok_for_left_lower_most_AND_no_crossover(grid, position, column, blocktype, ith_shape){
    horizontal_distance = Math.abs(position - column);
    count_aggregate_column_height = 0;
    for(var i = (190 + column); i > column; i-=10){
        if(grid[i] == -1){
            break;
        }
        else
            count_aggregate_column_height += 1;
    }
    
    //console.log(count_aggregate_column_height);
    vertical_distance = 20 - count_aggregate_column_height; //when use vertical distance, remember that it's a distance; so start with 0 should be exclusive
    
    if(horizontal_distance >= vertical_distance)
        return false;
    
	
    //test case 
    /*
    for(var t = 0 ;t < 200; t++){
    	if(grid[t] != -1){
    		console.log(ith_shape + " shape "+ column + " column " + "oh!" + t)
    	}
    }
    */

    //check crossover
    //get the left_top_most position in the grid
    left_lower_most = (190 + column - (count_aggregate_column_height* 10)); // left_lower_most in the grid
    console.log("Column: " + column + " " + "  Aggregate heigh at this column: " + count_aggregate_column_height);
    
    top_diff = float2int((blocktype["left_lower_most"][ith_shape] / 4))*10;
   
    top_left_corner = left_lower_most - top_diff; // top left corner of that block in the grid [may be blank]
    
    k = top_left_corner; //e.g. 180
	
    position_code = convert(blocktype["blocks"][ith_shape]); //e.g. 0000011001100000
    line = 0;
    
    console.log("TOP LEFT CORNER: " + k);
    for(var j = 0; j < 4; j++){
    	u = 0; //grid positioner
        for(var a = 3-blocktype["hmlb"][ith_shape]; a < 4; a++){
        	console.log("a: " + (a+line));
        	console.log("k: " + k);
        	if((k+u)%10 == 0){ // cross the right boundary ~ break
        		if(k%10 != 0)
        			break;
        	}
        	console.log("detect position:" + (k+u));
            if(position_code[a+line] == 1 && grid[k+u] != -1){
            	console.log("CRAB! Collision at " + (a+line) + " " + (k+u) );
            	return false;
            }
                
            if((k+u)%10 == 9){
            	if((position_code[a+line] == 1 && grid[k+u] == -1) ||(position_code[a+line] == 0) || (position_code[a+line] == 0 && grid[k+u] != -1)){
            		console.log("escaped baby! at " + (a+line) + " " + (k+u));
            		break;
            	}
            	else{
            		console.log("CRAB! Collision II at " + (a+line) + " " + (k+u) );
            		return false;
            	}
            }
            u+=1;	
        }
        console.log("Test[" + j + "] ok");
        k += 10;
        line += 4;
    }
 
    return true;
    //left_top_most = left_lower_most - ((blocktype["left_lower_most"][ith_shape] - blocktype["left_top_most"][ith_shape])/4) *10;
}

function calculate_left_lower_level(grid, column, blocktype, ith_shape){
	
    total_blank = 0;
    count_aggregate_column_height = 0;
    for(var i = (190 + column); i > column; i-=10){
        if(grid[i] == -1){
            break;
        }
        else
            count_aggregate_column_height += 1;
    }
    
    left_lower_most = (190 + column - (count_aggregate_column_height * 10)); // left_lower_most in the grid
    top_diff = float2int((blocktype["left_lower_most"][ith_shape] / 4))*10;
    top_left_corner = left_lower_most - top_diff; // top left corner of that block in the grid [may be blank]
    console.log("Top left corner: " + top_left_corner);
    console.log("left_lower_most: " + left_lower_most);
    
    k = top_left_corner; //e.g. 180
    position_code = convert(blocktype["blocks"][ith_shape]);
    
    console.log("Position code in clcl_l_lower_lvl:" + position_code);
    
    line = 0;
    //convert block into grid
    /*
    for(var j = 0; j < 4; j++){
        for(var a = 3-blocktype["hmlb"][ith_shape]; a < 4; a++){
            if(position_code[a+line] == 1 && grid[k+a-1] != -1)
                grid[k + a - 1] = "f";
            if((k+a)%10 == 9)
            	break;
        }
        k += 10;
        line += 4;
    }*/
    four_by_four_start = 3-blocktype["hmlb"][ith_shape];
    for(var j = 0; j < 40; j+=10){
    	var u = 0;
        for(var a = four_by_four_start; a < 4; a++){
        	if(four_by_four_start > 0)
            	if(position_code[a+line] == 1){
					console.log("draw at " + (top_left_corner +j + u));
                	grid[top_left_corner +j + u] = "f";
                	
            	}
            if(four_by_four_start == 0)
 				if(position_code[a+line] == 1)
                	grid[top_left_corner +j + u] = "f";
            u += 1;
        }
        line += 4;
    }
    
    print_grid(grid);
   	
   	console.log("Shape: " + ith_shape + "   Left_lower_most: " +left_lower_most);
    //calculate total_blank below the left lowest element
    for(var p = left_lower_most; p < 200; p++){
     if(grid[p] == -1)
            total_blank += 1;
    }
    
    //return "f" to -1
    for(var l = 0; l < 200; l++){
    	if(grid[l] == "f")
    		grid[l] = -1;
    }
    console.log("Total_blank: " + total_blank);
    console.log("Finished calc_area -------------------------------------------");
    return total_blank;
}

//mechanics
function draw_shape_on_grid(grid, shape, position, i_th_optimal_shape, id){
    //start_pos = shape["left_lower_most"][i_th_optimal_shape];
    /*
    console.log("start drawing");
    console.log("i_th_optimal_shape: " + i_th_optimal_shape);
    position_code = convert(shape["blocks"][i_th_optimal_shape]);
    
    pos = shape["left_lower_most"][i_th_optimal_shape]%4 ;
    pos_orig = shape["left_lower_most"][i_th_optimal_shape];
    position_code = convert(shape["blocks"][i_th_optimal_shape]);
    console.log("Position CODE at: " + position_code[pos_orig]);
    
    
    console.log("EXP-------------------------");
    position_code1 = convert(shape["blocks"][i_th_optimal_shape]);
    left_lower_most1 = shape["left_lower_most"][i_th_optimal_shape];
    hmlb1 = shape["hmlb"][i_th_optimal_shape];
    start_pos = position + (Math.floor((15-left_lower_most1)/4))*10 + hmlb1; // right lowest corner
    console.log("This position:" + position);
    console.log("PC1: " + position_code1 + " LWM: " + left_lower_most1 + " hmlb: " + hmlb1 + " START_POS: " + start_pos);
    console.log("END EXP---------------------");
    
    console.log("POS:" + pos);
    console.log("SBH " + shape["hmlb"][i_th_optimal_shape] + 1);
    for(var i = position; i > (position-40); i++){
    	k = 0;
    	console.log("position i : " + i);
    	for(var j = pos; j < shape["hmlb"][i_th_optimal_shape] + 1; j++){
    		console.log("position j : " + j);
    		if(position_code[pos_orig + k] != 1)
    		{}
    		else
    			grid[position + j] = id;
    	}
    	k -=4;
    	i -= 10;
    	if(i < 10 || i > 200)
    		break;
    }
    */

    position_code = convert(shape["blocks"][i_th_optimal_shape]);
    left_lower_most = shape["left_lower_most"][i_th_optimal_shape];
    hmlb = shape["hmlb"][i_th_optimal_shape];
    start_pos = position + (Math.floor((15-left_lower_most)/4))*10 + hmlb; // right lowest corner
    
    t = 15;

    for(var i = 0; i < 4 ; i ++){
    	for(var j = 0;j < 4;j++){
    		if(position_code[t] == 1){
    			if((start_pos-j) >= (start_pos - j%10)){
    				grid[start_pos-j] = id;
    			}
    			else{
    				t = t - j;
    				break;
    			}
    		}
    	t--;
    	}
    start_pos -= 10;	
    if(start_pos < 0)
    	break;
    }
    print_grid(grid);
}

function move_left(grid, id){
    for(var i = 0; i < 200; i++){
        if(grid[i] == id){
            grid[i] = -1;
            grid[i-1] = id
        }
    }
}

function move_right(grid,id){
	console.log("THERE");
    for(var i = 199; i >= 0; i--){
 	
        if(grid[i] == id){
        	console.log("moving " + i + " to " + (i+1));
            grid[i] = -1;
            grid[i+1] = id;
        }
    }
}

function float2int (value) {
    return value | 0;
}

//clean, so the block can move
function clean(grid, id){
	for(var i = 0; i < 200; i++){
		if(grid[i] == id)
			grid[i] = -1;
	}
}

//check if there's a 10 blocks accross each line
function chk_line_and_collect_points(grid){
	//make all blocks unchangable
	var flag_recheck = false;	
	var count = 0;
	for(var i = 199; i >=0; i--){
		
		if(flag_recheck){
			i = 199;
			flag_recheck = false;
		}
			
		
		if(grid[i] != -1){
			count += 1;
			console.log("COUNT: " + count);
		}
		
		if(i % 10 == 0 && count == 10){
			console.log("COUNT == 10 !!!");
			for(var j = i; j < i+10; j++){
				grid[j] == -1;
			}
			console.log("Current i: "+ i + " PRINT GRID");
			console.log("k is going to be: " + (i+9));
			
			for(var k = i+9; k > 9; k--){
				var tmp = grid[k-10];
				grid[k-10] = -1;
				grid[k] = tmp;
			}
			print_grid(grid);
		
		flag_recheck = true;
		count = 0;
		}
		
		if((i % 10) == 0){
			console.log("THIS i: " + i);
			count = 0;
			if(i == 0)
				break;
		}
	}
}





//--------test
// run game------------------------------------------------------------
tetrisGame.AddShape(4,4,0);/*
while(tetrisGame.IsShapeFalling()){
	tetrisGame.IncrementTime();
}

tetrisGame.AddShape(0,4,1);
while(tetrisGame.IsShapeFalling()){
	tetrisGame.IncrementTime();
}

tetrisGame.AddShape(4,4,2);
while(tetrisGame.IsShapeFalling()){
	tetrisGame.IncrementTime();
}
tetrisGame.AddShape(3,4,3)
while(tetrisGame.IsShapeFalling()){
	tetrisGame.IncrementTime();
}
tetrisGame.AddShape(0,4,4)

while(tetrisGame.IsShapeFalling()){
	tetrisGame.IncrementTime();
}

tetrisGame.AddShape(3,2,5)
while(tetrisGame.IsShapeFalling()){
	tetrisGame.IncrementTime();
}

*/

//function print_grid
function print_grid(grid){
    // -1; the default empty space, is printed as '*'
    for(var i = 1; i <= 20; i++){
        var line = [];
        for(var j = (i*10-9); j <= i*10; j++){
            if(grid[j-1] == -1)
                line += (' * '+ "    ");
            else{
                if(grid[j-1].toString().length == 1)
                    line += ("~~" + grid[j-1] + "    ");
                else if(grid[j-1].toString().length == 2)
                    line += ("~" + grid[j-1] + "    ");
                else if(grid[j-1].toString().length == 3)
                    line += (grid[j-1] + "    ");
            }
        }
        console.log(line);
    }
}
   
