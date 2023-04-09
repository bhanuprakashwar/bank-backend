import { Request, Response } from 'express';
import Balance from "../models/balance.js";
import User from "../models/user.js";

const createBalanceAccount = async (userId: number) => {
    try {
        let user = await User.findOne({
            where: {
                id: userId
            }
        });
        if (user) {
            await Balance.sync();
            const balance = await Balance.create({
                userId,
                balance: 100000
            });
            return true;
        }
        console.log("User Not found");
        return false;
    } catch (error) {
        console.log(error);
        return false;
    }

}

const updateBalance = () => {

}

const deleteBalanceAccount = () => {

}

//need to replace the userId with accountNumber
const getBalance = async(req: Request, res: Response) => {
    try {
        const userId = req.query.userId;
        console.log(userId);
        const userBalanceInfo = await Balance.findOne({
            where: {
                userId: userId
            }
        });
        if (userBalanceInfo?.balance){
            res.status(200).send({userId:userId, balance: userBalanceInfo.balance});
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({message:"Server Error"});
    }
}

export default {
    createBalanceAccount,
    updateBalance,
    deleteBalanceAccount,
    getBalance
}