/* Importamos la biblioteca */
import express from 'express';

/* Importamos otros archivos */
import {
  getOpciones,
  getOpcion,
  addOpcion,
  editOpcion,
  deleteOpcion
} from '../controllers/opcion.controller.js';

const router = express.Router();

router.get('/gets/:id_pregunta', getOpciones);
router.get('/get/:id', getOpcion);
router.post('/add', addOpcion);
router.put('/edit/:id', editOpcion);
router.delete('/delete/:id', deleteOpcion);

export default router;