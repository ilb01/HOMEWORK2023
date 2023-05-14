import express from "express";
import * as coursesController from '../controllers/coursesController.js';

const router = express.Router();

router.get('/courses', coursesController.showAllCourses);
router.get('/courses/:idCourse', coursesController.showCourseById);
router.post('/courses', coursesController.newCourse);    
router.put('/courses', coursesController.updateCourse);
router.delete('/courses/:idCourse', coursesController.deleteCourse);

export default router;