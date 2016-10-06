#!/usr/bin/env python
# -*- coding:utf-8 -*-

import urllib2
import time

urls = {'nginxdata': "http://127.0.0.1/test.txt", "tornadodata" : "http://127.0.0.1:8888/get",
        "djangodata" : "http://127.0.0.1:8877/get", "flaskdata": "http://127.0.0.1:5000/get",
        "godata":"http://127.0.0.1:8899/get"}

for key in urls:
    list = []
    for a in xrange(500):
        start = time.time()
        urllib2.urlopen(urllib2.Request(urls[key]))
        stop = time.time()
        list.append(round((stop - start) * 1000, 2))

    print key, "=", list
