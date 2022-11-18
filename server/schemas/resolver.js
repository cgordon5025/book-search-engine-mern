const { User, Book } = require('../models');
const { AuthenticationError } = require('apollo-server-express')
const { signToken } = require('../utils/auth')
const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id })
            }
            throw new AuthenticationError('need to be logged in')
        }
    },
    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user)
            return { user, token };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email })//based off what?

            const corrPass = await user.isCorrectPass(password)
            if (!user || !corrPass) {
                throw new AuthenticationError("Incorrect credentials")
            }
            const token = signToken(user)
            return { token, user }
        },
        saveBook: async (parent, { userId, book }, context) => {
            if (context.user) {
                const saveBook = await User.findByIdAndUpdate(
                    { _id: context.userId },
                    { $addToSet: { savedBooks: book } },
                    { new: true }
                );
                return saveBook
            }
            throw new AuthenticationError("you're not logged in")

        },
        removeBook: async (parent, { book }, context) => {
            if (context.user) {
                const bookData = await Book.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: book } }
                )

            }
            throw new AuthenticationError("you're not logged in")

        }
    }
}

module.exports = resolvers