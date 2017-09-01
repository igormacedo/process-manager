import {io} from 'socket.io.js';

$(document).ready(function() {

	var socket = io.connect('http://localhost:5000');

	socket.on('connect', function() {
		socket.send('User has connected!');
	});

	socket.on('message', function(msg) {
		//$("#messages").append('<li>'+msg+'</li>');
		console.log('Received message')
        console.log('msg.data')
	});

	$('#sendbutton').on('click', function() {
		socket.send($('#myMessage').val());
		$('#myMessage').val('');
	});
});
