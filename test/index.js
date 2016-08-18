var supertest = require("supertest");
var app = require("../index");

describe("home", function() {

    var request;
    it("gets home", function(done) {
        request = supertest(app)
            .get("/views/index.html")
            .set("Accept", "text/html")
            .expect("Content-Type", /html/)
            .expect(200)
            .end(done);
    });
});