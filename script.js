//VARIABLES
var url = 'https://restcountries.eu/rest/v1/name/'; 
var countriesList = $('#countries'); 

//EVENT LISTENERS
$('#search').click(searchCountries);

document.addEventListener('keypress', function(e) {
	var key = e.which || e.keyCode;
	if (key === 13) {searchCountries()};
})

//FUNCTIONS
function searchCountries() {
	var countryName = $('#country-name').val();

	if(!countryName) {
		countryName = 'Poland';
	}

	$.ajax({
		url: url + countryName,
		method: 'GET',
		success: showCountriesList		//czy nie powinno być funkcja()?
	});
}

function showCountriesList(resp) { 
	console.log(resp);
	countriesList.empty();
	resp.forEach(function(item) {
		$('<h2>')
		.text(item.name)
		.appendTo(countriesList);
		
		$('<ul>')
		.append($('<li>').text("Capital: " + item.capital))
		.append($('<li>').text("Region: " + item.region))
		.append($('<li>').text("Population: " + item.population))
		.appendTo(countriesList)
		.hide();

		$('<h2>').click(function(){
			$('<ul>').slideToggle();
		});
	});
}
