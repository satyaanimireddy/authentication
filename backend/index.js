// var express = require("express");

import express from "express";

import { PORT } from "./config.js";
import { dbURL } from "./config.js";
import mongoose from "mongoose";
import { User } from "./models/userModel.js";
import cors from "cors";
import jwt from "jsonwebtoken";

import { auth } from "./authMiddleware.js";

let app = express();

// to parse the body
app.use(express.json());

//to unlock cors
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello Iam from Server updated");
});

//Route for create user in db

app.post("/signup", async (req, res) => {
  try {
    let { username, email, password, confirmpassword } = req.body;
    console.log(req.body);
    if (!username || !email || !password || !confirmpassword) {
      return res
        .status(400)
        .send("Required username,email,password,confirmpassword");
    }

    if (password !== confirmpassword) {
      return res.status(400).send("Passwords not matched");
    }

    let newUser = {
      username,
      email,
      password,
      confirmpassword,
    };

    let emailExist = await User.findOne({ email: email });

    if (emailExist) {
      return res.status(400).send("User already exist in DB");
    }
    let user = await User.create(newUser);
    return res.status(201).send(user);
    // return res.status(201).send('User is created successfully');
  } catch (error) {
    res.status(500).send("Internal server Error");
  }
});

//Rote for user login

app.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;
    console.log(req.body);

    if (!email || !password) {
      return res.status(400).send("Required email and password");
    }

    let existUser = await User.findOne({ email });
    console.log(existUser);

    if (!existUser) {
      return res.status(404).send("User not found");
    }
    if (existUser.password !== password) {
      return res.status(400).send("Invalid Credentials");
    }

    if (existUser.email && existUser.password) {
      let token = jwt.sign({ id: existUser._id }, "secret", {
        expiresIn: "1d",
      });
      // console.log(token);

      return res.json({ token, userId: existUser._id });
    }

    // if (existUser) {
    //   return res.status(200).send("Login success");
    // }
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

//my profile

app.get("/profile", auth, async (req, res) => {
  try {
    let exist = await User.findById(req.id);
    console.log("user from db after auth", exist);
    if (!exist) {
      return res.send("User not found");
    } else {
      return res.json(exist);
    }
  } catch (error) {
    return res.status(500).send("Internal server error");
  }
});

mongoose
  .connect(dbURL)
  .then(() => {
    console.log("DB CONNECTED SUCCESSFULLY");
    app.listen(PORT, () => {
      console.log(`Server started in PORT  ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("error");
  });
