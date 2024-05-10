
import UserModel from "../models/userModel.js";

const userController = {
    //dang nhap

    logIn: async (req, res) => {

        const { userEmail, userPassword } = req.body;
        try {

            const user = await UserModel.findOne({ email: userEmail });
            if (!user || user.password != userPassword) throw new Error('tai khoan hoac mat khau ko chinh xac');


            res.status(401).send({
                message: "dang nhap thanh cong"
            })
        } catch (error) {
            console.log(error);
            res.status(500).send({
                message: "dang nhap that bai"
            })
        }
    },

    //dang xuat
    logOut: async (req, res) => {
        try {

            res.status(401).send({
                message: "dang xuat thanh cong"
            })

        } catch (error) {
            res.status(500).send({
                message: "dang xuat that bai"
            })
        }
    },

    // Endpoint API signUp
    signUp: async (req, res) => {
        try {
            const { newName, newEmail, newPassword } = req.body;

            const existedUser = await UserModel.findOne({ email: newEmail });
            if (existedUser) {
                throw new Error('user da ton tai');
            }
            if (!newPassword) {
                throw new Error('pasword ko dc de trong');
            }

            const newUser = await UserModel.create({
                name: newName,
                email: newEmail,
                password: newPassword,
            });

            res.status(201).send({
                data: newUser,
                message: 'dang ky thanh cong',
            });
        } catch (error) {
            console.error(error);
            res.status(500).send({
                message: 'dang ky that bai',
            });
        }
    },
}

export default userController;