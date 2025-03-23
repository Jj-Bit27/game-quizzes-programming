/* Importamos la biblioteca */
import express from 'express';

/* Importamos otros archivos */
import {
  getQuizes,
  getQuiz,
  addQuiz,
  editQuiz,
  deleteQuiz
} from '../controllers/quiz.controller.js';

const router = express.Router();

router.get('/gets', getQuizes);
router.get('/get/:id', getQuiz);
router.post('/add', addQuiz);
router.put('/edit/:id', editQuiz);
router.delete('/delete/:id', deleteQuiz);

export default router;