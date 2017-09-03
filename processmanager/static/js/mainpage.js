$(document).ready(function() {

	var socket = io.connect('http://localhost:5000');

	socket.on('connect', function() {
		socket.send('User has connected!');
	});

	socket.on('message', function(labels,processes) {
		//$("#messages").append('<li>'+msg+'</li>');
		// console.log(processes)
		$('#proctable-header').empty()
		$('#proctable-header').append("<tr id=\"tableheader\">	</tr>")

		for (var item in labels) {
    		$('#tableheader').append('<th>'+labels[item]+'</th>')
		}

		$('#proctable-body').empty();
		for (var item in processes){
			$('#proctable-body').append("<tr id=\"tablerow"+item+"\"></tr>")
			for (var info in labels){
				$('#tablerow'+item).append("<td>"+processes[item][labels[info]]+"</td>")
			}
		}
	});

	$('#searchbox').on('input', function() {
	    socket.emit('newfilter',$('#searchbox').val());
	});


	$('#sendbutton').on('click', function() {
		socket.send($('#myMessage').val());
		$('#myMessage').val('');
	});

	var sendKill = function(pid, option) {
		var data = {
			pid: pid,
			option: option
		};
		socket.emit('kill', data);
	}

	$('#pause-process').on('click', function() {
		var pid = parseInt($('#pidInput').val());
		sendKill(pid, 2);
    });

    $('#continue-process').on('click', function() {
        var pid = parseInt($('#pidInput').val());
        sendKill(pid, 3);
    });

    $('#kill-process').on('click', function() {
        var pid = parseInt($('#pidInput').val());
        sendKill(pid, 1);
    });

	$('#set-cpu').on('click', function() {
		var data = {
			pid: parseInt($('#pidInput').val()),
			cpuNumber: parseInt($('#cpuNumberInput').val())
		};
		socket.emit('setcpu', data);
	});
});
