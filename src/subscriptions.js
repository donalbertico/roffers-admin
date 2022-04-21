/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateOffer = /* GraphQL */ `
  subscription OnCreateOffer {
    onCreateOffer {
      id
      sellerID
      expires
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateOffer = /* GraphQL */ `
  subscription OnUpdateOffer {
    onUpdateOffer {
      id
      sellerID
      expires
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteOffer = /* GraphQL */ `
  subscription OnDeleteOffer {
    onDeleteOffer {
      id
      sellerID
      expires
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateSeller = /* GraphQL */ `
  subscription OnCreateSeller($owner: String) {
    onCreateSeller(owner: $owner) {
      id
      name
      Offers {
        items {
          id
          sellerID
          expires
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      owner
      verified
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateSeller = /* GraphQL */ `
  subscription OnUpdateSeller($owner: String) {
    onUpdateSeller(owner: $owner) {
      id
      name
      Offers {
        items {
          id
          sellerID
          expires
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      owner
      verified
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteSeller = /* GraphQL */ `
  subscription OnDeleteSeller($owner: String) {
    onDeleteSeller(owner: $owner) {
      id
      name
      Offers {
        items {
          id
          sellerID
          expires
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      owner
      verified
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
