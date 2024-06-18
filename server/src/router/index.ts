import express from "express";
import authentication from "./authentication";
import users from "./users";
import imagitones from "./imagitones";

const router = express.Router();

export default (): express.Router => {
  authentication(router);
  users(router);
  imagitones(router);
  return router;
};
