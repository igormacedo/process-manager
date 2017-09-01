"""
Este modulo inicia o programa e o servidor flask
"""

import webbrowser
import threading
import time
from six.moves import urllib
from processmanager import app

URL = "http://localhost:5000"

def open_browser():
    """Esta funcao abre o browser quando o servidor flask estiver pronto"""

    print('server starting...')
    while True:
        try:
            urllib.request.urlopen(url=URL)
            break
        except urllib.error.HTTPError as error:
            # do something
            print('Error code: ', error.code)
        except urllib.error.URLError as error:
            # do something
            print('Reason: ', error.reason)
            time.sleep(0.5)
    print('server started !')
    # server started callback
    webbrowser.open(URL)

#threading.Thread(target=open_browser).start()

# start server
app.run(debug=True, threaded=True, host="0.0.0.0", port=5000)
