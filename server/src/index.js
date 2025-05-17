/* Importamos bibliotecas */
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

/* Rutas */
import quizRoute from './routes/quiz.routes.js'
import preguntaRoute from './routes/pregunta.routes.js'
import opcionRoute from './routes/opcion.routes.js'
import partidaRoute from './routes/partida.routes.js'
import authRoute from './routes/auth.routes.js'

const server = express() // Inicializamos el servidor
const port = 5200 // Puerto

const corsOptions = {
  origin: (origin, callback) => {
    // ✅ Permitir cualquier origen o solicitudes sin origen (como Postman)
    if (!origin || origin.includes('https')) {
      callback(null, true);
    } else {
      callback(new Error('Origen no permitido por CORS'));
    }
  },
  credentials: true, // Permitir cookies y credenciales
};

/* Hacemos que sea json la respuesta y que pueda acceder el frontend al backend */
server.use(cors(corsOptions));
server.use(express.json())
server.use(cookieParser());

/* Rutas */
server.use('/api/quiz', quizRoute)
server.use('/api/pregunta', preguntaRoute)
server.use('/api/opcion', opcionRoute)
server.use('/api/partida', partidaRoute)
server.use('/api/auth', authRoute)

/* Otras rutas que no sean las antes dichas */
server.use('*', (req, res) => {
  res.send('Hello World!')
})

/* Escuchamos el servidor */
server.listen(port, () => {
  console.log("Server is running on: " + port);
});