import express from "express";
import * as shirtsController from '../controllers/shirtsController.js';

const router = express.Router();

router.get('/shirts', shirtsController.showAllShirts);
router.get('/shirts/:idShirt', shirtsController.showShirtById);
router.post('/shirts', shirtsController.newShirt);    
router.put('/shirts', shirtsController.updateShirt);
router.delete('/shirts/:idShirt', shirtsController.deleteShirt);

export default router;