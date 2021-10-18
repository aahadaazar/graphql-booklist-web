import gql from "graphql-tag";

const getBooksQuery = gql`
{
  books{
    name
    id
  }
}
`


const getAuthorsQuery = gql`
{
  authors{
    name
    id
  }
}
`

const addBookMutation = gql`
mutation($name:String!,$genre:String!,$authorId:String!){
  addBook(name:$name, genre:$genre , authorId:$authorId){
    name
    genre
  }
}
`

const getBookDetails = gql`
query($id: ID!) {
  book(id: $id) {
    name
  author{
    name
  }
  }
}
`

export { getBooksQuery, getAuthorsQuery, addBookMutation,getBookDetails };