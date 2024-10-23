const { Schema, model, SchemaType } = require("mongoose");

const EventoSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  user: {
    // [Identificar Quien grabo el registro?]
    type: Schema.Types.ObjectId, //[Esto le dira a Mongoose que va hacer una referencia]
    ref: "Usuario",
    required: true,
  },
});

//Extraer el objeto desde el JSON (Como Quiero que se muestre mi objeto)

EventoSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model("Evento", EventoSchema);
