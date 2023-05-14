import Courses from '../models/Courses.js';

export const showAllCourses = async (req, res) => {
    try {
        const documents = await Courses.find({});
        res.json(documents);
    } catch (error) {
        console.log(error);
    }
};

export const showCourseById = async (req, res) => {
    const document = await Courses.findById(req.params.idCourse);
    if(!document) {
        res.json({message : 'Course no exists'});
    }
    res.json(document);
};

export const newCourse = async (req, res) => {
    const document = new Courses(req.body);
    try {
        const doc = await document.save();
        res.json({ 
            error:false,
            message : 'New course was added with id:'+doc._id 
        });
    } catch (error) {
        //res.send(error);
        res.json({ 
            error:true,
            message : error
        });
    }
};

export const updateCourse = async (req, res) => {
    try {
        const filter = { _id : req.body.id };
        const update =  req.body;
        const options = {new : true};
        const document = await Courses.findOneAndUpdate(filter, update, options);
        res.json(document);
    } catch (error) {
        res.send(error);
    }
};

export const deleteCourse = async (req, res) => {
    try {
        await Courses.findByIdAndDelete({ _id : req.params.idCourse });
        res.json({message : 'Course was deleted with id:'+req.params.idCourse });
    } catch (error) {
        console.log(error);
    }
};
