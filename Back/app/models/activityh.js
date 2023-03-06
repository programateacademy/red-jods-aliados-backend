const mongoose = require('mongoose');

const aliadosSchema = new mongoose.Schema({

    activity_history:{
      type: String
    },
    date:{
      type: String
    },
    type_activity:{
      type: String
    },
    name:{
      type: String
    },

     organizer: {
      type: String,
    },
    description:{
      type: String,
    }
},
  {
    timestamps: true, //fecha de creacion
    versionKey: false //quita el _V
  })

  module.exports = mongoose.model('aliados',aliadosSchema)
