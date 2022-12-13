import User from "../models/userModel.js";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();
import jwt from "jsonwebtoken";
class UserController {
    static userRegistration = async (req, res) => {
        const { name, email, password, password_confirmation, tc } = req.body;
        const user = await User.findOne({ email: email });
        if (user) {
            res.send({ "status": "failed", "message": "Email i s already exist" });
        } else {
            if (name && email && password && password_confirmation && tc) {
                if (password === password_confirmation) {
                    try {
                        const salt = await bcrypt.genSalt(13);
                        const hashpassword = await bcrypt.hash(password, salt);
                        const doc = new User({
                            name: name,
                            email: email,
                            password: hashpassword,
                            tc: tc
                        });
                        await doc.save();
                        const saved_user = await User.findOne({ email: email });
                        //create token 
                        const token = jwt.sign({ user_id: saved_user._id }, process.env.SECRET_KEY, { expiresIn: "1d" })
                        res.status(200).send({ "status": "success", "message": "registration successfully", "token": token });

                    } catch (err) {
                        res.send({ "status": "failed", "message": "unable to register" });
                    }

                } else {
                    res.status(201).send({ "status": "failed", "message": "password not matched" });

                }

            } else {
                res.send({ "status": "failed", "message": "all feild are require" });
            }
        }
    }

    static userLogin = async (req, res) => {
        try {
            const { email, password } = req.body;
            const token = req.headers.authorization;
            //verify token
            const decode = jwt.verify(token, process.env.SECRET_KEY);
            console.log(decode);
            if (decode != null) {
                res.status(200).send({ "status": "success", "message": "log-in successfully" });
            } else {
                res.status(401).send({ "status": "failed", "message": "unautherised person" });
            }

            // console.log(req.body);
            // if (email && password) {
            //     const user = await User.findOne({ email: email });
            //     if (user != null) {
            //         const isMatched = await bcrypt.compare(password, user.password)
            //         if ((email === user.email) && isMatched) {
            //             const decode= jwt.verify(token,process.env.SECRET_KEY);
            //             res.status(200).send({ "status": "success", "message": "log-in successfully","decode":decode });
            //         } else {
            //             res.status(401).send({ "status": "failed", "message": "unauthorized parameter" })
            //         }
            //     } else {
            //         res.status(404).send({ "status": "failed", "message": "user not found" })
            //     }
            // } else {
            //     res.status(201).send({ "status": "failed", "message": "All feilds are required" });
            // }

        } catch (err) {
            res.status(518).send({ "status": "failed", "message": "unable to log-in" });
        }
    }


    static changePassword = async (req, res) => {
        // res.status(200).send({ "status": "success", "message": " change password" })

        const { password, password_confirmation } = req.body;
        console.log(req.body);
        console.log(req.user);
        if (password && password_confirmation) {
            if (password === password_confirmation) {
                const salt = await bcrypt.genSalt(14);
                const newhashpassword = await bcrypt.hash(password, salt);
                await User.findByIdAndUpdate(req.user._id,{$set:{password:newhashpassword}})
                res.status(200).send({ "status": "success", "message": "  PASSWORD CHANGE SUCCESSFULLY" })

            } else {
                res.status(401).send({ "status": "failed", "message": "both password are not matched" })
            }
        } else {
            res.status(401).send({ "status": "failed", "message": "all feilds are required" })
        }
    }

};



export default UserController;