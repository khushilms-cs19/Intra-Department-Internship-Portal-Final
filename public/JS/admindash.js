google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart);

button1 = document.getElementById("b1");
button2 = document.getElementById("b2");

var stipenddata = [
  ["Stipend(Rs)", "Job"]
]
var fieldofwork = [
  ["Job Type", "Field of Work"]
]

async function getStipendData(){
  const data = await fetch("http://localhost:3000/stipenddata")
  const response = await data.json()
  console.log(response)
  response.forEach(e => {
    stipenddata.push([String(e.stipend), (e.cnt)])
  })
}

async function getFieldsData(){
  const data = await fetch("http://localhost:3000/fielddata")
  const response = await data.json()
  console.log(response)
  response.forEach(e => {
    fieldofwork.push([String(e.field), (e.cnt)])
  })
}

getStipendData()
getFieldsData()


button1.style.boxShadow =
  "0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19)";
var current = 0;
async function setChart(num) {
  switch (num) {
    case 0: {
      
      button2.style.boxShadow = "none";
      button1.style.boxShadow =
        "0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19)";
      break;
    }
    case 1: {
      
      button1.style.boxShadow = "none";
      button2.style.boxShadow =
        "0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19)";
      break;
    }
    default: {
      console.log("default");
    }
  }
  current = num;
  drawChart();
}

function drawChart() {
  
  var data = [];
  console.log(stipenddata)
  console.log(fieldofwork)

  // data[0] = google.visualization.arrayToDataTable([
  //   ["Job Type", "Field of Work"],
  //   ["Web Dev", 11],
  //   ["ML", 6],
  //   ["Web Design", 8],
  //   ["App Dev", 10],
  //   ["DevOps", 3],
  // ]);
  data[0] = google.visualization.arrayToDataTable(fieldofwork)

  // data[1] = google.visualization.arrayToDataTable([
  //   ["Stipend(Rs)", "Job"],
  //   ["75,000", 5],
  //   ["50,000", 4],
  //   ["25,000", 5],
  //   ["65,000", 2],
  //   ["40,000", 8],
  // ]);
  data[1] = google.visualization.arrayToDataTable(stipenddata)

  var options = {
    height: 500,
    width: 750,
    chartArea: {
      height: "60%",
      width: "60%",
    },
    legend: {
      position: "top",
    },
    backgroundColor: {
      fillOpacity: 0,
      fill: "#00ccff",
    },
    animation: {
      startup: true,
      duration: 1000,
      easing: "out",
    },
  };
  var chart = new google.visualization.PieChart(
    document.getElementById("chartContainer")
  );
  console.log("just before the draw function");
  chart.draw(data[current], options);
  console.log("just after the draw function ");
}


const updatemodal=document.querySelector(".updateModal");
const overlay=document.querySelector(".overlay");
const closeModalBtn=document.querySelector(".close-modal");
const openModalBtn=document.querySelector(".show-modal");

const addHiddenClass= function(){
  updatemodal.classList.add("hidden");
  overlay.classList.add("hidden");
};

const removeHiddenClass= function(){
  updatemodal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

closeModalBtn.addEventListener("click",addHiddenClass);
openModalBtn.addEventListener('click',removeHiddenClass);
overlay.addEventListener("click",addHiddenClass);
