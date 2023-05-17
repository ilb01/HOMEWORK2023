import express from "express";
import * as playersController from '../controllers/playersController.js';

const router = express.Router();

router.get('/players', playersController.showAllPlayers);
router.get('/players/search/:query', playersController.searchPlayersByName);
router.get('/players/:idPlayer',  playersController.showPlayerById);
router.post('/players', playersController.newPlayer);    
router.put('/players', playersController.updatePlayer);
router.delete('/players/:idPlayer', playersController.deletePlayer);

export default router;



