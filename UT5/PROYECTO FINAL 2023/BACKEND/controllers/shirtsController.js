import Shirts from '../models/Shirts.js';

export const showAllShirts = async (req, res) => {
    try {
        const documents = await Shirts.find({});
        res.json(documents);
    } catch (error) {
        console.log(error);
    }
};

export const showShirtById = async (req, res) => {
    const document = await Shirts.findById(req.params.idShirt);
    if(!document) {
        res.json({message : 'Shirt no exists'});
    }
    res.json(document);
};

export const newShirt = async (req, res) => {
    const document = new Shirts(req.body);
    try {
        const doc = await document.save();
        res.json({ 
            error:false,
            message : 'New shirt was added with id:'+doc._id 
        });
    } catch (error) {
        //res.send(error);
        res.json({ 
            error:true,
            message : error
        });
    }
};

export const updateShirt = async (req, res) => {
    try {
        const filter = { _id : req.body.id };
        const update =  req.body;
        const options = {new : true};
        const document = await Shirts.findOneAndUpdate(filter, update, options);
        res.json(document);
    } catch (error) {
        res.send(error);
    }
};

export const deleteShirt = async (req, res) => {
    try {
        await Shirts.findByIdAndDelete({ _id : req.params.idShirt });
        res.json({message : 'Shirt was deleted with id:'+req.params.idShirt });
    } catch (error) {
        console.log(error);
    }
};
