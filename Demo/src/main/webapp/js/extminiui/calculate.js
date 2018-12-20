gridSum = function(result,fileName){
	if(result.data.length==0){return 0;}
	var sum = 0;
	for(var i=0;i<result.data.length;i++){
		var data=eval(result.data[i][fileName]);
		sum+=data;
	}
	return Mathround(sum,2);
}

gridMin = function(result,fileName){
	if(result.data.length==0){return 0;}
	var temp = 0;
	var min = result.data[0][fileName];
	for(var i=0;i<result.data.length;i++){
		temp=result.data[i][fileName];
		if(min>temp){
			min=temp;
		}
	}
	return min;
}

gridMax = function(result,fileName){
	if(result.data.length==0){return 0;}
	var temp = 0;
	var max = result.data[0][fileName];
	for(var i=0;i<result.data.length;i++){
		temp=result.data[i][fileName];
		if(!(max>temp)){
			max=temp;
		}
	}
	return max;
	
}

gridAvg = function(result,fileName){
	var avg = 0;
	if(result.data.length!=0){
		avg = gridSum(result,fileName)/result.data.length;
	}
	return Mathround(avg,2);
}

function Mathround(v,e){

	var t=1;

	for(;e>0;t*=10,e--);

	for(;e<0;t/=10,e++);

	return Math.round(v*t)/t;
}
