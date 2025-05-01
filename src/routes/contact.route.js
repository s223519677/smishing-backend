const express = require('express')
const router = express.Router()
const contactController = require('../controllers/contact.controller')

// POST /
router.post('/', contactController.addContact)

// GET /
router.get('/:userId', contactController.getContacts)

// PUT /
router.put('/:id', contactController.updateContact)

// DELETE /
router.delete('/:id', contactController.deleteContact)

module.exports = router
