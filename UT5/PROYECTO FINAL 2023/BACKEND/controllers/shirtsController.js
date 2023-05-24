import Shirts from '../models/Shirts.js';

export const showAllShirts = async (req, res) => {
    try {
        const documents = await Shirts.find({}).populate("league");
        res.json(documents);
    } catch (error) {
        console.log(error);
    }
};

export const searchShirtsByName = async (req, res) => {
    try {
        const { query } = req.params;
        const documents = await Shirts.find({ team: new RegExp(query, 'i') })
            .populate({
                path: 'league',
                model: 'Leagues'
            });
        res.json(documents);
    } catch (error) {
        console.log(error);
    }
};

export const searchShirtsByLeague = async (req, res) => {
    try {
        const { query } = req.params;
        const documents = await Shirts.find({ league:ObjectId(req.params.idLeague) })
                                .populate("league");
            
        res.json(documents);
    } catch (error) {
        console.log(error);
    }
};

export const showShirtById = async (req, res) => {
    const document = await Shirts.findById(req.params.idShirt);
    if (!document) {
        res.json({ message: 'This shirt doesn\'t exist' });
    }
    res.json(document);
};

export const newShirt = async (req, res) => {
    const document = new Shirts(req.body);
    try {
    
        const doc = await document.save();
        res.json({ message: 'New shirt was added with id:'+doc._id });
    } catch (error) {
        res.send(error);
    }
};

export const updateShirt = async (req, res) => {
    try {
        const filter = { _id: req.body.id };
        const update = req.body;
        const options = { new: true };
        const document = await Shirts.findOneAndUpdate(filter, update, options);
        res.json({
            "message":"Shirt updated successfuly",
            ...document
        });
    } catch (error) {
        res.send(error);
    }
};

export const deleteShirt = async (req, res) => {
    try {
        await Shirts.findByIdAndDelete({ _id: req.params.idShirt });
        res.json({ message: 'The shirt was deleted with id:'+req.params.idShirt });
    } catch (error) {
        console.log(error);
    }
};
