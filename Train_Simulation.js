function Passenger(destination){
    this.destination = destination;
    this.name = "";
}
//###################################################################
//Train
//###################################################################

function Train(velocity, name, capacity, costPerMile, cityA, cityB){
    this.velocity = velocity;
    this.name = name; //name of the train
    this.capacity = capacity; //# passengers the train can carry
    this.costPerMile = costPerMile;
    this.totalMilesTravelled = 0;
	
    //additional member variables
    this.passengers = [];
    this.previous_city = null;
    this.current_city = cityA;
    this.next_city = cityB;
}



Train.prototype.getCity = function(){
	  	return this.current_city;
};

Train.prototype.getDestination = function(){
    return this.next_city;       
};

Train.prototype.addPassenger = function(passengerObject){
        this.passengers.push(passengerObject);
};

Train.prototype.getPassengersOnTrain = function(){
   p = [];
   for(var i = 0; i<this.passengers.length;i++)
	   p.push(this.passengers[i].name);
   return p.toString();
};

Train.prototype.incrementTime = function(){
    this.totalMilesTravelled += this.velocity;
};


//###################################################################
//City
//###################################################################


/*
Modify your trainArrives() function in your City prototype so that when a train arrives
the following occurs:
1. All passengers are removed from the train and added to the city. ok
2. The train’s current city is set to the arrival city ok
3. Any passengers who have arrived at their final destination are removed
from the city. ok
4. Select a new destination based on the destinations of the passengers at
the city.
5. Load passengers onto the train (careful not to exceed its capacity)
6. Set the destination of the train


*/


function City(cityName){
this.name = cityName; //name of the city
this.passengers = [];
this.trains = [];
this.tracks = [];
}

//store passenger in an array or linkedlist...
City.prototype.addPassenger = function(name, destination) {
	var p1 = new Passenger(destination);
	p1.name = name;

	this.passengers.push(p1);
}

City.prototype.trainArrives = function(trainObject) {
    //change train city
    if(trainObject.current_city != null)
        trainObject.previous_city = trainObject.current_city;
        
    trainObject.current_city = this.name;
    
    //add passengers to the city
    for(var i = 0; i < trainObject.passengers.length; i++)
        this.passengers.push(trainObject.passengers.pop());
    
    //Any passengers who have arrived at their final destination are removed from the city.
    for(var k = 0; k < this.passengers.length; k++){
        if(this.passengers[k].destination = this.name)
            this.passengers[k].pop();
    }
    
   //add trains to city
    this.trains.push(trainObject);
        
    //Select a new destination based on the destinations of the passengers at the city. (How do we select actually?)

    
}



City.prototype.getTrainsAtCity = function() {
	var str = "";
	if (this.trains == null) {
		return "No trains in city";
	} else {
		for (var i = 0; i < this.trains.length; i++) {
			if (i == this.trains.length - 1)
				str += this.trains[i].name;
			else
				str += this.trains[i].name + ",";
		}
	}

	return str;
}

City.prototype.getPassengersAtCity = function() {
	p = [];
	for (var i = 0; i < this.passengers.length; i++)
		p.push(this.passengers[i].name);
	return p.toString();
	
}
/*
Add an incrementTime() function in your City prototype so that the following occurs:
1. Every train at the City is checked and if it has a destination set. If it does
then check to see if the Track between the current city and the
destination city is open. If it is then add the train to the track. ok
2. If there is no destination set then remove the train from the city and call
the city’s trainArrives method using the train to “re-add” it to the city
object. 
*/

City.prototype.IncrementTime = function(){
    for(var i = 0; i < this.trains.length; i++){
        if(this.trains[i].getDestination() !== null){
            des = this.trains[i].getDestination();
            if(!this.getTrack(des).isTrainOnTrack())
                this.getTrack(des).addTrain(this.trains[i]);
        }
        else
            this.trainArrives(this.trains[i]);
    }
}

/*In order to add these functions you will need some way to link the city and the track. How you
accomplish that is up to you.*/

City.prototype.getTrack = function(destination){
    for(var i = 0; i < this.tracks.length;i++){
        if(this.tracks[i].cityB == destination)
            return this.track[i];
    }
    
    return "Not found";
}


//###################################################################
//Track
//###################################################################

//Track constructor
function Track(cityA, cityB, length){
    //the city at one end of the Tracks
    this.cityA = cityA;
    //the city at the other end of the Tracks
    this.cityB = cityB;
    //distance in miles between the two cities
    this.length = length;
    
    //additional member variables
    this.train = null;
    this.trainTraveled = 0;
}
/*
The Track object produced by the constructor must have the following methods:
isTrainOnTrack()
Method should check to see if there is currently a train on the track.
@return – true if there is a train currently on the track, false otherwise

incrementTime()
Method must call the incrementTime method of all trains on the track.

handleArrivingTrains()
Method must check the train on the track and determine whether it has arrived at its
destination. If it has, then the train should be removed from the track and added to the
destination city using the city’s trainArrives() method.

addTrain(train)
Method adds a Train object to the track.
@param train: Train Object - the train that will be travelling on the tracks.

You may assume the following:
a. Only one Train can be on any given Track.
b. A train travels a distance equal to its velocity every time the incrementTime method is
called.
c. A train must travel a distance GREATER than the Track length to arrive at its destination.
d. A train that reaches the end of the track without a destination arrives at cityB. This is for
testing purposes only… normally a Train MUST have a destination.

*/

Track.prototype.isTrainOnTrack = function(){
    if(this.train !== null)
        return true;
    return false;
}


Track.prototype.incrementTime = function(){
    this.trainTraveled += train.velocity;
}


Track.prototype.handleArrivingTrains = function(){
	if(this.trainTraveled > this.length){
		if(this.train.getDestination() === null)
			this.cityB.trainArrives(this.train);
		this.train = null;
	}
}

Track.prototype.addTrain = function(train){
	if(this.train !== null)
    		this.train = train;
}




//###################################################################
//TEST
//###################################################################

var fire = new Train(33,"fire", 550, 4);
console.log(fire);



