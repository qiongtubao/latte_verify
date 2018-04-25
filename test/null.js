"use strict"
const should = require("should");
const utils = require("should");
var verify = require("../index");
describe("/", function () {
	it("/null", function (done) {
		try {
			var data = verify.verify(null, {
				type: "null",

			});
			done();
		} catch (error) {
			done(error);
		}
	});


});