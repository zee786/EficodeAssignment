
import json
import argparse
import subprocess,os
from influxdb import DataFrameClient
from influxdb import InfluxDBClient
from flask import Flask

app = Flask(__name__)

@app.route('/')
def index():
  return 'Server Works!'

#adding variables
@app.route('/count')
def show_count():
  #returns the username
  return 'item1: '+ json.dumps(get_count())

#adding variables
@app.route('/freq')
def show_freq():
  #returns the username
  return 'item1: '+ json.dumps(get_frequency())



def get_count():
    """Instantiate the connection to the InfluxDB client."""
    client = get_influx_connection

    print("Read DataFrame")
    results = client.query('SELECT ENBID, LCRID, C55, C56 FROM RTPM8051 order by desc limit 1')
    print("Result: {0}".format(results))
    points = results.get_points()
    client.close()
    for item in points:
      print("item: " ,item)

      return item


def get_frequency( dbname='RAN'):
    """Instantiate the connection to the InfluxDB client."""
    client = get_influx_connection

    print("Read DataFrame")
    results = client.query('SELECT * FROM count_ue_by_userclass_endc order by desc limit 2')
    points = results.get_points()
    client.close()

    final_list = []
    for item in points:
      print("item: " ,item)
      final_list.append(item)

    return final_list


def get_influx_connection():
    """Parse the args from main."""
    host = subprocess.check_output("kubectl get pods -A -o wide | grep metricsdb | awk '{print $7}'", shell=True).decode("utf-8").rstrip("\n")
    print("cluster ip : " , host)
    port = 8086
    user = 'root'
    password = 'root'
    protocol = 'line'
    return InfluxDBClient(host, port, user, password, 'RAN')

import json
import argparse
import subprocess,os
from influxdb import DataFrameClient
from influxdb import InfluxDBClient
from flask import Flask

app = Flask(__name__)

@app.route('/')
def index():
  return 'Server Works!'

#adding variables
@app.route('/count')
def show_count():
  #returns the username
  return 'item1: '+ json.dumps(get_count())

#adding variables
@app.route('/freq')
def show_freq():
  #returns the username
  return 'item1: '+ json.dumps(get_frequency())



def get_count():
    """Instantiate the connection to the InfluxDB client."""
    client = get_influx_connection

    print("Read DataFrame")
    results = client.query('SELECT ENBID, LCRID, C55, C56 FROM RTPM8051 order by desc limit 1')
    print("Result: {0}".format(results))
    points = results.get_points()
    client.close()
    for item in points:
      print("item: " ,item)

      return item


def get_frequency( dbname='RAN'):
    """Instantiate the connection to the InfluxDB client."""
    client = get_influx_connection

    print("Read DataFrame")
    results = client.query('SELECT * FROM count_ue_by_userclass_endc order by desc limit 2')
    points = results.get_points()
    client.close()

    final_list = []
    for item in points:
      print("item: " ,item)
      final_list.append(item)

    return final_list


def get_influx_connection():
    """Parse the args from main."""
    host = subprocess.check_output("kubectl get pods -A -o wide | grep metricsdb | awk '{print $7}'", shell=True).decode("utf-8").rstrip("\n")
    print("cluster ip : " , host)
    port = 8086
    user = 'root'
    password = 'root'
    protocol = 'line'
    return InfluxDBClient(host, port, user, password, 'RAN')

