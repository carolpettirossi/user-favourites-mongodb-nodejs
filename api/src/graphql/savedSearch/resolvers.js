const { AuthenticationError } = require('apollo-server');
const SavedSearch = require('../../models/savedSearch.model');

exports.resolvers = {
  Query: {
    savedSearches: async (_, { }, { tokenDecoded, clientId }) => {
      try {
        // Get the jwt token decoded from ApolloServer context. 
        const user = await tokenDecoded; 

        const filter = {
          application_id: clientId,
          user_id: user.sub
        }

        const savedSearches = SavedSearch.find(filter, function (err, result) {
          if (err) throw new Error(err);
          return result;
        })

        return savedSearches;
      }
      catch(e) {
        throw new AuthenticationError('You must be logged in. Error: ' + e.message);
      }
    },
  },
  Mutation: {
    addSavedSearch: async (_, { search_path, name }, { tokenDecoded, clientId }) => {
      try {
        // Get the jwt token decoded from ApolloServer context. 
        const user = await tokenDecoded;

        const application_id = clientId;
        const user_id = user.sub;

        let date = new Date();
        let timestamp = date.getTime();

        // Since users can add the same search_path with same names, 
        // we need to use timestamp to ensure that the id is unique.
        const _id = application_id + '.' +  user_id + '.' + search_path + '.' + timestamp;
    
        const newSavedSearch = {
          _id,
          application_id,
          user_id,
          search_path,
          name,
          date: timestamp
        };

        SavedSearch.create(newSavedSearch, function(err, result){
          if (err) throw new Error(err);
        });

        return newSavedSearch;
      }
      catch(e) {
        throw new AuthenticationError('You must be logged in. Error: ' + e.message);
      } 
    },
    deleteSavedSearch: async (_, { _id }, { tokenDecoded, clientId }) => {
      try {
        // Get the jwt token decoded from ApolloServer context.
        const user = await tokenDecoded;
        
        const application_id = clientId;
        const user_id = user.sub;

        // We add application_id and user_id to ensure that the user is trying
        // to delete a saved_search associated with them and for the application 
        // they are logged to.
        const savedSearch = {
          _id,
          application_id,
          user_id
        };

        SavedSearch.deleteOne(savedSearch, function(err, result){
          if (err) throw new Error(err);
        });

        return true;
      }
      catch(e) {
        throw new AuthenticationError('You must be logged in. Error: ' + e.message);
      } 
    }
  },
};
