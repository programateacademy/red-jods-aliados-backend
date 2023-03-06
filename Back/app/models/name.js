const mongoose = require('mongoose');

const aliadosSchema = new mongoose.Schema({
    allyname:{
      type: String
    },
    description:{
      type: String
    },
    jobline:{
      type: String
    },
    AllianceGoals:{
      type: String
    },
    Termination: {
      type: String,
    },
    allySDG:{
      type: String,
    },
    Image:{
      type: String,
    },
    modificationdate:{
      type: String,
    }
},
  {
    timestamps: true, //fecha de creacion
    versionKey: false //quita el _V
  })

  module.exports = mongoose.model('aliados',aliadosSchema)
