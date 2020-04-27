import model from '../models/index';

const { Client, History } = model;

class Clients {
  static async add(request, res) {
    const { client, project, department, estimate, budget, start_date } = request.body
    try {
      const order = await Client
      .create({
        client,
        project,
        department,
        estimate,
        budget,
        start_date,
        user_id: request.user.id,
      })
      return {
        id: order.id,
        project: order.project,
        department: order.department,
        estimate: order.estimate,
        budget: order.budget,
        start_date: order.start_date,
      }
    } catch(err){
      return null
    }
  }

  static async list(req, res) {
    return Client
      .findAll({
        where:{}})
      .then(orders => res.status(200).send(orders));
  }

  static async update(req, res) {
    const { client, project, department, estimate, budget, start_date } = req.body
    try{ 
      const order = await Client.findOne({where: {id: req.params.id }})
        if (!order) throw new Error()
        const updatedOrder = order.update({
          client: client || order.client,
          project: project || order.project,
          department: department || order.department,
          estimate: estimate || order.estimate,
          budget: budget || order.budget,
          start_date: start_date || order.start_date
        })
        res.status(200).send({
          message: 'Order successfully update',
          data: updatedOrder
        })
    } catch(err) {
      return res.status(400).send({
      message: 'Order Not Update',
      });         
    } 
  }   
  static async delete(req, res) {
    try{ 
      await Client
      .destroy({
        where:{id: req.params.id}
      })
      res.status(200).send({
        message: 'Order successfully deleted'
      })
    }catch(err) {
      console.log(err)
      return res.status(400).send({
      message: 'Order Not Found',
      });
    }    
  }

  static async show(req, res) {
    try{ 
      const newOrder = await Client.findOne({where:{id: req.params.id}})
      res.status(200).json({
        order: newOrder
      })
    }catch(err) {
      return res.status(400).send({
      message: 'Order Not Found',
      });
    }    
  } 

  static async create(request, response) {
    const { date, action, order_id } = request.body
    try {
      const history = await History
      .create({
        date,
        action,
        order_id,
        user_id: request.user.id
      })
      return {history}
    } catch(err){
      return null
    }
  }

  static async table(req, res) {
    return History
      .findAll({
        where:{}})
      .then(histories => res.status(200).send(histories));
  }
}

export default Clients 