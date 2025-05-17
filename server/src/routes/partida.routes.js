/* Importamos la biblioteca */
import express from 'express';

/* Importamos otros archivos */
import {
  registerPartida,
  getPartidasUsuario,
  getPartidasQuiz,
  getTops
} from '../controllers/partida.controller.js';

const router = express.Router();

router.post('/register', registerPartida);
router.get('/usuario/:usuario_id', getPartidasUsuario);
router.get('/quiz/:quiz_id', getPartidasQuiz);
router.get('/top-global', getTops);

export default router;