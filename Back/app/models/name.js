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
    start_date:{
      type: String
    },
    Termination_date: {
      type: String
    },
    allyODS:{
      type: String
    },
    Image:{
      type: String
    },
    modification_date:{
      type: String
    }
},
  {
    timestamps: true, //fecha de creacion
    versionKey: false //quita el _V
  })

  module.exports = mongoose.model('aliados',aliadosSchema)
