import React from 'react';
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import '../App.css';
import auth from '../Auth';

const LIST_SAVED_SEARCHES = gql`
  query AllSavedSearches {
    savedSearches {
      _id
      application_id
      user_id
      search_path
      name
      date
    }
  }
`

export default () => (
  <Query query={LIST_SAVED_SEARCHES}>
    {({ loading, error, data }) => {
      if (loading) return (<p>Loading...</p>);
      if (error) return (<p>Error... { error.message }</p>);
      
      return (
        <div className="col-sm-12">
          {!loading &&
            data.savedSearches.map(savedSearch => (
            <div className="col-sm-12" key={savedSearch._id}>
              <div className='pa3 bg-black-05 ma3'>
                <div className='savedSearch'>
                  <p><strong>Id:</strong> { savedSearch._id }</p>
                  <p><strong>Application id:</strong>{ savedSearch.application_id }</p>
                  <p><strong>User Id:</strong>{ savedSearch.user_id }</p>
                  <p><strong>Search path:</strong>{ savedSearch.search_path }</p>
                  <p><strong>Search Name:</strong>{ savedSearch.name }</p>
                  <p><strong>Date:</strong>{ savedSearch.date }</p>
                </div>
              </div>
            </div>
            ))}
        </div>
      );
    }}
  </Query>
);
