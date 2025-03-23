import { pool } from '../database/db.js'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { TOKEN_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD } from "../libs/config.js";
import { createAccessToken } from "../libs/jwt.js";

/* Modulo de crear nuevo usuario */
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const [[userFound]] = await pool.query("SELECT * FROM usuarios WHERE email = ?", [
      email,
    ]
    );

    if (userFound)
      return res.status(400).json({
        message: ["Este correo ya esta en uso"],
      });

    const passwordHash = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      "INSERT INTO usuarios (nombre, email, contrasena)  VALUES (?, ?, ?)",
      [name, email, passwordHash]
    );

    const token = await createAccessToken({
      id: result.insertId,
      name: name,
    });

    res.cookie("token", token, {
      secure: true,
      sameSite: "none",
    });

    res.json({
      id: result.insertId,
      name,
      email,
      role: "usuario",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Modulo de iniciar sesion */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {

      const token = await createAccessToken({
        id: 'admin',
        name: 'Administrador',
      });

      res.cookie("token", token, {
        secure: true,
        sameSite: "none",
      });

      return res.json({
        id: "admin",
        name: "Administrador",
        email: ADMIN_EMAIL,
        role: "admin",
      });
    }

    const [[userFound]] = await pool.query(
      "SELECT * FROM usuarios WHERE email = ?",
      [email]
    );

    if (!userFound)
      return res.status(400).json({
        message: ["No hay ninguna cuenta con este correo asociado"],
      });

    const isMatch = await bcrypt.compare(password, userFound.contrasena);
    if (!isMatch) {
      return res.status(400).json({
        message: ["La contraseña ingresada es incorrecta"],
      });
    }

    const token = await createAccessToken({
      id: userFound.id,
      name: userFound.nombre,
    });

    res.cookie("token", token, {
      secure: true,
      sameSite: "none",
    });

    res.json({
      id: userFound.id,
      name: userFound.nombre,
      email: userFound.email,
      role: "usuario",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


/* Modulo de verificar el token del usuario */
export const verifyToken = async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) return res.send(false);

    jwt.verify(token, TOKEN_SECRET, async (error, user) => {
      if (error) return res.sendStatus(401);

      if (user.id === 'admin') {
        return res.json({
          id: "admin",
          name: "Administrador",
          email: ADMIN_EMAIL,
          role: "admin",
        });
      }

      const [[userFound]] = await pool.query("SELECT * FROM usuarios WHERE id = ?", [
        user.id,
      ]
      )
      if (!userFound) return res.sendStatus(401);

      return res.json({
        id: userFound.id,
        name: userFound.nombre,
        email: userFound.correo,
        role: "usuario",
      });
    });
  } catch (error) {
    console.log(error);
  }
};

/* Modulo de cerrar la session del usuario */
export const logout = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: true,
    expires: new Date(0),
  });
  return res.sendStatus(200);
};