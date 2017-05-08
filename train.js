  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCP8GQePZooYhrfDhg7r3xcP8z4V969qVo",
    authDomain: "train-activity-201d6.firebaseapp.com",
    databaseURL: "https://train-activity-201d6.firebaseio.com",
    
    storageBucket: "train-activity-201d6.appspot.com",
    
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  // Live Time of The Day 

  var updateTime = function(){
  	var now = moment().format('hh:mm');
  	$('#currentTime').html(now);
  }

  $(document).ready(function(){
    updateTime();
    setInterval(updateTime, 1000);
});

  /*******************************************/

$('#submit').on('click', function(){

	// Retrieve user inputs from form
	var trainName = $('#trainName').val().trim();
	var destination = $('#destination').val().trim();
	var firstTrain = $('#firstTrain').val().trim();
	var frequency = $('#frequency').val().trim();

	// Create an object for new train to be added
	var newTrain = {
		trainName: trainName,
		destination: destination,
		firstTrain: firstTrain,
		frequency: frequency
	}

	// Uploads train data to the database
	database.ref().push(newTrain);

	//Clears all of the text-boxes
	$('#trainName').val('');
	$('#destination').val('');
	$('#firstTrain').val('');
	$('#frequency').val('');

	//prevents moving to new page
	return false;

});

	//Create Firebase event for adding train to the database
	database.ref().on('child_added', function(childSnapshot, prevChildKey) {

	console.log(childSnapshot.val());

	// Store everything into a variable.
	var trainName = childSnapshot.val().trainName;
	var destination = childSnapshot.val().destination;
	var firstTrain = childSnapshot.val().firstTrain;
	var frequency = childSnapshot.val().frequency;

	// Train Info
	console.log(trainName);
	console.log(destination);
	console.log(firstTrain);
	console.log(frequency);

	// Clear button event
	$("#clear").on("click", function() {

	// Clear database
	database.ref().remove();
	// Clear document table
	$("#train-table").html("");
})	
	//Train time Equations

	// First Time (pushed back 1 year to make sure it comes before current time)
	var firstTimeConverted = moment(firstTrain,"hh:mm").subtract(1, "years");
	console.log(firstTimeConverted);


	// Current Time
	var currentTime = moment();
	console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

	// Difference between the times
	var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
	console.log("DIFFERENCE IN TIME: " + diffTime);

	// Time apart (remainder)
	var tRemainder = diffTime % frequency;
	console.log(tRemainder);

		// Minute Until Train
	var tMinutesTillTrain = frequency - tRemainder;
	console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

	// Next Train
	var nextTrain = moment().add(tMinutesTillTrain, "minutes")
	console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"))




	$('.table > tbody').append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>"
		+ frequency + "</td><td>" + "Delayed" + "</td><td>" + "Unknown" + "</td></tr>");

});
