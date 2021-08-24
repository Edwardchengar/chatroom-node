import express from "express";
import { RestResponse } from "../model/RestResponse";
import { UserService } from "../services/UserService";

const router = express.Router();

router.post("/signIn", async (request, response, next) => {
  const body = request.body;
  try {
    if (!body || !body.userName || !body.password) {
      response.status(400);
      next(new Error("not enough parameter"));
    } else {
      const userService = new UserService();
      const signInInfo = await userService.signIn(body.userName, body.password);

      if (signInInfo) {
        const responseObj: RestResponse = {
          message: "success",
          result: signInInfo,
          statusCode: 200
        };
        response.status(200).send(responseObj);
      } else {
        response.status(403);
        next(new Error("Forbidden"));
      }
    }
  } catch (e) {
    response.status(500);
    next(e);
  }
});

router.post("/signUp", async (request, response, next) => {
  const body = request.body;
  try {
    if (!body.userName || !body.password) {
      response.status(400);
      next(new Error("not enough parameter"));
    }
    const userService = new UserService();
    const createUserSuccess = (await userService.signUp(
      body.userName,
      body.password
    ))
      ? "success"
      : "fail";
    const responseObj: RestResponse = {
      message: createUserSuccess,
      result: null,
      statusCode: 200
    };
    response.status(200).send(responseObj);
  } catch (e) {
    response.status(500);
    next(e);
  }
});

router.post("/signOut", function (request, response, next) {
  const body = request.body;
  try {
    if (!body.userName) {
      response.status(400);
      next(new Error("not enough parameter"));
    }
    const userService = new UserService();
    const siginOutResult = userService.signOut(body.userName)
      ? "success"
      : "fail";
    const responseObj: RestResponse = {
      message: siginOutResult,
      result: null,
      statusCode: 200
    };
    response.status(200).send(responseObj);
  } catch (e) {
    response.status(500);
    next(e);
  }
});

export default router;
