"use strict"
const should = require("should");
const utils = require("should");
var verify = require("../lib/verify.js");
describe("/", function() {
	it("date/min", function(done) {
		try {
			var data = verify.verify(1234567, {
				type: "date",
				min: 1
			});
			console.log(data);
			done();
		}catch(err) {
			done(err);
		}
	});
	it("date/minObject", function(done) {
		try {
			var data = verify.verify(1234567, {
				type: "date",
				min: {
					value: 1,
					error: "min is error"
				},
				error: "is error"
			});
			console.log(data);
			done();
		}catch(err) {
			done(err);
		}
	});
	it("date/maxError", function(done) {
		try {
			var data = verify.verify(1234567, {
				type: "date",
				max: 123
			});
			console.log(data);
			done();
		}catch(err) {
			done(err);
		}
	})
	it("date/maxObjectError", function(done) {
		try {
			var data = verify.verify("fack", {
				type: "date",
				max: {
					value: 1,
					error: "max is error"
				},
				error: "date is error"
			});
			console.log(data);
			done();
		}catch(err) {
			done(err);
		}
	});
});