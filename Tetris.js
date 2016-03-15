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
        this.i_th_dropdown = i_th_dropdown;
        switch(shapeType){
            
            case 0: // ==== shape
                if(check_if_shape_0_ok(this.grid, position)){
                    shape_0(this.grid, position, i_th_dropdown);
                 }
                 break;
                 
            case 1:
                if(check_if_shape_1_ok(this.grid, position)){
                    shape_1(this.grid, position, i_th_dropdown);
                 }
                 break;
                 
            case 2:
                if(check_if_shape_2_ok(this.grid, position)){
                    shape_2(this.grid, position, i_th_dropdown);
                 }
                 break;
                 
            default: //
                console.log("game over!");//game over
        }
    }
    
    
    var IsShapeFalling = function(){
        //from bottom to top
        //check evey dropdown #, and then + 10 to see if it's -1
        //boundary of the grid is considered
        //If one of them +10 and did not get -1, then that means there's no further downward space
        
        //This method must set one constraint -- that is, all the blocks that have block(s) above-
        //must be omitted in our loop scan. Otherwise, obviously that above block's position + 10 won't be -1,
        //and in our seven diffent shapes. So we set an array to handle this.
        var record_position = [];
        
        for(var i = 199; i >= 0; i--){
            if(tetrisGame.grid[i] == tetrisGame.i_th_dropdown){
                     //detect if falling is ok
                    if(tetrisGame.grid[i+10] != -1){
                        return false;
                    }
                    //handle
                    if(tetrisGame.grid[i-10] === tetrisGame.i_th_dropdown){
                        record_position.push(i-10);
                        tetrisGame.grid[i-10] = -1;
                    }
            }
        }
        
        //store back the handled
        //at this point, falling is ok, so we store the original above blocks back w.r.t the i_th_dropdown #
        for(var k = 0; k < record_position.length; k++){
            tetrisGame.grid[record_position[k]] = tetrisGame.i_th_dropdown;
        }
        
        return true;
    }
    
    var IncrementTime = function(){
        // it check reverse up to check each block in shape so blocks don't get conflicted
        for(var i = 189; i >= 0; i--){
            if(tetrisGame.grid[i] == tetrisGame.i_th_dropdown){
                //swap
                var swap = tetrisGame.grid[i+10];
                tetrisGame.grid[i+10] = tetrisGame.grid[i];
                tetrisGame.grid[i] = swap;
            }
        }
    }
    
    
    
    
    
    //shapes--------------------
    //shape_0
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
    
    //shape_1 (T shape block)
    function shape_1(grid, position, id){
        //ok to lay bricks; change array values
       for(var j = 0; j < 3; j++){
            grid[position+j] = id;
            //when middle block is built...lower middle block gets built too
            if(j == 1){
                grid[position+10 + j] = id;
            }
        }
    }
    
    function check_if_shape_1_ok(grid, position){
        //check the top 3 in a row is ok
        for(var i = 0; i < 3; i++){
            if(grid[position + i] == -1)
                {}
            else
                return false;
            //check the T bottom brick
            if(i == 1){
                if(grid[position + 10 + i] == -1)
                {}
                else
                    return false;
            }
        }//end for
        return true
    }
    
    //shape_2     ||||  
    //          ||||
    function shape_2(grid, position, id){
        for(var i = 0; i < 3; i++){
            //build the lower block
            if(i === 0 || i === 1){
                grid[position + i + 10] = id;
            }
            //build the upper blocks
            if(i ==1 || i == 2){
                grid[position + i] = id;
            }
        }    
    }
    
    function  check_if_shape_2_ok(grid, position){
        for(var i = 0; i < 3; i++){
            //check the lower blocks  
            if(i === 0 || i === 1){
                if(grid[position + i + 10] == -1)
                {}
                else
                    return false;
            }
            //upper blocks
            if(i ==1 || i == 2){
                if(grid[position + i] == -1)
                {}
                else
                    return false;
            }
        }//end for   
    }
    
    
    
    
    
    
    
    
    
    // run game------------------------------------------------------------
    tetrisGame.AddShape(0,4,0);
    while(IsShapeFalling()){
        IncrementTime();
    }
    /*
    tetrisGame.AddShape(1,2,1);
    while(IsShapeFalling()){
        IncrementTime();
    }
    */
    


    
    
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
