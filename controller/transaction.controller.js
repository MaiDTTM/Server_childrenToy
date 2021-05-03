// model
const Transaction = require('../model/transaction.model');
const Admin = require('../model/admin.model');
const CheckUseOfAdmin = async (req, res, transaction) => {
    const objectData = {};

    await Admin.find(function (err, admin) {
        if (err) return res.status(404).json({ message: err });
        else {
            admin.length > 0 &&
                admin.map((item) => {
                    objectData[item._id] = {
                        _id: item.id,
                        name: item.name,
                        email: item.email,
                        position: item.position,
                        avatar: item.avatar,
                        phone: item.phone,
                        info: item.info,
                        status: item.status,
                    };
                });
            return objectData;
        }
    });
    if (Object.keys(objectData).includes(req.body.user_id)) {
        req.body.status_transaction && (transaction.status_transaction = req.body.status_transaction);
        transaction
            .save()
            .then((business) => {
                res.status(200).json({ message: 'SUCCESS', transaction: business });
            })
            .catch((err) => {
                res.status(200).send({ message: 'Failed to update catalog' });
            });
    } else {
        if ((req.body && req.body.status_transaction === 'Chờ xác nhận') || req.body.status_transaction === 'Đã hủy') {
            // Note: cho người dùng
            req.body.message && (transaction.message = req.body.message);
            req.body.address && (transaction.address = req.body.address);
            req.body.delivery_time && (transaction.delivery_time = req.body.delivery_time);
            req.body.carts_id && (transaction.carts_id = req.body.carts_id);
            transaction
                .save()
                .then((business) => {
                    res.status(200).json({ message: 'SUCCESS', transaction: business });
                })
                .catch((err) => {
                    res.status(200).send({ message: 'Lỗi kết nối' });
                });
        } else {
            res.status(200).send({ message: 'Bạn không có quyền' });
        }
    }
};
const UpdateData = (transaction, res) => {
    transaction
        .save()
        .then((business) => {
            res.status(200).json({ message: 'SUCCESS', transaction: business });
        })
        .catch((err) => {
            res.status(200).send({ message: 'Failed to update catalog' });
        });
};
module.exports = {
    GET: async function (req, res) {
        await Transaction.find(function (err, data) {
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
        Transaction(req.body)
            .save()
            .then((transaction) => {
                res.json({ message: 'SUCCESS', transaction: Transaction });
            })
            .catch((err) => {
                res.status(200).json({ message: err });
            });
    },
    GET_ID: async function (req, res) {
        await Transaction.findById({ _id: req.params.id }, function (err, transaction) {
            if (err) return res.status(404).json({ message: err });
            else return res.status(200).json(User);
        });
    },
    UPDATE: async function (req, res) {
        await Transaction.findById(req.params.id, function (err, transaction) {
            if (!transaction) res.status(404).send('data is not found');
            else {
                return CheckUseOfAdmin(req, res, transaction);
            }
        });
    },
};
