"use strict"
const should = require("should");
const utils = require("should");
var verify = require("../lib/verify.js");
describe("/", function() {
	it("/object", function(done) {
		try {
			var data = verify.verify({
				name: "fuck",
				age: "1"
			}, {
				type: "object",
				properties: {
					name: {
						type: "string", 
						minLength:1
					},
					age: {
						type: "integer",
						min: 0
					}
				}
			});
			console.log(data);
			done();
		}catch(error) {
			console.log(error.stack);
			done(error);
		}
	});
	

});