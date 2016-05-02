# Sample Flask server to host endpoints

import json
import os
import time
from flask import Flask, Response, request
from flask_socketio import SocketIO, emit

app = Flask(__name__, static_url_path='', static_folder='src')
socketio = SocketIO(app)


@socketio.on('connect')
def connect_handler():
    with open('metrics.json', 'r') as file:
        metrics = json.loads(file.read())

    emit('state', json.dumps({'feeds': metrics}), broadcast=True)


@socketio.on('action')
def action_handler(data):
    with open('metrics.json', 'r') as file:
        metrics = json.loads(file.read())

    newMetric = data.get('feed')
    metrics.append(newMetric)

    with open('metrics.json', 'w') as file:
        file.write(json.dumps(metrics, indent=4, separators=(',', ': ')))

    emit('state', json.dumps({'feeds': metrics}), broadcast=True)


@app.route('/api/metrics', methods=['GET', 'POST'])
def metrics_handler():
    with open('metrics.json', 'r') as file:
        metrics = json.loads(file.read())

    if request.method == 'POST':
        newMetric = request.form.to_dict()
        newMetric['id'] = int(time.time() * 1000)
        metrics.append(newMetric)

        with open('metrics.json', 'w') as file:
            file.write(json.dumps(metrics, indent=4, separators=(',', ': ')))

    return Response(
        json.dumps(metrics),
        mimetype='application/json',
        headers={
            'Cache-Control': 'no-cache',
            'Access-Control-Allow-Origin': '*'})


if __name__ == '__main__':
    socketio.run(
        app,
        host=os.environ.get("BIND_HOST", '127.0.0.1'),
        port=int(os.environ.get("BIND_PORT", 3000)))
