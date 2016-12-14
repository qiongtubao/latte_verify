"use strict"
const should = require("should");
const utils = require("should");
var verify = require("../lib/verify.js");
describe("/", function() {
	it("/null", function(done) {
		try {
			var data = verify.verify(null, {
				type: "null",
				
			});
			console.log(data);
			done();
		}catch(error) {
			console.log(error.stack);
			done(error);
		}
	});
	

});