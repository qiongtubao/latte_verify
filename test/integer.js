"use strict"
const should = require("should");
const utils = require("should");
var verify = require("../lib/verify.js");
describe("/", function() {
	it("/interge", function(done) {
		try {
			var data = verify.verify(1, {
				type: "integer"
			});
			(data === 1).should.be.true;
			done();
		}catch(error) {
			done(error);
		}
	});
	it("interge/min", function(done) {
		try {
			var data = verify.verify("2", {
				type: "integer",
				min: 1
			});
			(data === 2).should.be.true;
			done();
		}catch(error) {
			console.log(error);
			done();
		}
		
		
	});
	it("interge3", function(done) {
		var error = "test";
		try {
			var data = verify.verify("#int", {
				type:  {
					value: "integer",
					error: error
				}
			});
			
			done();
		}catch(e) {
			(e === error).should.be.true;
			done();
		}

	});
	it("integer4", function(done) {
		var error = "test";
		var maxError = " > 90";
		try {
			var data = verify.verify("100", {
				type: {
					value:"integer",
					error: "type error"
				},
				min: {
					value: 80,
					error: " < 80"
				},
				max: {
					value: 90,
					error: maxError
				}
			});
			(data === 100 ).should.be.true;
			done();
		}catch(err) {
			
			(err === maxError).should.be.true;

			done();
		}
	})


});