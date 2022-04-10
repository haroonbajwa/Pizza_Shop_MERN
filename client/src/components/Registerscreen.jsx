import React, { useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { registerUser } from '../actions/userActions';
import Loading from './Loading';
import Success from './Success';
import Error from './Error';

const Registerscreen = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');

  const registerState = useSelector(state => state.registerUserReducer);
  const { error, loading, success } = registerState;

  const dispatch = useDispatch();

  const register = () => {
    if(cPassword !== password){
      alert("Password not matched!");
    } else{
      const user={
        name,
        email,
        password
      }
      console.log(user);
      dispatch(registerUser(user));
    }
  }

  return <div>
    <div className="row justify-content-center">
      <div className="col-md-5 mt-5 text-start shadow p-3 mb-5 bg-white rounded">

        {loading && <Loading />}
        {success && <Success success="User Registered Successfully!" />}
        {error && <Error error="User Already Registered!" />}

        <h2 className="text-center m-3" style={{ fontSize: '35px' }}>Register</h2>
        <div>
          <input 
            type="text" 
            placeholder="Name" 
            className="form-control"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            />
          <input 
            type="text" 
            placeholder="Email" 
            className="form-control"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
          <input 
            type="text" 
            placeholder="Password" 
            className="form-control"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
          <input 
            type="text" 
            placeholder="Confirm Password" 
            className="form-control"
            required
            value={cPassword}
            onChange={(e) => setCPassword(e.target.value)}
            />

          <button onClick={register} className="btn btn-danger my-3">REGISTER</button>
          <br/>
          <a href="/login" className="text-black text-decoration-none">Click here to Login</a>
        </div>

      </div>
    </div>
  </div>;
};

export default Registerscreen;
