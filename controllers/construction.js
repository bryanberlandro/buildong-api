import Construction from "../models/constructionModel.js";
import getDuration from "../utils/getDuration.js"

export const getAllConstructions = async(req, res) => {
    try {
        const { category, style, material, price_from, price_to } = req.query;
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
                query.total_price.$gte = parseFloat(price_from); // Menggunakan $gte untuk harga minimal
            }
            if (price_to) {
                query.total_price.$lte = parseFloat(price_to); // Menggunakan $lte untuk harga maksimal
            }
        }

        const allConstructions = await Construction.find(query)
        if(allConstructions.length > 0){
            res.status(200).json({
                msg: "Successfully get all data",
                status: "200",
                data_length: allConstructions.length,
                data: allConstructions,
                method: req.method
            })
        } else {
            res.status(200).json({
                msg: "No data found",
                status: "200",
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
        const selectedItem = await Construction.findById(req.params.constructionId).populate('reviews');
        res.status(200).json(selectedItem);
    } catch(err) {
        res.status(404).json({message: err.message});
    }
}

export const postConstruction = async(req, res) => {
    const {start, finish, ...rest} = req.body
    const sumDuration = await getDuration(start, finish)
    
    try{
        const files = req.files;
        if (!files) {
            return res.status(400).json({ message: 'No files uploaded' });
        }
        const photoUrls = files.map(file => file.path);
        const newConstruction = new Construction({
            project_timeline: {start, finish, duration: sumDuration},
            image: photoUrls,
            ...rest
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