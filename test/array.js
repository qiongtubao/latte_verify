"use strict"
const should = require("should");
const utils = require("should");
var verify = require("../lib/verify.js");
describe("/", function() {
	it("array", function(done) {
		try {
			var data = verify.verify([1,2,3,4,5], {
				type: "array"
			});
			(data.length === 5).should.be.true;

			done();
		}catch(err) {
			done(err);
		}
		
	});
	it("array1", function(done) {
		try {
			var data = verify.verify("[1,2,3,4,5,6]", {
				type: "array",
				minLength: 3,
				maxLength: 7
			});
			(data[5] === 6).should.be.true
			done();
		}catch(err) {
			done(err);
		}
	});
	it("array2", function(done) {
		try {
			var data = verify.verify([2,4,6,8], {
				type: "array",
				match: function(o) {
					return o%2 == 0;
				}
			});
			(data[2] == 6).should.be.true;
			done();
		}catch(err) {
			done(err);
		}
	});
	it("array3", function(done) {
		try {
			var data = verify.verify([1,2,3,4,5,6,7,8], {
				type: "array",
				minLength: {
					value: 3,
					error: " < minLength "
				},
				maxLength: {
					value: 10,
					error: "> maxLength"
				}
			});
			(data[3] == 4).should.be.true;
			done();
		}catch(err) {
			done(err);
		}
	})
});