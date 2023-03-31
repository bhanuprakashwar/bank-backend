import { Request, Response } from 'express';
import Balance from "../models/balance.js";
import User from "../models/user.js";

const createBalanceAccount = async (userId:number)=> {
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
    } catch(error){
        console.log(error);
        return false;
    }

}

const updateBalance = () => {

}

const deleteBalanceAccount = () => {

}

const getBalance = () => {

}

export default {
    createBalanceAccount,
    updateBalance,
    deleteBalanceAccount,
    getBalance
}