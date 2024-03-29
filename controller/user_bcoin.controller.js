// model
const User = require('../model/user_bcoin.model');
const EC = require('elliptic').ec;

// You can use any elliptic curve you want
const ec = new EC('secp256k1');

async function checkUpdate(req, res, data) {
    let number = 0;
    data.name !== req.body.name
        ? await User.find({ name: req.body.name }, function (err, user) {
            if (err) return res.status(404).json({ message: err });
            else if (user && user.length === 1) {
                return res.status(200).json({ message: 'Tên đã được đăng ký !' });
            } else {
                number = number + 1;
            }
        })
        : (number = number + 1);
    data.email !== req.body.email && number === 1
        ? await User.find({ email: req.body.email }, function (err, user) {
            if (err) return res.status(404).json({ message: err });
            else if (user && user.length === 1) {
                return res.status(200).json({ message: 'Email đã được đăng ký !' });
            } else {
                number = number + 1;
            }
        })
        : (number = number + 1);
    data.phone !== req.body.phone && number === 2
        ? await User.find({ phone: req.body.phone }, function (err, user) {
            if (err) return res.status(404).json({ message: err });
            else if (user && user.length === 1) {
                return res.status(200).json({ message: 'Phone đã được đăng ký !' });
            } else {
                number = number + 1;
            }
        })
        : (number = number + 1);
    req.body.name && (data.name = req.body.name);
    req.body.email && (data.email = req.body.email);
    req.body.phone && (data.phone = req.body.phone);
    req.body.gender && (data.gender = req.body.gender);
    req.body.date_of_birth && (data['date_of_birth'] = req.body.date_of_birth);
    req.body.address && (data.address = req.body.address);
    req.body.image && (data.image = req.body.image);
    req.body.status && (data.status = req.body.status);
    // if (req.body.password && req.body['new_password'] && data.password === md5(req.body.password)) {
    if (req.body.password && req.body['new_password'] && data.password === req.body.password) {
        data.password = req.body['new_password'];
    } else if (req.body.password && req.body['new_password']) return res.status(200).send({ message: 'Mật khẩu sai !' });
    number === 3 &&
        data
            .save()
            .then((business) => {
                res.json({ message: 'SUCCESS', user: business });
            })
            .catch((err) => {
                res.status(200).send({ message: 'Failed to update catalog' });
            });
}
module.exports = {
    GET: async function (req, res) {
        await User.find(function (err, data) {
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

            let number = 0;
            await User.find({ name: req.body.name }, function (err, user) {
                if (err) return res.status(404).json({ message: err });
                else if (user.length === 1) {
                    return res.status(200).json({ message: 'Tên đã được đăng ký !' });
                } else {
                    number = number + 1;
                }
            });

            // Tạo một cặp khóa mới và chuyển đổi chúng thành chuỗi hex
            const key = ec.genKeyPair('');
            const publicKey = key.getPublic('hex');
            const privateKey = key.getPrivate('hex');
            const data = {
                ...req.body,
                publicKey,
                privateKey,
            };
            console.log('data: ', data);
            number === 1 &&
                User(data)
                    .save()
                    .then((User) => {
                        console.log('User: ', User);
                        return res.json({ message: 'SUCCESS', user: User });
                    })
                    .catch((err) => {
                        return res.status(500).json({ message: err });
                    });
        } catch (err) {
            console.log('POST_USER_ ERROR: ', err);
        }
    },
    DELETE: async function (req, res) {
        await User.findByIdAndRemove({ _id: req.params.id }, function (err, catalog) {
            if (err) res.json(err);
            else res.json({ message: 'SUCCESS' });
        });
    },
    GET_ID: async function (req, res) {
        await User.findById({ _id: req.params.id }, function (err, User) {
            if (err) return res.status(404).json({ message: err });
            else return res.status(200).json(User);
        });
    },

    UPDATE: async function (req, res) {
        await User.findById(req.params.id, function (err, User) {
            if (!User) res.status(404).send('data is not found');
            else {
                checkUpdate(req, res, User);
            }
        });
    },

    LOGIN: async function (req, res) {
        try {
            const name = req.body && req.body.name;
            await User.find({ name: name }, function (err, data) {
                if (err) return res.status(404).json({ message: err });
                if (data.length === 1 && name === data[0].name && req.body.password === data[0].password) {
                    return res.status(200).json({ message: 'SUCCESS', user: { ...data[0]._doc } });
                } else if (data.length > 0 && data[0].password && req.body.password !== data[0].password) {
                    return res.status(200).json({ message: 'Sai tài khoản hoặc mật khẩu!' });
                } else {
                    return res.status(200).json({ message: 'Người dùng chưa tồn tại' });
                }
            });
        } catch (err) {
            console.log('err LOGIN', err);
        }
    },

    PUT: async function (req, res) {
        await User.findById(req.params.id, function (err, user) {
            if (!user) res.status(404).send('data is not found');
            else {
                user.password = req.body.password;
                user.save()
                    .then((business) => {
                        return res.json({ message: 'SUCCESS', user: business });
                    })
                    .catch((err) => {
                        return res.status(400).send({ err, message: 'Cập tài khoản thất bại !' });
                    });
            }
        });
    },
};
