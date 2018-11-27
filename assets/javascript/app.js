$(document).ready(function () {

  // Some APIs will give us a cross-origin (CORS) error. This small function is a fix for that error. You can also check out the chrome extenstion (https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en).
  jQuery.ajaxPrefilter(function (options) {
    if (options.crossDomain && jQuery.support.cors) {
      options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
    }
  });

  // ===================== YOUR CODE HERE ==================

// Create an event listener for the submission of the form with the id of `itunes`. 
// Within that function, grab a hold of the value of the user's input in the `<input>` with the id of `term`.

    $("#itunes").on("submit", function(event) {
    event.preventDefault()
    var term = $("#term").val()
    

$.ajax({
    url: 'https://itunes.apple.com/search?term='+ term +'&entity=musicTrack',
    method: "GET"
  }).then(function (response) {

// convert the giant string from step 2 into an object that you can see in your browser's console.
//`parse` this string so that we instead get JSON (JavaScript Object Notation) back. 

        console.log(JSON.parse(response))
        var res = JSON.parse(response).results


// To search for the values we want, create a loop which iterates through the results
// in your response. 
        for (var i = 0; i < res.length; i++) {

// we want to `prepend` (so that the latest query will be shown at the top) our values 
// within the div with the class of library.
 
          $(".library").prepend('<div class="song"><img class="thumb" src="' + res[i].artworkUrl100 + '"><h2 class="song-name">' + res[i].trackName + '</h2><h4 class="song-artist">' + res[i].artistName + '</h4><audio class="song-audio" src="' + res[i].previewUrl + '"controls></audio></div>')
        }

  $("#term").val("")
      });
    });

  // ======================================================
});


    // 1. Initialize Firebase
var config = {
  apiKey: "AIzaSyDp41_Du7F_LvI7QJWsKZ-74G_wMcBHKLU",
  authDomain: "fir-4bf97.firebaseapp.com",
  databaseURL: "https://fir-4bf97.firebaseio.com",
  projectId: "fir-4bf97",
  storageBucket: "fir-4bf97.appspot.com",
  messagingSenderId: "136577761643"
};

firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Employees
$("#add-employee-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var empName = $("#employee-name-input").val().trim();
  var empRole = $("#role-input").val().trim();
  var empStart = moment($("#start-input").val().trim(), "MM/DD/YYYY").format("X");
  var empRate = $("#rate-input").val().trim();

  // Creates local "temporary" object for holding employee data
  var newEmp = {
    name: empName,
    role: empRole,
    start: empStart,
    rate: empRate
  };

  // Uploads employee data to the database
  database.ref().push(newEmp);

  // Logs everything to console
  console.log(newEmp.name);
  console.log(newEmp.role);
  console.log(newEmp.start);
  console.log(newEmp.rate);

  alert("Employee successfully added");

  // Clears all of the text-boxes
  $("#employee-name-input").val("");
  $("#role-input").val("");
  $("#start-input").val("");
  $("#rate-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) { //executes this on page load AND when a child (new entry) is added
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var empName = childSnapshot.val().name;
  var empRole = childSnapshot.val().role;
  var empStart = childSnapshot.val().start;
  var empRate = childSnapshot.val().rate;

  // Employee Info
  console.log(empName);
  console.log(empRole);
  console.log(empStart);
  console.log(empRate);

  // Prettify the employee start
  

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(empName),
    $("<td>").text(empRole),
    $("<td>").text(empStart),
   
    $("<td>").text(empRate),
    
  );

  // Append the new row to the table
  $("#employee-table > tbody").append(newRow);
});


    // (TEST 1)
    // First Train of the Day is 3:00 AM
    // Assume Train comes every 3 minutes.
    // Assume the current time is 3:16 AM....
    // What time would the next train be...? (Use your brain first)
    // It would be 3:18 -- 2 minutes away

    // (TEST 2)
    // First Train of the Day is 3:00 AM
    // Assume Train comes every 7 minutes.
    // Assume the current time is 3:16 AM....
    // What time would the next train be...? (Use your brain first)
    // It would be 3:21 -- 5 minutes away
// Solved Mathematically
    // Test case 1:
    // 16 - 00 = 16
    // 16 % 3 = 1 (Modulus is the remainder)
    // 3 - 1 = 2 minutes away
    // 2 + 3:16 = 3:18

    // Solved Mathematically
    // Test case 2:
    // 16 - 00 = 16
    // 16 % 7 = 2 (Modulus is the remainder)
    // 7 - 2 = 5 minutes away
    // 5 + 3:16 = 3:21

    // Assumptions
    var tFrequency = 3;

    // Time is 3:30 AM
    var firstTime = "03:30";

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

