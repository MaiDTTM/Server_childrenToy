// model
const Block = require('../model/block.model');
const Users = require('../model/block.model');

const { Blockchain } = require('../core/blockchain');



module.exports = {
    POST: async function (req, res) {
        try {
            await Block(req.body)
                .save()
                .then((blockchain) => {
                    return res.json({ message: 'SUCCESS', blockchain: blockchain });
                })
                .catch((err) => {
                    return res.status(500).json({ message: err });
                });
        } catch (err) {
            console.log('POST_USER_ ERROR: ', err);
        }
    },
    GET: async function (req, res) {
        try {
            const blockchain = await Block.find();
            return res.json({ message: 'SUCCESS', blockchain: blockchain });
        } catch (err) {
            console.log('POST_USER_ ERROR: ', err);
        }
    },
};
