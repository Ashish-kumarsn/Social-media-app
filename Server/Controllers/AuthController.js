// Controllers/AuthController.js
import UserModel from '../Models/userModel.js';
import bcrypt from 'bcryptjs'; // <- bcryptjs recommended
import jwt from 'jsonwebtoken';

// register new users
export const registerUser = async (req, res) => {
  try {
    // sanitize / normalize incoming fields
    const { email, password, firstname, lastname } = req.body;

    // basic validation
    if (!email || !password || !firstname || !lastname) {
      return res.status(400).json({ message: 'Missing email, password, firstname or lastname' });
    }

    // check if user exists
    const oldUser = await UserModel.findOne({ email: email.toLowerCase().trim() });
    if (oldUser) {
      return res.status(400).json({ message: 'This user already exists' });
    }

    // hash password correctly
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password.toString(), salt);

    // build user object explicitly (avoid extra/missing fields)
    const newUser = new UserModel({
      email: email.toLowerCase().trim(),
      password: hashedPass,
      firstname: firstname.trim(),
      lastname: lastname.trim(),
      profilePicture: req.body.profilePicture || '',
      coverPicture: req.body.coverPicture || '',
      about: req.body.about || '',
      livesin: req.body.livesin || '',
      worksAt: req.body.worksAt || '',
      country: req.body.country || '',
      relationship: req.body.relationship || '',
      followers: req.body.followers || [],
      following: req.body.following || []
    });

    const savedUser = await newUser.save();

    const token = jwt.sign(
      { email: savedUser.email, id: savedUser._id },
      process.env.JWT_KEY,
      { expiresIn: '7d' }
    );

    // return safe user object (omit password)
    const safeUser = {
      _id: savedUser._id,
      email: savedUser.email,
      firstname: savedUser.firstname,
      lastname: savedUser.lastname,
      profilePicture: savedUser.profilePicture,
      coverPicture: savedUser.coverPicture
    };

    return res.status(201).json({ user: safeUser, token });
  } catch (error) {
    console.error('registerUser error ->', error);
    // if mongoose validation error, return 400 with details
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message, details: error.errors });
    }
    return res.status(500).json({ message: error.message });
  }
};

// Login users
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Missing email or password' });
    }

    const user = await UserModel.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }

    const valid = await bcrypt.compare(password.toString(), user.password);
    if (!valid) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }

    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_KEY,
      { expiresIn: '7d' }
    );

    const safeUser = {
      _id: user._id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      profilePicture: user.profilePicture,
      coverPicture: user.coverPicture
    };

    return res.status(200).json({ user: safeUser, token });
  } catch (error) {
    console.error('loginUser error ->', error);
    return res.status(500).json({ message: error.message });
  }
};
