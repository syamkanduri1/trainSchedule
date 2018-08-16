// Initialize Firebase
var config = {
  apiKey: "AIzaSyDzcNkLsLwnnLBLIGcYd0ECET_xjOhHn1Y",
  authDomain: "myproject-eb051.firebaseapp.com",
  databaseURL: "https://myproject-eb051.firebaseio.com",
  projectId: "myproject-eb051",
  storageBucket: "myproject-eb051.appspot.com",
  messagingSenderId: "443496478004"
};
  firebase.initializeApp(config);

  var database = firebase.database();

database.ref().on("child_added", function(snapshot){
  var snap = snapshot.val();
  var tableRow = $("<tr>");
  var trainName = $("<td>").text(snap.trainName);
  var destination = $("<td>").text(snap.destination);
  var frequency = $("<td>").text(snap.frequency);
  var firstTrainTime = snap.firstTrainTime;

  var timeDiff = 0;
  var trainRemainder = 0;
  var minutesAway = 0;
  var nextArrivalTime; 

  
  firstTrainTime = moment(firstTrainTime, "HH:mm").subtract(1, "years");
  timeDiff = moment().diff(moment(firstTrainTime), "minutes");
  trainRemainder = timeDiff % snap.frequency;
  minutesAway = snap.frequency - trainRemainder;
  nextArrivalTime = moment().add(minutesAway, "m").format("HH:mm");

  tableRow.append(trainName, destination, frequency, $("<td>").text(nextArrivalTime), $("<td>").text(minutesAway));
  $("#tableBody").append(tableRow);

}, function(errorObject){
  console.log(errorObject);
}) 


$(function(){
  var trainName;
  var destination;
  var firstTrainTime;
  var frequency;
  
  $("#submitButton").on("click", function(event){
    event.preventDefault();

    trainName = $("#trainName").val();
    destination = $("#destination").val();
    firstTrainTime = $("#firstTrainTime").val();
    frequency = $("#frequency").val();

    database.ref().push({
      trainName: trainName,
      destination: destination,
      firstTrainTime: firstTrainTime,
      frequency: frequency
    })
  });


})

setTimeout(()=>{
  location.reload()
}, 6 * 10000)
