import request from "supertest";
import app from "../../src/app";
import { expect } from "chai";

describe("POST /siginIn with not enough parameter", function () {
  it("should return not enough parameter rror", (done) => {
    request(app)
      .post("/user/signIn")
      .field("userName", "")
      .field("password", "Hunter2")
      .expect(400)
      .end((_err, res) => {
        console.log(res.error);
        expect(res.error).not.to.be.undefined;
        done();
      });
  });
});

describe("POST /siginOut with no username", function () {
  it("should return not enough parameter rror", (done) => {
    request(app)
      .post("/user/signOut")
      .expect(400)
      .end((_err, res) => {
        console.log(res.error);
        expect(res.error).not.to.be.undefined;
        done();
      });
  });
});
// describe("POST /signIn with all field (normal flow)", function () {
//   it("should return not enough parameter rror", (done) => {
//     request(app)
//       .post("/user/signOut")
//       .expect(400)
//       .end((_err, res) => {
//         console.log(res.error);
//         expect(res.error).not.to.be.undefined;
//         done();
//       });
//   });
// });
