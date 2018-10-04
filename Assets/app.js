
//firebase config-------------------------------------------------
var config = {
    apiKey: "AIzaSyAVTABXvhb1-DpfaugmbZn09bpoUAhYifI",
    authDomain: "alex-test-project-69ab2.firebaseapp.com",
    databaseURL: "https://alex-test-project-69ab2.firebaseio.com",
    projectId: "alex-test-project-69ab2",
    storageBucket: "alex-test-project-69ab2.appspot.com",
    messagingSenderId: "41208768495"
  };


firebase.initializeApp(config)

var database = firebase.database()

//Submit button----------------------------------------------------

$("#submitButton").on("click", function(event) {
    event.preventDefault();

//saves user inputs as vars
    var trainName = $("#nameInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var time = moment($("#timeInput").val().trim(), "HHmm").format("HHmm");
    var frequency = moment($("#frequencyInput").val().trim(), "mm").format("mm");

//saves data locally
    var newTrain = {
        name: trainName,
        destination: destination,
        time: time,
        frequency: frequency,
      };

//Pushes to the database
database.ref().push(newTrain);

// Logs everything to console for testing
  console.log("Train Name: " +newTrain.name);
  console.log("Train Destination: " +newTrain.destination);
  console.log("Train Start Time: " +newTrain.time);
  console.log("Train Frequency: " +newTrain.frequency);

//clear input boxes
$("#nameInput").val("");
$("#destinationInput").val("");
$("#timeInput").val("");
$("#frequencyInput").val("");

})

// 3. Create Firebase event for adding info to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var time = childSnapshot.val().time;
    var frequency = childSnapshot.val().frequency;

    var firstTimeConverted = moment(time, "HHmm").subtract(1, "years");
    console.log(firstTimeConverted);

    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hhmm"));

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

      // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destination),
    $("<td>").text(frequency),
    $("<td>").text(nextTrain),
    $("<td>").text(tMinutesTillTrain),
 
  );

  // Append the new row to the table
  $("#trainTable > tbody").append(newRow);

})