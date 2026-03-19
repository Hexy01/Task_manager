import { Request, Response } from "express";
import bcrypt from "bcrypt";
import prisma from "../../prisma/client";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({ msg: "User created", user });
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong", error });
  }
};