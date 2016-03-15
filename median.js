function GetMedian(intA, intB, intC, intD, intE, intF, intG){
var num = [];
var median = 0;

if(arguments.length < 1)
	return "Invalid";


for(i = 0; i < arguments.length;i++)
{
	if(!(typeof(arguments[i]) === 'number'))
		return ("invalid");
}

for(i = 0; i < arguments.length;i++)
{
	num[i] = parseInt(arguments[i]);
}


num.sort(function(a, b){return a-b});

if(num.length % 2 == 0)
	median = (num[num.length/2-1]+num[num.length/2])/2;
else
	median = num[Math.floor(num.length/2)];

return median;
}
