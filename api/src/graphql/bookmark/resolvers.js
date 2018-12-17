const { AuthenticationError } = require('apollo-server');
const Bookmark = require('../../models/bookmark.model');

exports.resolvers = {
  Query: {
    bookmarks: async (_, { }, { tokenDecoded, clientId }) => {
      try {
        // Get the jwt token decoded from ApolloServer context. 
        const user = await tokenDecoded; 

        const filter = {
          application_id: clientId,
          user_id: user.sub
        }

        const bookmarks = Bookmark.find(filter, function (err, result) {
          if (err) throw new Error(err);
          return result;
        })

        return bookmarks;
      }
      catch(e) {
        throw new AuthenticationError('You must be logged in. Error: ' + e.message);
      }
    },
  },
  Mutation: {
    addBookmark: async (_, { content_id }, { tokenDecoded, clientId }) => {
      try {
        // Get the jwt token decoded from ApolloServer context. 
        const user = await tokenDecoded;

        const application_id = clientId;
        const user_id = user.sub;

        const _id = application_id + '.' +  user_id + '.' + content_id

        let date = new Date();
        let timestamp = date.getTime();

        const newBookmark = {
          _id,
          application_id,
          user_id,
          content_id,
          date: timestamp
        };

        Bookmark.create(newBookmark, function(err, result){
          if (err)
            // Do not need to throw an error if it's duplicated. Just send a message. 
            if (err.code === 11000 ) return {"message": "Duplicated bookmark id."};
            else throw new Error(err); 
        });

        return newBookmark;
      }
      catch(e) {
        throw new AuthenticationError('You must be logged in. Error: ' + e.message);
      } 
    },
    deleteBookmark: async (_, { content_id }, { tokenDecoded, clientId }) => {
      try {
        // Get the jwt token decoded from ApolloServer context.
        const user = await tokenDecoded;
        const application_id = clientId;
        
        const user_id = user.sub;

        const bookmark_id = application_id + '.' +  user_id + '.' + content_id;

        const bookmark = {
          _id: bookmark_id
        };

        Bookmark.deleteOne(bookmark, function(err, result){
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
