import sys
import os
#path = os.path.realpath(__file__).replace("views.pyc","")
#sys.path.append(path)
# queria adicionar o caminho do build automaticamente pro path do python

import procmanager as pm

from processmanager import app
from flask import render_template, request


@app.route('/')
def index():
    processes = []
    output = pm.processList()[1:].split("\n")[:-1]
    labels = output[0].split()

    for line in output[1:]:  # skip the first element
        temp_proc = line.split(None, len(labels) - 1)
        temp_dict = {}
        for index, item in enumerate(temp_proc):
            temp_dict[labels[index]] = item
        processes.append(temp_dict)

    return render_template('index.html',
                           labels=labels,
                           processes=processes)
