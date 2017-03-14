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
		success: showCountriesList,
		error: failInfo
	});
}

function showCountriesList(resp) { 
	console.log(resp);
	countriesList.empty();
	resp.forEach(function(item) {

		var container = $('<div>');
		$(container).addClass('container-result');

		$('<h2>')
		.addClass('heading')
		.text(item.name)
		.appendTo(container);
		
		$('<ul>')
		.append($('<li>').text("Capital: " + item.capital))
		.append($('<li>').text("Region: " + item.region))
		.append($('<li>').text("Population: " + item.population))
		.appendTo(container)
		.hide();

		container
		.appendTo(countriesList)
		.click(function() {
			$(this).find('ul').slideToggle();
		});
	});
}

function failInfo() {
	$('#countries').find('li').text('No data avaliable - check your typing').css('color', 'red');
}