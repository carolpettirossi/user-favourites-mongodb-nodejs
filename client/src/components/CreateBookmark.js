import React from 'react';
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";

const ADD_BOOKMARK = gql`
  mutation CreateBookmark($content_id: Int!) {
    addBookmark(content_id: $content_id) {
      application_id
      user_id
      content_id
      date
    }
  }
`

export default () => {
  let input 
  return (
    <Mutation mutation={ADD_BOOKMARK} onCompleted={() => window.location.href="/list" }>
      {(addBookmark, { data, loading, error }) => (
        <div>
          <div className='w-100 pa4 flex justify-center'>
            <form
              onSubmit={e => {
                e.preventDefault();
                addBookmark({ variables: {
                  content_id: parseInt(input.value),
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

            <button type="submit">Add Bookmark</button>
            </form>
          </div>
        </div>
      )}
    </Mutation>
  )
};