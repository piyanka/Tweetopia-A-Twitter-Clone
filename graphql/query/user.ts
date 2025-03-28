import { graphql } from "../../gql";

export const verifyUserGoogleTokenQuery = graphql(`#graphql
    query VerifyUserGoogleToken($token: String!){
        verifyGoogleToken(token: $token)
    }
`);


export const getCurrentUserQuery = graphql(`
    query GetCurrentUser {
        getCurrentUser {
          id 
          profileImageURL
          email
          firstName
          lastName
          tweets {
            id
            content
            author {
              id
              firstName 
              lastName
              profileImageURL
            }
          }
        }
    }
`);

export const getUserByIdQuery = graphql(`
  #graphql
  query GetuserById($id: ID!){
    getUserById(id: $id){
      id
      firstName
      lastName
      profileImageURL
      recommendedUsers {
        id
        firstName 
        lastName
        profileImageURL
      }
      followers {
        id 
        firstName
        lastName
        profileImageURL
      }
      following {
        firstName
        lastName
        profileImageURL
        id
      }
      tweets {
        content
        id
        imageURL
        author {
          id
          firstName
          lastName
          profileImageURL
        }
      }
    
    }
  
  
  }
  
  
  
  `)