"use strict"
const should = require("should");
const utils = require("should");
var verify = require("../lib/verify.js");
describe("/", function() {
	it("/string/minLength", function(done) {
		try {
			var data = verify.verify("string", {
				type: "string",
				minLength:1
			});
			console.log(data);
			done();
		}catch(error) {
			done(error);
		}
	});
	it("/string/in", function(done) {
		try {
			var data = verify.verify("interge", {
				type: "string",
				in: ["interge", "boolean"]
			});
			console.log(data);
			done();
		}catch(error) {
			done(error);
		}
	})
	

});