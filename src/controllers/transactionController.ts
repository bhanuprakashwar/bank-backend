import { Request, Response } from 'express';
import User from '../models/user.js';
import Balance from '../models/balance.js';

const transferMoney = async (req: Request, res: Response) => {
    try {
        const { transferFrom, trasnferTo, amount } = req.body;
        const receiver = await User.findOne({
            where: {
                id: trasnferTo
            }
        });
        if(!receiver){
            res.status(404).send({message:"Receiver not found"});
        }
        const senderFunds = await Balance.findOne({
            where:{
                userId:transferFrom
            }
        });
        if(senderFunds.balance < amount){
            res.status(402).send({message:"Insufficent balance"})
        }
        //need to implement rest of the code

    } catch (error) {
        console.log(error);
        res.status(500).send({message:"Server Error"});
    }
}

const getTransactionDetails = () => {

}

export default {
    transferMoney,
    getTransactionDetails
}