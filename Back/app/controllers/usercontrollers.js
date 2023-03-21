const { httpError } = require('../helpers/handleError')
const userModel = require('../models/user')

const getitems = async (req, res) =>{
  try {
    const listAll = await userModel.find({})
    res.send(listAll)
  } catch (e) {
    httpError(res,e)
  }
}

const getitem = async(req, res) =>{
  try {
    const itemId = req.params.id;
    const item = await userModel.findById(itemId);
    if (!item) {
      return res.status(404).send({ message: 'Item not found' });
    }
    res.send({ data: item });
  } catch (e) {
    httpError(res, e);
  }
}

const createitem = async (req, res) =>{
  try {
    const {name, email, pass, status, role} = req.body
    const resDetail = await userModel.create({
      name, username, email, pass, status, role
    })
    res.send({ data: resDetail})
  } catch (e) {
    httpError(res,e)
  }
}

const updateitem = async (req, res) =>{
  try {
    const itemId = req.params.id;
    const {name, email, pass, status, role} = req.body;
    const item = await userModel.findByIdAndUpdate(
      itemId,
      {name, username, email, pass, status, role},
      { new: true }
    );
    if (!item) {
      return res.status(404).send({ message: 'Item not found' });
    }
    res.send({ data: item });
  } catch (e) {
    httpError(res, e);
  }
}

const deleteitem = async (req, res) =>{
  try {
    const itemId = req.params.id;
    const item = await userModel.findByIdAndDelete(itemId);
    if (!item) {
      return res.status(404).send({ message: 'Item not found' });
    }
    res.send({ data: item });
  } catch (e) {
    httpError(res, e);
  }
}

module.exports= {getitem, getitems, createitem, updateitem, deleteitem}
