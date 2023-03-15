const { httpError } = require('../helpers/handleError') //funcion sirve para captar erorres
const nameModel = require('../models/name') //importando modelo recien creado

const getitems = async (req, res) =>{ //se crea una funcion acincrona para obtener una respuesta de la base de datos
  try {
    const listAll = await nameModel.find({})
    res.send(listAll)
  } catch (e) {
    httpError(res,e)
  }
}

const getitem = async(req, res) =>{
  try {
    const itemId = req.params.id;
    const item = await nameModel.findById(itemId);
    if (!item) {
      return res.status(404).send({ message: 'Item not found' });
    }
    res.send({ data: item });
  } catch (e) {
    httpError(res, e);
  }
}

const newCharacter = async (req, res) => {
  try {
    const {
      organization,
      ODS,
      img,
      phone,
      email,
      respnsible,
      eje,
      description,
      objetives,
      date_start,
      date_end,
      resource,
      status,
      addres,
      twitter,
      ig,
      fb,
      linkedin
    } = req.body

    const Resttype = await nameModel.create({
      organization,
      ODS,
      img,
      phone,
      email,
      respnsible,
      eje,
      description,
      objetives,
      date_start,
      date_end,
      resource,
      status,
      addres,
      twitter,
      ig,
      fb,
      linkedin
    })

    res.send({ data: Resttype })
  } catch (e) {
    httpError(res, e)
  }
}


const editAlly = async (req, res) =>{ //se crea una funcion acincrona para obtener una respuesta de la base de datos
  try {
    const result = await nameModel.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
    res.send({ data: result})
  } catch (e) {
    httpError(res,e)
  }
}

const deleteAlly = async (req, res) =>{
  try {
    const itemId = req.params.id;
    const item = await nameModel.findByIdAndDelete(itemId);
    if (!item) {
      return res.status(404).send({ message: 'Item not found' });
    }
    res.send({ data: item });
  } catch (e) {
    httpError(res, e);
  }
}



module.exports= {getitems, getitem, newCharacter, editAlly, deleteAlly}
