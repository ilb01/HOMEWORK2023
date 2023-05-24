import express from "express";
import * as leaguesController from '../controllers/leaguesController.js';

const router = express.Router();

router.get('/leagues', leaguesController.showAllLeagues);
router.get('/leagues/:idLeague', leaguesController.showLeagueById);
router.get('/leagues/search/:query', leaguesController.searchLeaguesByName);
router.post('/leagues', leaguesController.newLeague);    
router.put('/leagues', leaguesController.updateLeague);
router.delete('/leagues/:idLeague', leaguesController.deleteLeague);

export default router;