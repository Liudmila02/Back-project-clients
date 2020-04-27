import passport from 'passport'
import Users from '../controllers/user'
import Clients from '../controllers/client'
import { validateRegisterForm, validateClientsForm } from '../validator'

var { Router } = require('express');
var router = new Router();

module.exports = function (app) {
  app.post('/users', async (req, res) => {
    const validationResult = validateRegisterForm(req.body)
    if (Object.keys(validationResult).length) return res.status(500).json(validationResult)
    const user = await Users.signUp(req)
    if (!user) {
      return res.status(401).json({
        message: "bad request"
      })
    }
    return res.status(200).json(user)
  });

  app.post('/login', async (req, res, next) => {
    passport.authenticate('local', function (err, user, info) {
      if (!user) {
        return res.status(401).json({
          message: "not found"
        })
      }
      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }
        return res.status(200).json({
          user
        })
      });
    })(req, res, next);
  })

  app.get('/signout', async (req, res) => {
    req.session.destroy(function (err) {
      req.user = null;
      return res.status(200).json({ message: 'user successfully signed out with account' })
    });
  });

  app.post('/clients', isAuthenticated, async (request, res, next) => {
    const validationClients = validateClientsForm(request.body)
    if (Object.keys(validationClients).length) return res.status(500).json(validationClients)
    const order = await Clients.add(request, res)
    if (!order) {
      return res.status(401).json({
        message: "bad request"
      })
    }
    return res.status(200).json(order)
  });

  app.get('/client/:id', isAuthenticated, Clients.show);

  app.put('/client/:id', async (req, res) => {
    const order = await Clients.update(req, res)
    if (!order) {
      return res.status(401).json({
        message: "bad request"
      })
    }
    return res.status(200).json(order)
  })

  app.get('/orders', isAuthenticated, Clients.list);

  app.delete('/client/:id', isAuthenticated, Clients.delete);

  app.post('/history', isAuthenticated, async (request, response, next) => {
    const history = Clients.create(request, response)
    if (!history) {
      return response.status(401).json({
        message: "bad request"
      })
    }
    return response.status(200).json(history)
  });

  app.get('/histories', Clients.table);
}

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({
    error: "User not authenticated"
  });
}