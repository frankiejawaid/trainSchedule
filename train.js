// Initialize Firebase
var config = {
    apiKey: "AIzaSyBt97ejV_Mv0puzoahQ1mCx3Axuv_WqO84",
    authDomain: "train-time-e8c82.firebaseapp.com",
    databaseURL: "https://train-time-e8c82.firebaseio.com",
    storageBucket: "train-time-e8c82"

};
firebase.initializeApp(config);

var database = firebase.database();

// Live Time of The Day

// var updateTime = function(){
//     var now = moment().format('hh:mm');
//     $('#currentTime').html(now);
// }
//
// $(document).ready(function(){
//     updateTime();
//     setInterval(updateTime, 1000);
// });

/*******************************************/

$('#addATrain').on('click', function(event){

    event.preventDefault();

    // Retrieve user inputs from form
    var trainName = $('#trainNameInput').val().trim();
    var destination = $('#destinationInput').val().trim();
    var firstTrain = $('#firstTimeInput').val().trim();
    var frequency = $('#frequencyInput').val().trim();

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
    $('#trainNameInput').val('');
    $('#destinationInput').val('');
    $('#firstTimeInput').val('');
    $('#frequencyInput').val('');

    //prevents moving to new page
    //return false;

});

//Create Firebase event for adding train to the database
database.ref().on('child_added', function(childSnapshot) {

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
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));




    $('.table > tbody').append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>"
        + frequency + "</td><td>" + moment(nextTrain).format("hh:mm") + "</td><td>" + tMinutesTillTrain + "</td></tr>");

});
