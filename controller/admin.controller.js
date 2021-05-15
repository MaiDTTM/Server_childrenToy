// model
const Admin = require('../model/admin.model');
async function checkUpdate(req, res, data) {
    let number = 0;
    // data.name !== req.body.name
    //     ? await Admin.find({ name: req.body.name }, function (err, admin) {
    //           if (err) return res.status(404).json({ message: err });
    //           else if (admin && admin.length === 1) {
    //               return res.status(200).json({ message: 'Tên đã được đăng ký !' });
    //           } else {
    //               number = number + 1;
    //           }
    //       })
    //     : (number = number + 1);
    data.email !== req.body.email && number === 0
        ? await Admin.find({ email: req.body.email }, function (err, admin) {
              if (err) return res.status(404).json({ message: err });
              else if (admin && admin.length === 1) {
                  return res.status(200).json({ message: 'Email đã được đăng ký !' });
              } else {
                  number = number + 1;
              }
          })
        : (number = number + 1);
    data.phone !== req.body.phone && number === 1
        ? await Admin.find({ phone: req.body.phone }, function (err, admin) {
              if (err) return res.status(404).json({ message: err });
              else if (admin && admin.length === 1) {
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
    req.body.avatar && (data.avatar = req.body.avatar);
    req.body.status && (data.status = req.body.status);
    req.body.position && (data.position = req.body.position);
    req.body.password && (data.password = req.body.password);
    number === 2 &&
        data
            .save()
            .then((business) => {
                res.json({ message: 'SUCCESS', admin: business });
            })
            .catch((err) => {
                res.status(200).send({ message: 'Failed to update catalog' });
            });
}
module.exports = {
    GET: async function (req, res) {
        await Admin.find(function (err, data) {
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
        let number = 0;
        await Admin.find({ name: req.body.name }, function (err, admin) {
            if (err) return res.status(404).json({ message: err });
            else if (admin.length === 1) {
                return res.status(200).json({ message: 'Tên đã được đăng ký !' });
            } else {
                number = number + 1;
            }
        });
        number === 1 &&
            (await Admin.find({ email: req.body.email }, function (err, admin) {
                if (err) return res.status(404).json({ message: err });
                else if (admin.length === 1) {
                    return res.status(200).json({ message: 'Email đã được đăng ký !' });
                } else {
                    number = number + 1;
                }
            }));
        number === 2 &&
            (await Admin.find({ phone: req.body.phone }, function (err, admin) {
                if (err) return res.status(404).json({ message: err });
                else if (admin.length === 1) {
                    return res.status(200).json({ message: 'Số điện thoại đã được đăng ký !' });
                } else {
                    number = number + 1;
                }
            }));
        number === 3 &&
            Admin(req.body)
                .save()
                .then((admin) => {
                    res.json({ message: 'SUCCESS', id: admin._id });
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
        await Admin.findById(req.params.id, function (err, Admin) {
            if (!Admin) res.status(404).send('data is not found');
            else {
                checkUpdate(req, res, Admin);
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
    },
};
