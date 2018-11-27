

// 1. Initialize Firebase
var config = {
  apiKey: "AIzaSyD12X07W6sE28As1dwK5BRQXFF5ahCWgr4",
  authDomain: "train-scheduler-4bfb8.firebaseapp.com",
  databaseURL: "https://train-scheduler-4bfb8.firebaseio.com",
  projectId: "train-scheduler-4bfb8",
  storageBucket: "train-scheduler-4bfb8.appspot.com",
  messagingSenderId: "945998155748"
};
firebase.initializeApp(config);


var database = firebase.database();


    // Initial Values
    var trainName = "";
    var destination= "";
    var firstTrainTime= 0;
    var frequency = "";

// 2. Button for adding Trains
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

      // Grab values from text boxes
      var trainName = $("#train-name-input").val().trim();
      var destination = $("#dest-input").val().trim();
      var firstTrainTime = $("#first-time-input").val().trim();
      var frequency = $("#freq-input").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
    trainName: trainName,
    destination: destination,
    firstTrainTime: firstTrainTime,
    frequency: frequency,   
  };


      // // Code for handling the push --here we arent creating 
      //a new object, we are just putting WHOLE object into the push

      // database.ref().push({
      //   trainName: trainName,
      //   destination: destination,
      //   firstTrainTime: firstTrainTime,
      //   frequency: frequency,
      //   dateAdded: firebase.database.ServerValue.TIMESTAMP

  // Uploads train data to the database
  database.ref().push(newTrain);

    // Console.loging the last user's data
    console.log(newTrain.trainName);
    console.log(newTrain.destination);
    console.log(newTrain.firstTrainTime);
    console.log(newTrain.frequency);

  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#dest-input").val("");
  $("#first-time-input").val("");
  $("#freq-input").val("");

});

  
// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) { 
  //executes this on page load AND when a child (new entry) is added
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName= childSnapshot.val().trainName;
  var destination = childSnapshot.val().destination;


// Calculating time variables

    // Assumptions
    var tFrequency = childSnapshot.val().frequency;

    // Time is 3:30 AM
    var firstTime = childSnapshot.val().firstTrainTime;

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));





  // Train Info
  console.log(trainName);
  console.log(destination);
  console.log(firstTrainTime);
  console.log(frequency);

  console.log(nextTrain);
  console.log(tMinutesTillTrain);

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destination),
    $("<td>").text(tFrequency),
    $("<td>").text(moment(nextTrain).format("hh:mm")),
    $("<td>").text(tMinutesTillTrain),
  );
  // moment($("#start-input").val().trim(), "MM/DD/YYYY").format("X");

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);


     // Handle the errors
  }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });

