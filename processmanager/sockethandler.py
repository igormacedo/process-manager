from processmanager import socketio
from flask_socketio import SocketIO, send,  emit
import time

thread = None


def background_thread():
    while True:
        socketio.emit('message', {'goodbye': "Goodbye"})
        #send("teste", broadcast=True)
        time.sleep(1)


@socketio.on('connect')
def connect():
    global thread
    if thread is None:
        thread = socketio.start_background_task(target=background_thread)


@socketio.on('message')
def handleMessage(msg):
    print('Message: ' + msg)
    socketio.send(msg, broadcast=True)
