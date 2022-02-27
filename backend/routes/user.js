import express from "express";
const userRoutes = express.Router();

import { login, signup } from "../controllers/user.js";

//Importation de la vérif du mot de passe

router.post("/signup", signup);
router.post("/login", login);

export { userRoutes };
