"use strict"
const should = require("should");
const utils = require("should");
var verify = require("../index");
describe("/", function () {
	it("/string/minLength", function (done) {
		try {
			var data = verify.verify("string", {
				type: "string",
				minLength: 1
			});
			done();
		} catch (error) {
			done(error);
		}
	});
	it("/string/in", function (done) {
		try {
			var data = verify.verify("interge", {
				type: "string",
				in: ["interge", "boolean"]
			});
			done();
		} catch (error) {
			done(error);
		}
	})


});