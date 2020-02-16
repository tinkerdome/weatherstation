var chart;
function NewChildAvailable(snapshot) {
  console.log(snapshot.val());
}

function getValue(snapshot) {
  var starCountRef = firebase.database().ref('users/jsaji/temperature');
  starCountRef.on('value', function (snapshot) {
    console.log(snapshot.val());
  });
}

function RegisterDBListener() {
  var database = firebase.database();
  const dbref = database.ref();
  const users = dbref.child("users");

  users.on("child_added", NewChildAvailable);

  console.log(users)

}

function OnTempdataAdded(snapshot) {
  console.log(snapshot.val());
  var labels = [];
  var data = [];
  Object.keys(snapshot.val()).forEach(function (key) {
    console.log(key)
    var value = snapshot.val()[key];
    labels.push(key);
    data.push(value);
  });
  chart.data.labels = labels;
  chart.data.datasets[0].data = data;
  chart.update();

}

function AddTemperatureDataListner(user) {
  var tempData = firebase.database().ref('temperature/' + user);
  tempData.on('value', OnTempdataAdded);
}

function configureChart() {
  var ctx = document.getElementById('TempChart-canvas').getContext('2d');
  chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
      labels: [],
      datasets: [{
        label: 'Temperature',
        borderColor: 'rgb(255, 99, 132)',
        data: []
      }]
    },

    // Configuration options go here
    options: {
      layout: {
        padding: {
          left: 10
        }
      },
      responsive: true,
      title: {
        display: true,
        text: "Temperature data",
      },
      legend: {
        display: false
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
          }
        }]
      }
    }
  });
}

$(document).ready(function () {
  //RegisterDBListener()
  AddTemperatureDataListner("jsaji");
  configureChart()
});