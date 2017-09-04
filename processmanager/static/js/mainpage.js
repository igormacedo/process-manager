$(document).ready(function() {

	var socket = io.connect('http://localhost:5000');

	socket.on('connect', function() {
		socket.send('User has connected!');
	});

	socket.on('message', function(labels,processes,cpu_usage,memory_usage) {
		//console.log(memory_usage);
		//$("#messages").append('<li>'+msg+'</li>');
		// console.log(processes)
		// Fill table with processes first
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
		if(cpu_usage == null) return;
		// Fill table with cpus
		$('#table-usage').empty();
		for(var i = 0; i < cpu_usage.length; i++) {
			$('#table-usage').append("<tr id=\"cpu"+i+"\"></tr>");
			$('#cpu'+i).append("<td class=\"namecol\">CPU"+i+"</td>");
			$('#cpu'+i).append("<td class=\"progresscol\">" +
				"<div class=\"progress customprogress\">" +
				"<div class=\"progress-bar\" role=\"progressbar\" style=\"width:"+Math.round(cpu_usage[i])+"%\" " +
				"aria-valuenow=\"0\" aria-valuemin=\"0\" aria-valuemax=\"100\">"+Math.round(cpu_usage[i])+"%</div></div>");
		}

		if(memory_usage == null) return;
		// Fill table with Virtual Memory and swap
		$('#table-usage').append("<tr id=\"virtualmemory\"></tr>");
		$('#virtualmemory').append("<td class=\"namecol\">Memory</td>");
		$('#virtualmemory').append("<td class=\"progresscol\">" +
			"<div class=\"progress customprogress\">" +
			 "<div class=\"progress-bar\" role=\"progressbar\" style=\"width:"+Math.round(memory_usage[0])+"%\" " +
			 "aria-valuenow=\"0\" aria-valuemin=\"0\" aria-valuemax=\"100\">"+Math.round(memory_usage[0])+"%</div></div>");

		$('#table-usage').append("<tr id=\"swapmemory\"></tr>");
		$('#swapmemory').append("<td class=\"namecol\">Swap</td>");
		$('#swapmemory').append("<td class=\"progresscol\">" +
			"<div class=\"progress customprogress\">" +
			 "<div class=\"progress-bar\" role=\"progressbar\" style=\"width:"+Math.round(memory_usage[1])+"%\" " +
			 "aria-valuenow=\"0\" aria-valuemin=\"0\" aria-valuemax=\"100\">"+Math.round(memory_usage[1])+"%</div></div>");

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
