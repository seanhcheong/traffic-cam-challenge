"use strict";

$(document).ready(function() {
	var mapArea = document.getElementById("map");
	var mapData = {
		center: {lat: 47.6, lng: -122.3},
		zoom: 12
	};

	var map = new google.maps.Map(mapArea, mapData);
	var infoWindow = new google.maps.InfoWindow();

	$.getJSON('http://data.seattle.gov/resource/65fc-btcc.json')
		.done(function(data) {
			data.forEach(function (data) {
				var location = {
					lat: Number(data.location.latitude),
					lng: Number(data.location.longitude)
				};
				var marker = new google.maps.Marker({
					position: location,
					map:map
				}); 
				google.maps.event.addListener(marker, 'click', function() {
					var line = '<p>'+ data.cameralabel + '</p><img src=' + data.imageurl.url + '>';
					map.panTo(this.getPosition());
					infoWindow.setContent(line);
					infoWindow.open(map, this);
				});
				google.maps.event.addListener(map, 'click', function() {
					infoWindow.close();
				});
				$('#search').bind('search keyup', function() {
					var search = this.value.toLowerCase();
					if(data.cameralabel.toLowerCase().indexOf(search) == -1) {
						marker.setMap(null);
					} else {
						marker.setMap(map);
					}
				}); 
			});
		}) 

		.fail(function(error) {
			alert("An error has occured");
		}); 

});

