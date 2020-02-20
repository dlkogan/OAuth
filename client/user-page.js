import React from 'react'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom';
import { logOut } from './store';

const UserPage = (props) => {
  const {handleClick} = props

  if (props.user.id){
    return (
      <div className='h100 w100 flex column align-items-center justify-center'>
        <div className='flex'>
          <img className='rounded mr1' src={props.user.imageUrl} />
          <h1>Welcome back, {props.user.email}!</h1>
        </div>
        <div>
          <button className='btn bg-red white p1 rounded' onClick={handleClick}>Logout</button>
        </div>
      </div>
    )
  }
  else {
    return (
      <Redirect to="/" />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  // Hey, check it out! Because we pass the connected UserPage to a Route
  // (we do this in client/index.js), it receives the "route props"
  // (match, location, and history) as its "own props".
  const history = ownProps.history

  return {
    async handleClick () {
      await dispatch(logOut());
      history.push('/login')
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPage)
