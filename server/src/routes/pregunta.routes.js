/* Importamos la biblioteca */
import express from 'express';

/* Importamos otros archivos */
import {
  getPreguntas,
  getPregunta,
  addPregunta,
  editPregunta,
  deletePregunta
} from '../controllers/pregunta.controller.js';

const router = express.Router();

router.get('/gets/:id_quiz', getPreguntas);
router.get('/get/:id', getPregunta);
router.post('/add', addPregunta);
router.put('/edit/:id', editPregunta);
router.delete('/delete/:id', deletePregunta);

export default router;