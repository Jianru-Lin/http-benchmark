#!/usr/bin/env python
# -*- coding:utf-8 -*-

from flask import Flask
app = Flask(__name__)

@app.route("/get")
def hello():
    return "hello test."

if __name__ == "__main__":
    app.run()