
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