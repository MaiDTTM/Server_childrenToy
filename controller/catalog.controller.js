// model
const Catalog = require('../model/catalog.model');

module.exports = {
    GET: async function (req, res) {
        await Catalog.find(function (err, data) {
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
        // req.body.created = now;
        await Catalog.find({ name: req.body.name }, function (err, data) {
            if (err) return res.status(404).json({ message: err });
            else if (data.length >= 1) {
                return res.json({ message: 'Danh mục đã tồn tại!' });
            } else if (data.length === 0) {
                return Catalog(req.body)
                    .save()
                    .then((catalog) => {
                        res.status(200).json({ message: 'Thêm danh mục thành công!', id: catalog._id});
                    })
                    .catch((err) => {
                        res.status(404).json({ message: err });
                    });
            }
        });
    },
    DELETE: async function (req, res) {
        await Catalog.findByIdAndRemove({ _id: req.params.id }, function (err, catalog) {
            if (err) res.json(err);
            else res.json({ message: 'SUCCESS' });
        });
    },
    UPDATE: async function (req, res) {
        let catalogID = req.params.id;
        await Catalog.findById(catalogID, function (err, response) {
            if (!response) res.status(404).json({ message: 'Không tìm thấy dữ liệu!' });
            else {
                if (req.body.name === response.name) {
                    response.name = req.body.name;
                    response.icon = req.body.icon;
                    response.description = req.body.description;
                    response.paramId = req.body.paramId;
                    return response
                        .save()
                        .then((business) => {
                            res.status(200).json({ message: 'Sửa thông tin sản phẩm thành công !' });
                        })
                        .catch((err) => {
                            res.status(400).send({ message: 'Không cập nhật được sản phẩm' });
                        });
                } else if (req.body.name !== response.name) {
                    Catalog.find({ name: req.body.name }, function (err, data) {
                        if (err) return res.status(404).json({ message: err });
                        else if (data.length >= 1) {
                            return res.json({ message: 'Trùng tên với 1 Sản phẩm khác đã tồn tại. Xin mời nhập tên khác để cập nhật!' });
                        } else if (data.length === 0) {
                            response.name = req.body.name;
                            response.icon = req.body.icon;
                            response.description = req.body.description;
                            response.paramId = req.body.paramId;
                            return response
                                .save()
                                .then((business) => {
                                    res.status(200).json({ message: 'Sửa thông tin sản phẩm thành công !' });
                                })
                                .catch((err) => {
                                    res.status(400).send({ message: 'Không cập nhật được sản phẩm' });
                                });
                        }
                    });
                }
            }
        });
    },
};
