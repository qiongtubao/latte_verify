"use strict"
const should = require("should");
const utils = require("should");
var verify = require("../index");
describe("date", function () {
	it("min", function (done) {
		try {
			var data = verify.verify(1234567, {
				type: "date",
				min: 1
			});
			done();
		} catch (err) {
			done(err);
		}
	});
	it("minObject", function (done) {
		try {
			var data = verify.verify(1234567, {
				type: "date",
				min: {
					value: 1,
					error: "min is error"
				},
				error: "is error"
			});
			done();
		} catch (err) {
			done(err);
		}
	});
	it("maxError", function (done) {
		try {
			var data = verify.verify(1234567, {
				type: "date",
				max: 123
			});
			done();
		} catch (err) {
			done(err);
		}
	})
	it("maxObjectError", function (done) {
		try {
			var data = verify.verify("fack", {
				type: "date",
				max: {
					value: 1,
					error: "max is error"
				},
				error: "date is error"
			});
			done();
		} catch (err) {
			done(err);
		}
	});
});