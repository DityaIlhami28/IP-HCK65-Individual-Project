const midtransClient = require("midtrans-client")
const { nanoid } = require("nanoid");
const {Transaction} = require("../models")

class TransactionController {
    static async intitateMidTransTrx(req, res, next) {
        try {
            const { id } = req.params
            console.log(id)
            const userId  = req.user.id
            // console.log(userId)
            // console.log(req.user)
            // console.log(gameId)
            let snap = new midtransClient.Snap({
                isProduction : false,
                serverKey : "SB-Mid-server-eytzbCvUc8Bte23b57N2A9PV"
            })
            const orderId = `TRX-au-${nanoid()}`
            const trxAmount  = 200000
            const transaction = await snap.createTransaction({
                "transaction_details" : {
                    "order_id" : orderId,
                    "gross_amount" : trxAmount
                },
                "credit_card" : {
                    "secure" : true
                },
                "customer_details" : {
                    "email" : req.user.email
                }
            })
            // console.log(transaction)
            await Transaction.create({
                orderId,
                gameId : id,
                userId : userId,
                amount : trxAmount,
                status : "paid",
                paidDate : new Date(),
                token : transaction.token
            })
            res.json({token : transaction.token, orderId})
        } catch (error) {
            next(error)
        }
    }
}
module.exports = TransactionController