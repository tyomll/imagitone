import express from "express";
import {
  getMe,
  isAuthenticated,
  login,
  register,
} from "../controllers/authentication";

export default (router: express.Router) => {
  router.post("/auth/register", register);
  router.post("/auth/login", login);
  router.post("/auth/isAuthenticated", isAuthenticated);
  router.post("/auth/getMe", getMe);
};
