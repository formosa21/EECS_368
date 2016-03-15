//EECS 368 
//Kuei Hsien Chu (TABLE 13) ID:2809446

//HW 6 Question 2 --------------------------------------------------------------------------------------------------------------------
 
NinjaRobotFactory = {}
NinjaRobotFactory.robots = []

//createNinjaRobot
NinjaRobotFactory.createNinjaRobot = function (prototypename){
	
	var ninja = {};
	
	for(var i = 0; i < this.robots.length;i++)
	{
		if(this.robots[i].prototypename == prototypename)
		{	
			ninja = this.robots[i];
			break;
		}
	}
	
	return ninja;
}

NinjaRobotFactory.setNinjaPrototype = function(prototypename,height,weight,color){
    
    var ninja = {};
    ninja.color = color;
    ninja.height = height;
    ninja.weight = weight;
    ninja.prototypename = prototypename;
    
    var checkname = true;
    for(var i = 0; i < this.robots.length;i++)
    {
        if(this.robots[i].prototypename == prototypename)
            checkname = false;
    }
    
    if(checkname == true)
    {
	    if(ninja.weight<200)
	    {
		    ninja.flyingKick = function(){return("ninja robot performs flying kick");}
	    }

	    if(ninja.color=="black"){
		    ninja.hide = function(){return("ninja robot is hiding");}
	    }

	    if(ninja.height<80){
		    ninja.useStairs= function(){return("ninja robot uses stairs");}
	    }

	    if(ninja.color=="red" && ninja.weight > 140){
		    ninja.run = function(){return("ninja robot is running");}
	    }

	    if(ninja.color=="blue" && ninja.height<30){
		    ninja.dodge= function(){return("ninja robot is dodging");}
	    }


        this.robots.push(ninja);
        return true;
    }
    else
    		return false;
}

//HW 6 Question 3-----------------------------------------------------------------------------------------------------------------------------


//==================================================================================
//== NINJAROBOT PROTOTYPE | TRAINED-NINJAROBOT PROTOTYPE |WHERE INHERITANCE HAPPEN
//==================================================================================

function NinjaRobot(height, weight, color){
    this.height = height;
    this.weight = weight;
    this.color = color;
    
    this.flyingKick = function(){return("ninja robot performs flying kick");}
    this.hide = function(){return("ninja robot is hiding");}
    this.useStairs = function(){return("ninja robot uses stairs");}
    this.run = function(){return("ninja robot is running");}
    this.dodge = function(){return("ninja robot is dodging");}

    return;
}


function TrainedNinjaRobot(height, weight, color){
    //inherit NinjaRobot prototypes
    NinjaRobot.call(this,height,weight,color);
    
    //flying kick message
    fk = this.weight + this.height - 130;
    //weight message
    w = 160 - this.weight;
    //dodge number
    d = 40 - this.height;
    
    
    //Overwrite
    this.flyingKick = function(){return("ninja robot performs flying kick! " + fk);}
    this.run = function(){return("ninja robot is running! " + w);}
    this.dodge = function(){
        this.color = "black";
        return("ninja robot is dodging! " + d);
    }
}

//======================================================
//== NINJA ROBOT FACTORY
//======================================================

NinjaRobotFactory = {}

NinjaRobotFactory.createNinjaRobot = function (height,weight,color){
    var ninja = new NinjaRobot(height, weight, color);
    return ninja;
}

NinjaRobotFactory.createTrainedNinjaRobot = function(height,weight,color){
    var ninja = new TrainedNinjaRobot(height,weight,color);
    return ninja;
}



//======================================================
//== INHERITANCE FUNCTIONS
//======================================================
function inheritPrototype(childObject, parentObject) {
	var copyOfParent = Object.create(parentObject.prototype);
	copyOfParent.constructor = childObject;
	childObject.prototype = copyOfParent ;
}

inheritPrototype(TrainedNinjaRobot, NinjaRobot);
