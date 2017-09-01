$(document).ready(function() {

	var socket = io.connect('http://localhost:5000');

	socket.on('connect', function() {
		socket.send('User has connected!');
	});

	socket.on('message', function(labels,processes) {
		//$("#messages").append('<li>'+msg+'</li>');
		console.log(processes)
		$('#proctable').empty()
		$('#proctable').append("<tr id=\"tableheader\">	</tr>")

		for (var item in labels) {
    		$('#tableheader').append('<th>'+labels[item]+'</th>')
		}

		for (var item in processes){
			$('#proctable').append("<tr id=\"tablerow"+item+"\"></tr>")
			for (var info in labels){
				$('#tablerow'+item).append("<td>"+processes[item][labels[info]]+"</td>")
				//console.log(processes[item][info])
			}
		}
		//$('#tablerows').empty()

	});

	$('#sendbutton').on('click', function() {
		socket.send($('#myMessage').val());
		$('#myMessage').val('');
	});
});
