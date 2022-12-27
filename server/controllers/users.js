import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  sendStudentConfirmationMail,
  sendTeacherConfirmationMail,
  sendTeacherApprovalRequest,
  sendTeacherApprovalConfirmation,
  sendResetPasswordEmail,
} from "../configs/nodemailer.config.js";

import User from "../models/user.js";

export const login = async (req, res) => {
  const { rememberMe, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist." });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials." });

    if (existingUser.status != "Active") {
      return res.status(401).json({
        message: "Pending Account.",
      });
    }

    existingUser.lastLoginAt = new Date();

    const updatedUser = await User.findByIdAndUpdate(
      existingUser._id,
      existingUser,
      { new: true }
    );

    const token = jwt.sign(
      { email: updatedUser.email, id: updatedUser._id },
      "testSolveIt",
      { expiresIn: rememberMe ? "365d" : "1h" }
    );

    res.status(200).json({ result: updatedUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const signup = async (req, res) => {
  const {
    firstName,
    lastName,
    faculty,
    email,
    password,
    confirmPassword,
    role,
  } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res.status(400).json({ message: "User already exists." });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords don't match." });

    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await User.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      faculty,
      role,
      createdAt: new Date(),
      lastAccessAt: new Date(),
    });
    const token = jwt.sign(
      { email: result.email, id: result._id },
      "testSolveIt",
      { expiresIn: "24h" }
    );

    if (result.role == "Student") {
      sendStudentConfirmationMail(firstName, email, result._id);
    } else {
      sendTeacherConfirmationMail(firstName, email);
      sendTeacherApprovalRequest(firstName, lastName, email, result._id);
    }

    res.status(201).json({ result: result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: "User not found." });
  }
};

export const getUserByEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: "User not found." });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateUserProfile = async (req, res) => {
  const { newUser } = req.body;

  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No user with id: ${id}`);

    const newUserr = await User.create(newUser);
    console.log(newUserr);

    const updatedUser = await User.findByIdAndUpdate(id, newUserr, {
      new: true,
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUserAvatar = async (req, res) => {
  const { avatar } = req.body;
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    user.imageUrl = avatar;

    const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    if (user.status == "Pending") user.status = "Active";

    if (user.requestTeacherRole == true) {
      user.requestTeacherRole = false;
      user.role = "Teacher";
    }

    const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const confirmTeacherApproval = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    sendTeacherApprovalConfirmation(user.firstName, user.email);

    res.status(200).json({ message: "Confirmation email sent." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const sendResetPasswordLink = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    sendResetPasswordEmail(user.firstName, user.email, user._id);

    res.status(200).json({ message: "Reset password email sent." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const changePassword = async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    user.password = hashedPassword;

    const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });

    const token = jwt.sign(
      { email: updatedUser.email, id: updatedUser._id },
      "testSolveIt",
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: updatedUser, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const changePasswordWithAuth = async (req, res) => {
  const { id } = req.params;
  const { currentPassword, newPassword, confirmNewPassword } = req.body;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    const isPasswordCorrect = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isPasswordCorrect)
      return res
        .status(400)
        .json({ message: "Current password doesn't match." });

    if (newPassword !== confirmNewPassword)
      return res.status(404).json({ message: "Passwords don't match." });

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    user.password = hashedPassword;

    const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });

    const token = jwt.sign(
      { email: updatedUser.email, id: updatedUser._id },
      "testSolveIt",
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: updatedUser, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const requestTeacherAccount = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    if (user.role == "Teacher")
      return res.status(406).sens({ message: "Already a teacher." });

    if (user.requestTeacherRole == true)
      return res.status(406).send({ message: "Already pending request." });

    user.requestTeacherRole = true;
    const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });

    const token = jwt.sign(
      { email: updatedUser.email, id: updatedUser._id },
      "testSolveIt",
      { expiresIn: "1h" }
    );

    sendTeacherApprovalRequest(
      updatedUser.firstName,
      updatedUser.lastName,
      updatedUser.email,
      updatedUser._id
    );

    res.status(200).json({ result: updatedUser, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
