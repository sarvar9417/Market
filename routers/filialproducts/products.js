const {
    Product
} = require("../../models/Products/Product");
const { Market } = require("../../models/MarketAndBranch/Market");
const { Category } = require("../../models/Products/Category");
const { ProductType } = require("../../models/Products/ProductType");
const { Unit } = require("../../models/Products/Unit");
const { Brand } = require("../../models/Products/Brand");
const { ProductPrice } = require("../../models/Products/ProductPrice");
const { FilialProduct, validateFilialProduct } = require("../../models/FilialProducts/FilialProduct");
const ObjectId = require("mongodb").ObjectId;

//Product getall
module.exports.getAll = async (req, res) => {
    try {
        const { market } = req.body;

        const marke = await Market.findById(market);

        if (!marke) {
            return res.status(400).json({
                message: "Diqqat! Do'kon ma'lumotlari topilmadi.",
            });
        }

        const products = await FilialProduct.find({
            market,
        })
            .sort({ _id: -1 })
            .select("product unit category producttype brand price total")
            .populate("category", "name code")
            .populate("producttype", "name")
            .populate("unit", "name")
            .populate("brand", "name")
            .populate("price", "sellingprice")
            .populate("product", "name code");

        res.send(products);
    } catch (error) {
        res.status(501).json({ error: "Serverda xatolik yuz berdi..." });
    }
};

//Product getallcategory
module.exports.getAllCategory = async (req, res) => {
    try {
        const { market, category } = req.body;

        const marke = await Market.findById(market);

        if (!marke) {
            return res.status(400).json({
                message: "Diqqat! Do'kon ma'lumotlari topilmadi.",
            });
        }

        const categor = await Category.findById(category);

        if (!categor) {
            return res.status(400).json({
                message: "Diqqat! Bo'lim ma'lumotlari topilmadi.",
            });
        }

        const products = await Product.find({
            market,
            category,
        })
            .populate("category", "name")
            .populate("market", "name")
            .populate("producttype", "name");

        res.send(products);
    } catch (error) {
        res.status(501).json({ error: "Serverda xatolik yuz berdi..." });
    }
};

//Product deleteall
module.exports.deleteAll = async (req, res) => {
    try {
        const { market } = req.body;

        const marke = await Market.findById(market);

        if (!marke) {
            return res.status(400).json({
                message: "Diqqat! Do'kon ma'lumotlari topilmadi.",
            });
        }

        const products = await Product.find({
            market,
        });

        let all = [];
        for (const product of products) {
            const del = await Product.findByIdAndDelete(product._id);

            const categoryUpdate = await Category.findByIdAndUpdate(
                product.category,
                {
                    $pull: {
                        products: new ObjectId(product._id),
                    },
                }
            );

            const producttypeUpdate = await ProductType.findByIdAndUpdate(
                product.producttype,
                {
                    $pull: {
                        products: new ObjectId(product._id),
                    },
                }
            );

            for (const productconnector of product.productconnectors) {
                const del = await ProductConnector.findByIdAndDelete(productconnector);
            }

            all.push(del);
        }

        res.send(all);
    } catch (error) {
        res.status(501).json({ error: "Serverda xatolik yuz berdi..." });
    }
};
