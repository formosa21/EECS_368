function Passenger(destination){
    this.destination = destination;
    this.name = "";
}

function Train(velocity, name, capacity, costPerMile){
    this.velocity = velocity;
    this.name = name; //name of the train
    this.capacity = capacity; //# passengers the train can carry
    this.costPerMile = costPerMile;
    this.totalMilesTravelled = 0;
	
    //additional member variables
    this.passengers = [];
    this.current_city = '';
    this.next_city = '';
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






function City(cityName){
this.name = cityName; //name of the city
this.passengers = [];
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
   
   //add trains to city
    if(this.trains == null)
        this.trains = [trainObject];
    else
        this.trains.push(trainObject);
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
