import Construction from "../models/constructionModel.js";
import getDuration from "../utils/getDuration.js"

export const getAllConstructions = async(req, res) => {
    const { category, style, material, price_from, price_to, page, limit } = req.query;
    const skip = (page - 1) * limit;
    let query = {};

    if (category) {
        query.category = category;
    }
    if (style) {
        query.style = style; 
    }
    if (material) {
        query.material = material; 
    }
    if (price_from || price_to) {
        query.total_price = {};
        if (price_from) {
            query.total_price.$gte = parseFloat(price_from); 
        }
        if (price_to) {
            query.total_price.$lte = parseFloat(price_to);
        }
    }

    try {
        const allConstructions = await Construction.find(query).skip(skip).limit(parseInt(limit));
        const totalData = await Construction.countDocuments(query)
        if(allConstructions.length > 0){
            res.status(200).json({
                msg: "Successfully get all data",
                status: "200",
                total: totalData,
                page: parseInt(page),
                limit: parseInt(limit),
                data: allConstructions,
                method: req.method
            })
        } else {
            res.status(200).json({
                msg: "No data found",
                status: "200",
                page: parseInt(page),
                limit: parseInt(limit),
                data_length: allConstructions.length,
                method: req.method
            })
        }
    } catch(err) {
        res.status(500).json({message: err.message});
    }
}

export const getOneConstruction = async (req, res) => {
    try {
        const { page, limit } = req.query;
        const selectedItem = await Construction.findById(req.params.constructionId)
            .populate({
                path: 'reviews',
                options: {
                    skip: (page - 1) * limit,
                    limit: parseInt(limit)
                }
            });
        
        const totalReviews = await Construction.findById(req.params.constructionId).populate('reviews').countDocuments();
        res.status(200).json({
            construction: selectedItem,
            totalReviews,
            totalPages: Math.ceil(totalReviews / limit),
            currentPage: page
        });
    } catch(err) {
        res.status(404).json({message: err.message});
    }
}

export const postConstruction = async(req, res) => {
    try{
        const files = req.files;
        if (!files) {
            return res.status(400).json({ message: 'No files uploaded' });
        }
        const photoUrls = files.map(file => file.path);
        const newConstruction = new Construction({
            image: photoUrls,
            ...req.body
        })
        await newConstruction.save();
        res.status(200).json({message: 'Success adding data', status: 200, data: newConstruction})
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

export const updateConstruction = async (req, res) => {
    try {
        await Construction.updateOne({_id: req.params.constructionId}, {$set: req.body})
        res.status(200).json({message: 'Updated successfully'})
    } catch(err) {
        res.status(404).json({message: err.message});
    }
}

export const deleteConstruction = async (req, res) => {
    try {
        await Construction.deleteOne({_id: req.params.constructionId})
        res.status(200).json({message: "Item deleted successfully"})
    } catch(err) {
        res.status(500).json({message: err.message});
    }
}