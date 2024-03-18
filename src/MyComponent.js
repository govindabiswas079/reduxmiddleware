import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment, selectCount } from './store/counterSlice';

const MyComponent = () => {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();

  return (
    <Fragment>
      <div>
        <button onClick={() => dispatch(increment())}>Increment</button>
        <span>{count}</span>
        <button onClick={() => dispatch(decrement())}>Decrement</button>
      </div>
    </Fragment>
  )
}

export default MyComponent