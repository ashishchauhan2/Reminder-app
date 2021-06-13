const express = require('express');
const router = express.Router();
const controllers = require('./../controllers/controllers');

router.post('/reminder',   (req, res) => controllers.createReminder(req,res));
router.get('/reminder/:id',  (req, res) => controllers.reminderDetail(req,res));
router.put('/reminder/:id',  (req, res) => controllers.updateReminder(req,res));
router.delete('/reminder/:id',  (req, res) => controllers.deleteReminder(req,res));
router.get('/reminders-list',  (req, res) => controllers.remindersList(req,res));
module.exports = router;