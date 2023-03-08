const mongoose = require('mongoose');

const aliadosSchema = new mongoose.Schema({
    organization:{
      type: String
    },
    ODS:{
      type: String
    },
    img:{
      type: String
    },
    phone:{
      type: String
    },
    email:{
      type: String
    },
    respnsible: {
      type: String
    },
    eje:{
      type: String
    },
    description:{
      type: String
    },
    objetives:{
      type: String
    },
    date_start:{
      type: String
    },
    date_end:{
      type: String
    },
    resource:{
      type: String
    },
    status:{
      type: String
    },
    addres:{
      type: String
    },
    twitter:{
      type: String
    },
    ig:{
      type: String
    },
    fb:{
      type: String
    },
    linkedin:{
      type: String
    }
},
  {
    timestamps: true, //fecha de creacion y modificacion
    versionKey: false //quita el _V
  })

  module.exports = mongoose.model('aliados',aliadosSchema)
