const { User, Book } = require('../models');
const { AuthenticationError } = require('apollo-server-express')
const { signToken } = require('../utils/auth')
const resolvers = {
    Query: {

    },
    Mutation: {
        createUser: async (parent, args) => {
            const user = await User.create(args);
            return user;
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne()//based off what?

            const corrPass = await user.isCorrectPass(password)
            if (!user || !corrPass) {
                throw new AuthenticationError("Incorrect credentials")
            }
            const token = signToken(user)
            return { token, user }
        },
        saveBook: async (parent, args, context) => {
            if (context.user) {
                const saveBook = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: args.input } },
                    { new: true }
                );
                return saveBook
            }

        },
        deleteBook: async (parent, args) => {
            const bookData = await Book.destroy(args)
            return bookData
        }
    }
}

module.exports = resolvers