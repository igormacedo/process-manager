import sys
import os
#path = os.path.realpath(__file__).replace("views.pyc","") + "c-module/build/lib.linux-x86_64-2.7/"
# sys.path.append(path)
# queria adicionar o caminho do build automaticamente pro path do python

import procmanager as pm

from processmanager import app
from flask import render_template, request


@app.route('/')
def index():
    processes = []
    output = pm.processList()[1:].split("\n")
    labels = output[0].split()
    print labels

    for line in output[1:]:  # skip the first element
        print line
        temp_proc = line.split(None, len(labels) - 1)
        temp_dict = {}
        for index, item in enumerate(temp_proc):
            temp_dict[labels[index]] = item
        processes.append(temp_dict)

    print processes
    return render_template('index.html',
                           labels=labels,
                           processes=processes)
