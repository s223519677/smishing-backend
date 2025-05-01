const User = require('../models/user.model')
const Contact = require('../models/contact.model')

exports.addContact = async (req, res) => {
    try {
        const { userId, name, phoneNumber, email } = req.body

        // Verify user exists
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        const contact = new Contact({
            user: userId,
            name,
            phoneNumber,
            email,
        })

        await contact.save()
        res.status(201).json(contact)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find({
            user: req.params.userId,
        }).populate('user', 'fullName email')
        res.json(contacts)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.updateContact = async (req, res) => {
    try {
        const { name, phoneNumber, email, relationship } = req.body

        const contact = await Contact.findById(req.params.id)
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' })
        }

        contact.name = name || contact.name
        contact.phoneNumber = phoneNumber || contact.phoneNumber
        contact.email = email || contact.email
        contact.relationship = relationship || contact.relationship

        await contact.save()
        res.json(contact)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id)
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' })
        }

        await contact.deleteOne()
        res.json({ message: 'Contact deleted successfully' })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
