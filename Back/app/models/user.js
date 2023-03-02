const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
      type: String
    },
    username:{
      type: String
    },
    email:{
      type: String
    },
    pass:{
      type: String
    },
    status:{
      type: String
    },
    failedLoginAttempts: {
      type: Number,
      default: 0
    },
    role:{
      type: String,
      default: "user"
    }
},
  {
    timestamps: true, //fecha de creacion
    versionKey: false //quita el _V
  })

  module.exports = mongoose.model('user',userSchema)
