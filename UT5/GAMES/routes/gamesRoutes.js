import express from "express";
import * as gamesController from '../controllers/gamesController.js';

const router = express.Router();

router.get('/games', gamesController.showAllGames);
router.get('/games/search/:query', gamesController.searchGamesByName);
router.get('/games/search/price/:minPrice/:maxPrice', gamesController.searchGamesByPrice);
router.get('/games/:idGame',  gamesController.showGameById);
router.post('/games', gamesController.newGame);    
router.put('/games', gamesController.updateGame);
router.delete('/games/:idGame', gamesController.deleteGame);

// Control 404. Siempre al final
router.use("*", (req, res) => {
    res.status(404).json({
        success: "false",
        message: "Page not found",
        error: {
            statusCode: 404,
            message: "You reached a route that is not defined on this server",
        },
    });
  });

export default router;



