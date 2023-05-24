import Leagues from '../models/Leagues.js';

export const showAllLeagues = async (req, res) => {
    try {
        const documents = await Leagues.find({});
        res.json(documents);
    } catch (error) {
        console.log(error);
    }
};

export const showLeagueById = async (req, res) => {
    const document = await Leagues.findById(req.params.idLeague);
    if(!document) {
        res.json({message : 'League no exists'});
    }
    res.json(document);
};

export const searchLeaguesByName = async (req, res) => {
    try {
        const { query } = req.params;
        const documents = await Leagues.find({ name: new RegExp(query, 'i') });
        res.json(documents);
    } catch (error) {
        console.log(error);
    }
};

export const newLeague = async (req, res) => {
    const document = new Leagues(req.body);
    try {
        const doc = await document.save();
        res.json({ 
            error:false,
            message : 'New league was added with id:'+doc._id 
        });
    } catch (error) {
        //res.send(error);
        res.json({ 
            error:true,
            message : error
        });
    }
};

export const updateLeague = async (req, res) => {
    try {
        const filter = { _id : req.body.id };
        const update =  req.body;
        const options = {new : true};
        const document = await Leagues.findOneAndUpdate(filter, update, options);
        res.json({
           "message":"League modified successfuly",
           ...document
        });
    } catch (error) {
        res.send(error);
    }
};

export const deleteLeague = async (req, res) => {
    try {
        await Leagues.findByIdAndDelete({ _id : req.params.idLeague });
        res.json({message : 'League was deleted with id:'+req.params.idLeague });
    } catch (error) {
        console.log(error);
    }
};
