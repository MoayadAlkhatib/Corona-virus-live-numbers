const myLabels= [];
const fall=[];
let resp= [];

draw();

async function getData(){
 await fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
		"x-rapidapi-key": "dd50547aa9msh5ae6ab71bf62ae3p12bbe3jsn8d3f0533a95b"
	}
})
.then(response => {return response.json()})
.then(data =>{return data.countries_stat})
.then(data => { 
    resp = data.map(x => {
        let obj = x;
        obj.cases = obj.cases.replace(",", "")
        return obj;
    });
    //console.log(resp);
    return resp;
    })

.then(dat => {
        dat.sort(function (a, b) {
            return  b.cases - a.cases;
          });
          return dat;
          //console.log(dat);
        })
.then(data => {
    for(let i = 0; i<data.length; i++){
        fall.push(parseFloat(data[i].cases));
        myLabels.push(data[i].country_name);
        if (data[i].country_name == "Sweden"){
            return data[i]
        }
    }
})
.then(data => {
    document.getElementById ("cases").innerHTML=data.cases;
    document.getElementById("deathes").innerHTML=data.deaths;
    document.getElementById("newcases").innerHTML=data.new_cases;
    document.getElementById("newdeaths").innerHTML=data.new_deaths;
})
.catch(err => {
	console.log(err);
});
}

async function draw(){
await getData();
var ctx = document.getElementById('myChart').getContext('2d');

var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: myLabels,
        datasets: [{
            label: 'Antalet fall',
            data: fall,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {xAxes: [{
            ticks: {
             fontSize: 7
            }
           }],
            yAxes: [{
                ticks: {
                    fontSize: 7
                }
            }]
        }
    }
});
}
