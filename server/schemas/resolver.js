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

            const corrPass = await user.isCorrectPassword(password)
            if (!user || !corrPass) {
                throw new AuthenticationError("Incorrect credentials")
            }
            const token = signToken(user)
            return { token, user }
        },
        saveBook: async (parent, { bookData }, context) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { savedBooks: bookData } },
                    { new: true }
                );

                return updatedUser;
            }

            throw new AuthenticationError('You need to be logged in!');
        },
        removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId } } },
                    { new: true }
                );

                return updatedUser;
            }

            throw new AuthenticationError('You need to be logged in!');
        },
    }
}

module.exports = resolvers