import React from 'react';
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";

const ADD_SAVED_SEARCH = gql`
  mutation CreateSavedSearch($search_path: String!, $name : String!) {
    addSavedSearch(search_path: $search_path, name: $name) {
      application_id
      user_id
      date
    }
  }
`

export default () => {
  let input; 
  let input2;
  return (
    <Mutation mutation={ADD_SAVED_SEARCH} onCompleted={() => window.location.href="/list-saved-searches" }>
      {(addSavedSearch, { data, loading, error }) => (
        <div>
          <div className='w-100 pa4 flex justify-center'>
            <form
              onSubmit={e => {
                e.preventDefault();
                addSavedSearch({ variables: {
                  search_path: input.value,
                  name: input2.value,
                }});

                input.value = "";
                input2.value = "";
              }}
            >
            
            <div style={{ maxWidth: 400 }} className=''>
              <div>
                <label> Search Path: </label>
                <input
                  ref={node => {
                    input = node;
                  }}
                />
              </div>
              <div>
                <label> Search Name: </label>
                <input
                  ref={node => {
                    input2 = node;
                  }}
                />
              </div>
            </div>

            {loading && <p>Loading...</p> }
            {error && <p>Error :( Please try again</p>}

            <button type="submit">Save Search</button>
            </form>
          </div>
        </div>
      )}
    </Mutation>
  )
};