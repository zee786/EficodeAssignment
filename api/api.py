# -*- coding: utf-8 -*-
"""Tutorial for using pandas and the InfluxDB client."""

import json
import argparse
import subprocess,os
from influxdb import DataFrameClient
from influxdb import InfluxDBClient
from flask import Flask , render_template

app = Flask(__name__)

@app.route('/')
def ats():
    #example_embed='This string is from python'
    #    return render_template('index.html', embed=example_embed)
    result = json.dumps(get_count())
    return render_template('index.html', result=result)

@app.route('/hello/')
@app.route('/hello/<name>')
def hello(name=None):
    return render_template('hello.html', name=name)

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

#adding variables
@app.route('/prb')
def show_prb():
  #returns the username
  return 'item1: '+ json.dumps(get_dl_prb())


def get_count():
    """Instantiate the connection to the InfluxDB client."""
    client = get_influx_connection()

    print("Read DataFrame")
    results = client.query('SELECT ENBID, LCRID, C55, C56 FROM RTPM8051 order by desc limit 1')
    print("Result: {0}".format(results))
    points = results.get_points()
    client.close()
    for item in points:
      print("item: " ,item)

      return item


def get_frequency():
    """Instantiate the connection to the InfluxDB client."""
    client = get_influx_connection()

    print("Read DataFrame")
    results = client.query('SELECT * FROM count_ue_by_userclass_endc order by desc limit 2')
    points = results.get_points()
    client.close()

    final_list = []
    for item in points:
      print("item: " ,item)
      final_list.append(item)

    return final_list

def get_dl_prb( ):
    """Instantiate the connection to the InfluxDB client."""
    client = get_influx_connection()

    print("Read DataFrame")
    results = client.query('SELECT C25,C26,C27,C28,C29,C30,C31,C32,C33,C34,LCRID FROM RTPM8051 order by desc limit 2')
    points = results.get_points()
    client.close()

    final_list = []
    for item in points:
      print("item: " ,item)
      item["prb_avg"] = (item.get('C25') *5) + (item.get('C26') * 15)/ 60000
        #+ (item['C27'] *25) + (item['C28'] * 35) + (item['C29'] *45) + (item['C30'] * 55) \
         #       + (item['C31'] *65) + (item['C31'] * 75) +  (item['C32'] *85) + (item['C34'] * 95) ) #(v1*5 + v2*15 + v3*25+…+v10*95)/SUM(v1+v2+…v10)
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

