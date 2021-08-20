import express from "express";
import { Response } from "../model/response";
import { signIn, signUp, signOut } from "../services/UserService";

const router = express.Router();

router.post("/signIn", async (request, response, next) => {
  const body = request.body;
  try {
    if (!body || !body.userName || !body.password) {
      const error = new Response(400, "not enough parameter");
      next(error);
    } else {
      const signInSiccess = await signIn(body.userName, body.password);

      if (signInSiccess) {
        const responseObj = new Response(200, "success");
        response.status(200).send(responseObj);
      } else {
        const unauthError = new Response(403, "Forbidden");
        next(unauthError);
      }
    }
  } catch (e) {
    const error = new Response(500, "error : " + e.message);
    next(error);
  }
});

router.post("/signUp", async (request, response, next) => {
  const body = request.body;
  try {
    if (!body.userName || !body.password) {
      const error = new Response(400, "not enough parameter");
      next(error);
    }
    const createUserSuccess = (await signUp(body.userName, body.password))
      ? "success"
      : "fail";
    const res = new Response(200, createUserSuccess);
    response.status(200).send(res);
  } catch (e) {
    const error = new Response(500, "error : " + e.message);
    next(error);
  }
});

router.post("/signOut", function (request, response, next) {
  const body = request.body;
  try {
    if (!body.userName) {
      const error = new Response(400, "not enough parameter");
      next(error);
    }
    const createUserSuccess = signOut(body.userName) ? "success" : "fail";
    const res = new Response(200, createUserSuccess);
    response.status(200).send(res);
  } catch (e) {
    const error = new Response(500, "error : " + e.message);
    next(error);
  }
});

export default router;
