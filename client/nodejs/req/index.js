var assert = require('assert')
var request = require('request')
var config = require('./config')
var fs = require('fs')

console.log('test begin')
request_loop(config.loop, function(err, data) {
	if (err) return
	fs.writeFileSync(config.data_file, JSON.stringify(data), 'utf-8')
	console.log('test end, see data.json')
	console.log(`count=${data.length}, max=${max(data)}, min=${min(data)}, average=${average(data)}`)
})

function min(list) {
	var v = list[0]
	list.forEach(function(item) {
		if (item < v) v = item
	})
	return v
}

function max(list) {
	var v = list[0]
	list.forEach(function(item) {
		if (item > v) v = item
	})
	return v
}

function average(list) {
	var sum = 0
	var n = list.length
	list.forEach(function(v) {
		sum += v
	})
	return parseInt(sum /n)
}

// #cb(err, delta_list)
function request_loop(count, cb) {
	assert.ok(count > 0, 'count must bigger than zero')
	var delta_list = []
	var rest = count
	loop()

	function loop() {
		--rest
		request_once(function(err, delta) {
			if (err) {
				delta = 0
			}
			console.log(delta)
			delta_list.push(delta)
			if (rest <= 0) {
				cb(null, delta_list)
			}
			else {
				process.nextTick(loop)
			}
		})
	}
}

// #cb(err, delta)
function request_once(cb) {
	var start = new Date()
	var opt = {
		url: config.url,
		// agent: null,
		headers: {
			'Connection': 'Close'
		}		
	}
	request(config.url, function(err) {
		var end = new Date()
		var delta = end - start
		if (err) {
			console.error(err)
		}
		cb(err, delta)
	})
}