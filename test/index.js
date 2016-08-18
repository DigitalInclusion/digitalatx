var supertest = require("supertest");
var app = require("../index");

describe("get pages", function() {

    it("gets home page", function(done) {
        supertest(app)
            .get("/views/index.html")
            .set("Accept", "text/html")
            .expect("Content-Type", /html/)
            .expect(200)
            .end(done);
    });

    it("gets locationInventory page", function(done) {
        supertest(app)
            .get("/views/locationInventory.html")
            .set("Accept", "text/html")
            .expect("Content-Type", /html/)
            .expect(200)
            .end(done);
    });

    it("gets addLocation page", function(done) {
        supertest(app)
            .get("/addLocation.html")
            .set("Accept", "text/html")
            .expect("Content-Type", /html/)
            .expect(200)
            .end(done);
    });

    it("gets profile page", function(done) {
        supertest(app)
            .get("/profile.html")
            .set("Accept", "text/html")
            .expect("Content-Type", /html/)
            .expect(200)
            .end(done);
    });

    it("gets storytelling", function(done) {
        supertest(app)
            .get("/storytelling.html")
            .set("Accept", "text/html")
            .expect("Content-Type", /html/)
            .expect(200)
            .end(done);
    });
});