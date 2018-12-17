import React from 'react';
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";

const DELETE_SAVED_SEARCH = gql`
  mutation DeleteSavedSearch($saved_search_id: String!) {
    deleteSavedSearch(_id: $saved_search_id) 
  }
`

export default () => {
  let input 
  return (
    <Mutation mutation={DELETE_SAVED_SEARCH} onCompleted={() => window.location.href="/list-saved-searches" }>
      {(deleteSavedSearch, { data, loading, error }) => (
        <div>
          <div className='w-100 pa4 flex justify-center'>
            <form
              onSubmit={e => {
                e.preventDefault();
                deleteSavedSearch({ variables: {
                  saved_search_id: input.value,
                }});

                input.value = "";
              }}
            >
            
            <div style={{ maxWidth: 400 }} className=''>
              <label> Content ID: </label>
              <input
                ref={node => {
                  input = node;
                }}
              />
            </div>

            {loading && <p>Loading...</p> }
            {error && <p>Error :( Please try again</p>}

            <button type="submit">Delete Saved Search</button>
            </form>
          </div>
        </div>
      )}
    </Mutation>
  )
};