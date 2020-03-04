const User = require('../models/User')
const auth = require('../middleware/auth')
const user = {
    users: async (req, res) => {
        try {
            const user = new User(req.body)
            await user.save()
            const token = await user.generateAuthToken()
            const { name, email, tokens } = user
            res.status(201).send({ name, email, tokens, token })
        } catch (error) {
            res.status(400).send({
                'message': error.message, 'stack': error.stack
            });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body
            const user = await User.findByCredentials(email, password)
            if (!user) {
                return res.status(401).send({ error: 'Login failed! Check authentication credentials' })
            }
            const token = await user.generateAuthToken()
            res.status(201).send({ user, token })
        } catch (error) {
            res.status(400).send({
                'message': error.message, 'stack': error.stack
            });
        }
    },

    me: async (req, res) => {
        // View logged in user profile
        res.send(req.user)
    },

    search: async (req, res) => {
        try {
            const { searchKey } = req.body;
            User.find({ 'name': new RegExp(searchKey, 'i') }, function (err, docs) {
                res.status(201).send({ docs })
            });
        } catch (error) {
            res.status(400).send({
                'message': error.message, 'stack': error.stack
            });
        }
    },

    logout: async (req, res) => {
        try {
            req.user.tokens = req.user.tokens.filter((token) => {
                return token.token != req.token
            })
            await req.user.save()
            res.status(201).send('You have been successfully logged out!')
        } catch (error) {
            res.status(500).send(error)
        }
    },

    logoutAll: async (req, res) => {
        // Log user out of all devices
        try {
            req.user.tokens.splice(0, req.user.tokens.length)
            await req.user.save()
            res.status(201).send('You have been successfully logged out from all session!')
        } catch (error) {
            res.status(500).send(error)
        }
    },

    delete: async (req, res) => {
        try {
            req.user.isDeleted = true;
            await req.user.save()
            res.status(201).send('User deleted successfully.')
        } catch (error) {
            res.status(500).send(error)
        }
    }

}

module.exports = user;