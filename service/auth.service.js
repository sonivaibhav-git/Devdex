const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { generateAccessToken, generateRefreshToken } = require("../utils/token.js");
const {generateUsername} = require("../utils/usernameGenerator")
const UserRepo = require("../repositories/user.repo");

const register = async ({ email, password, name }) => {
    const existingUser = await UserRepo.findByEmail(email);
    if (existingUser) {
        return ('User already exists' )
     }
    const username = generateUsername(name);
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserRepo.createUser({
        email,
        password: hashedPassword,
        username,
        name,
    });

    return user;
};

const login = async (email, password ) => {
    if (!email || !password) {
                return ("All Credentials Required" )
    }
    const user = await UserRepo.findByEmail(email);
    if (!user) {
        return ("Invalid Credentials" )
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return ("Invalid Credentials" )
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    return {
        user,
        accessToken,
        refreshToken,
    };
};

const refresh = async (token) => {
    if (!token) {
        return ("Refresh token required" ) 
    }

    let payload;
    try {
        payload = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return ("Invalid refresh token")
    }

    const user = await UserRepo.findById(payload.id);
    if (!user) {
        return ("Invalid refresh token")
    }

    return generateAccessToken(user);
};

module.exports = {
    register,
    login,
    refresh,
};