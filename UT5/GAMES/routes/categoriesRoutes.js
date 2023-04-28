import express from "express";
import * as categoriesController from '../controllers/categoriesController.js';

const router = express.Router();

router.get('/categories', categoriesController.showAllCategories);
router.get('/categories/:idCategory', categoriesController.showCategoryById);
router.post('/categories', categoriesController.newCategory);    
router.put('/categories', categoriesController.updateCategory);
router.delete('/categories/:idCategory', categoriesController.deleteCategory);

export default router;