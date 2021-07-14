// model
const Comments = require('../model/comment.model');

module.exports = {
    GET: async function (req, res) {
        await Comments.find({ id_product: req.query.id_product }, function (err, data) {
            if (err) return res.status(404).json({ message: err });
            else {
                const objectData = {};
                data.map((item) => {
                    objectData[item._id] = item;
                });
                return res.status(200).json(objectData);
            }
        });
    },
    POST: async function (req, res) {
        try {
            await Comments(req.body)
                .save()
                .then((data) => {
                    res.json({ message: 'SUCCESS', data: data });
                })
                .catch((err) => {
                    res.status(500).json({ message: 'error' });
                });
        } catch (e) {
            console.log('POST error:', e); // MongLV log fix bug
        }
    },
    DELETE: async function (req, res) {
        try {
            await Comments.findByIdAndRemove({ _id: req.params.id }, async function (err, Product) {
                if (err) res.json(err);
                else res.json({ message: 'SUCCESS' });
            });
        } catch (e) {
            console.log('POST error:', e); // MongLV log fix bug
        }
    },
};
