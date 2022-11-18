const { gql } = require('apollo-server-express')

const typeDefs = gql`
type User{
    _id: ID,
    username:String,
    email:String,
    password:Strings,
    savedBooks:[String]!
}
type Auth{
    token: ID!,
    user:User
}

type Query {
    users:[User]!,
    user(userId:ID!):User
    me: User
}

type Mutation {
    addUser(username:String!, email:String!,password:String!):Auth
    login(email:String!, password:String!):Auth
    
    saveBook(userId:ID!, book:String!):User
    removeBook(savedBooks:String!):User
}
`

module.exports = typeDefs;