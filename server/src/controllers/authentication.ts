import express from "express";
import { createUser, getUserByEmail } from "../models/Users";
import { authentication, random } from "../helpers";

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("Invalid email or password.");
    }

    const user = await getUserByEmail(email).select(
      "+authentication.salt +authentication.password"
    );

    if (!user || !user.authentication) {
      return res.status(400).send("User is not found.");
    }

    const expectedHash = authentication(
      user.authentication.salt ?? "",
      password
    );

    if (user.authentication.password !== expectedHash) {
      return res.status(403).send("Invalid email or password.");
    }

    const salt = random();
    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString()
    );

    await user.save();

    res.cookie("IMAGITONE-AUTH", user.authentication.sessionToken, {
      domain: "192.168.0.103", // TODO
      path: "/",
    });

    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.status(400).send("Not valid email, username or password.");
    }

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.status(400).send("Account with this email already exists.");
    }

    const salt = random();
    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });

    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
