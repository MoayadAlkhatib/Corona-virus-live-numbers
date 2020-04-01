fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
		"x-rapidapi-key": "dd50547aa9msh5ae6ab71bf62ae3p12bbe3jsn8d3f0533a95b"
	}
})
.then(response => {
  return response.json();
})
.then(data =>{
  document.getElementById("cases1").innerHTML=data.total_cases;
  document.getElementById("deaths1").innerHTML=data.total_deaths;
  document.getElementById("newcases1").innerHTML=data.new_cases;
  document.getElementById("newdeaths1").innerHTML=data.new_deaths;
}) 

.catch(err => {
	console.log(err);
});













 
