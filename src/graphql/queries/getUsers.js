import { gql } from '@apollo/client';

export default gql`
  query getUsers($ids: [ObjectId]!) {
    getUsers(ids: $ids) {
      name
      email
      rollNo
      _id
      uid
      fcmToken
      name
      # quizzes {
      #   _id
      #   name
      # }
    }
  }
`;
