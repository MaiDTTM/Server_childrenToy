// model
const Admin = require('../model/admin.model');

module.exports = {
    GET: async function (req, res) {
        await Admin.find(function (err, data) {
            if (err) return res.status(404).json({ message: err });
            else {
                const objectData = {};
                data.map((item) => {
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
                return res.status(200).json(objectData);
            }
        });
    },
    POST: async function (req, res) {
        await Admin.find({ email: req.body.email }, function (err, Admin) {
            if (err) return res.status(404).json({ message: err });
            else if (Admin.length === 1) {
                return res.status(200).json({ message: 'Đã có tồn tại' });
            }
        });
        return await Admin(req.body)
            .save()
            .then((admin) => {
                res.json({ message: 'SUCCESS' });
            })
            .catch((err) => {
                res.status(500).json({ message: err });
            });
    },
    DELETE: async function (req, res) {
        await Admin.findByIdAndRemove({ _id: req.params.id }, function (err, catalog) {
            if (err) res.json(err);
            else res.json({ message: 'SUCCESS' });
        });
    },
    GET_ID: async function (req, res) {
        await Admin.findById({ _id: req.params.id }, function (err, admin) {
            if (err) return res.status(404).json({ message: err });
            else return res.status(200).json(admin);
        });
    },
    UPDATE: async function (req, res) {
        await Admin.findById(req.params.id, function (err, admin) {
            if (!admin) res.status(404).send('data is not found');
            else {
                req.body.position && (admin.position = req.body.position);
                req.body.status && (admin.status = req.body.status);
                req.body.phone && (admin.phone = req.body.phone);
                req.body.avatar && (admin.avatar = req.body.avatar);
                req.body.email && (admin.email = req.body.email);
                req.body.name && (admin.name = req.body.name);
                req.body.password && (admin.password = req.body.password);
                admin
                    .save()
                    .then((business) => {
                        res.json({ message: 'SUCCESS' });
                    })
                    .catch((err) => {
                        res.status(400).send({ message: 'Cập tài khoản thất bại !' });
                    });
            }
        });
    },
    LOGIN: async function (req, res) {
        const admin = req.body && req.body.admin;
        if (admin.includes('@')) {
            await Admin.find({ email: admin }, function (err, data) {
                if (err) return res.status(404).json({ message: err });
                else if (data.length === 1 && admin === data[0].email && req.body.password === data[0].password) {
                    return res.status(200).json({ message: 'SUCCESS', myUser: { ...data[0]._doc } });
                } else if (data.length > 0 && data[0].password && req.body.password !== data[0].password) {
                    res.status(200).json({ message: 'Mật khẩu sai !' });
                } else {
                    res.status(200).json({ message: 'Tài khoản không đúng !' });
                }
            });
        } else {
            await Admin.find({ phone: admin }, function (err, data) {
                if (err) return res.status(404).json({ message: err });
                else if (data.length === 1 && admin === data[0].phone && req.body.password === data[0].password) {
                    return res.status(200).json({ message: 'SUCCESS', myUser: { ...data[0]._doc } });
                } else if (data.length > 0 && data[0].password && req.body.password !== data[0].password) {
                    res.status(200).json({ message: 'Sai mật khẩu!' });
                } else {
                    res.status(200).json({ message: 'Tài khoản không đúng !' });
                }
            });
        }
        // await Admin.find({ email: req.body.email }, function (err, data) {
        //     if (err) return res.status(405).json({ message: err });
        //     else if (data.length === 1 && req.body.email === data[0].email && req.body.password === data[0].password) {
        //         return res.status(200).json({ message: 'SUCCESS', data: data[0], id_admin: data[0]._id, email: data[0].email, password: data[0].password, avatar: data[0].avatar, name: data[0].name, position: data[0].position });
        //     } else {
        //         res.status(404).json({ message: 'Wrong password or account' });
        //     }
        // });
    },
};
