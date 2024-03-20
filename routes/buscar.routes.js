import { Router } from "express";
import { busquedaPersonaliza } from "../controllers/buscar.controller.js";

const router = Router()


router.get('/:coleccion/:termino', busquedaPersonaliza)


export default router