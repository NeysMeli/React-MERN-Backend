/*
    Event Routes
    /api/events

*/

const { Router } = require("express");
const { check } = require("express-validator");
const { isDate } = require("../helpers/isDate");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
} = require("../controllers/events");

const router = Router();

// Todas las peticiones tienen que pasar por la validacion del JWT
router.use(validarJWT); // cualquier peticion despues de esta linea debe de tener su token

//Obtener eventos
router.get("/", getEventos);

//Crear un nuevo evento
router.post(
  "/",
  [
    check("title", "El titulo es obligatorio").not().isEmpty(),
    check("start", "Fecha de inicio es obligatoria").custom(isDate),
    check("end", "Fecha de finalizacion es obligatoria").custom(isDate),
    validarCampos,
  ], //validar que este campo este
  crearEvento
);

//Actualizar Evento
router.put(
  "/:id",
  [
    check("title", "El titulo es obligatorio").not().isEmpty(),
    check("start", "Fecha de inicio es obligatoria").custom(isDate),
    check("end", "Fecha de finalizacion es obligatoria").custom(isDate),
    validarCampos,
  ], //validar que este campo este
  actualizarEvento
);

//Borrar Evento
router.delete("/:id", eliminarEvento);

module.exports = router;
