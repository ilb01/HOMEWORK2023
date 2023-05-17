import Players from '../models/Players.js';

export const showAllPlayers = async (req, res) => {
    try {
        const documents = await Players.find({})
        res.json(documents);
    } catch (error) {
        console.log(error);
    }
};

export const searchPlayersByName = async (req, res) => {
    try {
        const { query } = req.params;
        const documents = await Players.find({ name: new RegExp(query, 'i') });
        res.json(documents);
    } catch (error) {
        console.log(error);
    }
};


export const showPlayerById = async (req, res) => {
    const document = await Players.findById(req.params.idPlayer);
    if (!document) {
        res.json({ message: 'This player doesn\'t exist' });
    }
    res.json(document);
};

export const newPlayer = async (req, res) => {
    const document = new Players(req.body);
    try {
    
        const doc = await document.save();
        res.json({ message: 'New player was added with id:'+doc._id });
    } catch (error) {
        res.send(error);
    }
};

export const updatePlayer = async (req, res) => {
    try {
        const filter = { _id: req.body.id };
        const update = req.body;
        const options = { new: true };
        const document = await Players.findOneAndUpdate(filter, update, options);
        res.json({
            "message":"Player updated successfuly",
            ...document
        });
    } catch (error) {
        res.send(error);
    }
};

export const deletePlayer = async (req, res) => {
    try {
        await Players.findByIdAndDelete({ _id: req.params.idPlayer });
        res.json({ message: 'The player was deleted with id:'+req.params.idPlayer });
    } catch (error) {
        console.log(error);
    }
};
