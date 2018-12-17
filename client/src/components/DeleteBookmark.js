import React from 'react';
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";

const DELETE_BOOKMARK = gql`
  mutation DeleteBookmark($content_id: Int!) {
    deleteBookmark(content_id: $content_id) 
  }
`

export default () => {
  let input 
  return (
    <Mutation mutation={DELETE_BOOKMARK} onCompleted={() => window.location.href="/list" }>
      {(deleteBookmark, { data, loading, error }) => (
        <div>
          <div className='w-100 pa4 flex justify-center'>
            <form
              onSubmit={e => {
                e.preventDefault();
                deleteBookmark({ variables: {
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

            <button type="submit">Delete Bookmark</button>
            </form>
          </div>
        </div>
      )}
    </Mutation>
  )
};