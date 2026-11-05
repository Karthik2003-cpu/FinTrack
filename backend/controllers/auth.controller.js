import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!email || !password || !name) {
            return res.status(400).json({ message: 'Please fill all the details!' });
        }

        const user = await User.findOne({ email });

        if (user) {
            return res.status(409).json({ message: 'User already exists!' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {
            name: name,
            email: email,
            passwordHash: hashedPassword
        }

        await User.create(newUser);

        res.status(201).json({ message: 'User created!!' })
    } catch (error) {
        res.status(500).json({ message: `${error}` });
    }


}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User don't exist, please register!" });
        }

        const match = await bcrypt.compare(password, user.passwordHash);

        if (!match) {
            return res.status(401).json({ message: 'Invalid password!' });
        }

        const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('jwt', token, { httpOnly: true, secure: true, sameSite: 'strict' });

        const userObject = user.toObject();
        delete userObject.passwordHash;

        res.status(200).json({ message: 'Logged In successfully!', user: userObject });

    } catch (error) {
        res.status(500).json({ message: `${error}` });
    }

}

const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-passwordHash');


        if(!user)
        {
            return res.status(404).json({message: 'User not found!'});
        }

        res.status(200).json({user});
    } catch (error) {
        res.status(500).json({message:`${error}`});
    }
};

const logout = async(req, res) => {
    try {
        res.clearCookie('jwt',{
            httpOnly: true,
            secure: true,
            sameSite: 'strict'
        });

        res.status(200).json({message: 'Logged out Successfully!'});
    } catch (error) {
        res.status(500).json({message:`${error}`});
    }
}

export { register, login, getMe, logout };