/* Importamos la biblioteca */
import express from 'express';

/* Importamos otros archivos */
import {
  registerPartida,
  getPartidasUsuario,
  getPartidasQuiz,
  getRanking
} from '../controllers/partida.controller.js';

const router = express.Router();

router.post('/register', registerPartida);
router.get('/:usuario_id', getPartidasUsuario);
router.get('/:quiz_id', getPartidasQuiz);
router.get('/ranking', getRanking);

export default router;