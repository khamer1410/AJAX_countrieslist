var url = 'https://restcountries.eu/rest/v1/name/'; //jakie nazwy sie stosuje? Callback jest ok?
var countriesList = $('#countries'); //dlaczego nie $countrieslist?

$('#search').click(searchCountries);

document.addEventListener('keypress', function(e) {
	var key = e.which || e.keyCode;
	if (key === 13) {searchCountries};
})

function searchCountries() {
	var countryName = $('#country-name').val();

	if(!countryName.length) {				//dlaczego kodilla pisze bez nawiasów i w 1 lini?
		countryName = 'Poland';
	}

	$.ajax({
		url: url + countryName,
		method: 'GET',
		success: showCountriesList		//czy nie powinno być funkcja()?
	});
}

function showCountriesList(resp) { 
	console.log(resp[0]);
	countriesList.empty();
	resp.forEach(function(item) {
		$('<li>').text(item.name).appendTo(countriesList);
	});

	var listInfo = $('ul').find('li');
	var countryDetails = $('<ul>').appendTo(listInfo);

	resp.forEach(function(item) {
		$('<li>').text(item.capital).appendTo(countryDetails);
		$('<li>').text(item.region).appendTo(countryDetails);
		$('<li>').text(item.population).appendTo(countryDetails);
		$('<li>').text(item.translations.es).appendTo(countryDetails);

	});

}