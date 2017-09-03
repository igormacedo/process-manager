from processmanager import socketio
from flask_socketio import SocketIO, send,  emit
import time
import procmanager as pm

thread = None

commandps = "ps -e"
grepfilter = ""
labels = []


def background_thread():
    global commandps
    global grepfilter

    while True:
        processes = []
        output = pm.processList(commandps + grepfilter)[1:].split("\n")[:-1]
        labels = output[0].split()

        for line in output[1:]:  # skip the first eAPlement
            temp_proc = line.split(None, len(labels) - 1)
            temp_dict = {}
            for index, item in enumerate(temp_proc):
                temp_dict[labels[index]] = item
            processes.append(temp_dict)

        socketio.emit('message', (labels, processes))
        #send("teste", broadcast=True)
        time.sleep(1)


@socketio.on('connect')
def connect():
    global thread
    if thread is None:
        thread = socketio.start_background_task(target=background_thread)


@socketio.on('newfilter')
def newfilter(filter):
    global grepfilter

    print "new filter received " + filter
    if filter != "":
        grepfilter = " | (read a; echo \"$a\"; grep " + filter + ")"
    else:
        grepfilter = ""


@socketio.on('message')
def handleMessage(msg):
    print('Message: ' + msg)
    socketio.send(msg, broadcast=True)

@socketio.on('kill')
def handleKill(data):
	result = pm.killProcess(data['pid'], data['option'])

@socketio.on('setcpu')
def handleSetCpu(data):
	result = pm.setCpu(data['pid'], data['cpuNumber'])

