import React from 'react';
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import '../App.css';
import auth from '../Auth';

const LIST_BOOKMARKS = gql`
  query AllBookmarks {
    bookmarks {
      _id
      application_id
      user_id
      content_id
      date
    }
  }
`

export default () => (
  <Query query={LIST_BOOKMARKS}>
    {({ loading, error, data }) => {
      if (loading) return (<p>Loading...</p>);
      if (error) return (<p>Error... { error.message }</p>);
      
      return (
        <div className="col-sm-12">
          {!loading &&
            data.bookmarks.map(bookmark => (
            <div className="col-sm-4" key={bookmark._id}>
              <div className='pa3 bg-black-05 ma3'>
                <div className='bookmark'>
                  <p>{ bookmark._id }</p>
                  <p>{ bookmark.application_id }</p>
                  <p>{ bookmark.user_id }</p>
                  <p>{ bookmark.content_id }</p>
                  <p>{ bookmark.date }</p>
                </div>
              </div>
            </div>
            ))}
        </div>
      );
    }}
  </Query>
);
