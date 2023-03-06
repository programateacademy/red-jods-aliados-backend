const { httpError } = require('../helpers/handleError') //funcion sirve para captar erorres
const activityhModel = require('../models/activityh') //importando modelo recien creado

const items = async (req, res) =>{ //se crea una funcion acincrona para obtener una respuesta de la base de datos
  try {
    const listAll = await activityhModel.find({})
    res.send(listAll)
  } catch (e) {
    httpError(res,e)
  }
}

const newActivity = async (req, res) =>{ //se crea una funcion acincrona para obtener una respuesta de la base de datos
  try {
    const {activity_history, date, type_activity, name, organizer, description} = req.body
    const Resttype = await activityhModel.create ({activity_history, date, type_activity, name, organizer, description})
    res.send({ data: Resttype})
  } catch (e) {
    httpError(res,e)
  }
}

const editActivity = async (req, res) =>{ //se crea una funcion acincrona para obtener una respuesta de la base de datos
  try {
    const result = await activityhModel.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
    res.send({ data: result})
  } catch (e) {
    httpError(res,e)
  }
}

const deleteActivity = async (req, res) =>{
  try {
    const itemId = req.params.id;
    const item = await activityhModel.findByIdAndDelete(itemId);
    if (!item) {
      return res.status(404).send({ message: 'Item not found' });
    }
    res.send({ data: item });
  } catch (e) {
    httpError(res, e);
  }
}



module.exports= {items, newActivity, editActivity, deleteActivity}
