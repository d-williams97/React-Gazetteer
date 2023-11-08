import React from 'react';
import { useReducer } from 'react';

const Reduce = () => {

    const INITIAL_STATE = {
        loading: false,
        post: {},
        error: false
    }

    const postReducer = (state, action) => {
        switch (action.type) {
          case 'FETCH_START':
            return {
              loading: true,
              error: false,
              post: {},
            };
          case 'FETCH_SUCCESS':
            return {
              ...state,
              loading: false,
              post: action.payload,
            };
          case 'FETCH_ERROR':
            return {
              error: true,
              loading: false,
              post: {},
            };
          default:
            return state;
        }
      };


    const [state,dispatch] = useReducer(postReducer, INITIAL_STATE,) // // the state will be the INITIAL STATE


    const handleFetch = () => {
        dispatch({ type: 'FETCH_START'})
        fetch('https://jsonplaceholder.typicode.com/posts/1')
        .then((res) => res.json())
        .then((data) => {
            dispatch({type: 'FETCH_SUCCESS', payload:data})
        }). catch((err) => {
            dispatch({type: 'FETCH_ERROR'})
        })
    }


  return (
    <div>
    <button onClick={handleFetch}>
      {state.loading ? "Wait..." : "Fetch the post"}
    </button>
    <p>{state.post?.title}</p>
    <span>{state.error && "Something went wrong!"}</span>
  </div>
  )
}

export default Reduce