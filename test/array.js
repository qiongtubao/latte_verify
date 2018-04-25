"use strict"
const should = require("should");
const utils = require("should");
var verify = require("../index");
describe("array", function () {
	it("array", function (done) {
		try {
			var data = verify.verify([1, 2, 3, 4, 5], {
				type: "array"
			});
			(data.length === 5).should.be.true;

			done();
		} catch (err) {
			done(err);
		}

	});
	it("minLength", function (done) {
		try {
			var data = verify.verify("[1,2,3,4,5,6]", {
				type: "array",
				minLength: 3
			});
			(data[5] === 6).should.be.true
			done();
		} catch (err) {
			done(err);
		}
	});
	it("minLengthObject", function (done) {
		try {
			var data = verify.verify("[1,2,3,4,5,6]", {
				type: "array",
				minLength: {
					value: 10,
					error: "array min error"
				}
			});
			done();
		} catch (err) {
			done(err);
		}
	});
	it("properties", function (done) {
		try {
			var data = verify.verify("[1,2,3,4,5,6]", {
				type: "array",
				properties: {
					1: {
						type: "integer"
					}
				}
			});
			done();
		} catch (err) {
			done(err);
		}
	});
	it("array2", function (done) {
		try {
			var data = verify.verify([2, 4, 6, 8], {
				type: "array",
				match: function (o) {
					return o % 2 == 0;
				}
			});
			(data[2] == 6).should.be.true;
			done();
		} catch (err) {
			done(err);
		}
	});
	it("array/all", function (done) {
		try {
			var data = verify.verify([2, 4, 6, 8], {
				type: "array",
				all: {
					value: [2, 4, 6],
					error: "all error"
				}
			});
			(data[2] == 6).should.be.true;
			done();
		} catch (err) {
			done(err);
		}
	});
});