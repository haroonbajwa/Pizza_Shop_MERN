import React, { useState, useEffect } from 'react';

const Registerscreen = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');

  const register = () => {
    if(cPassword != password){
      alert("Password not matched!");
    } else{
      const user={
        name,
        email,
        password
      }
      console.log(user);
    }
  }

  return <div>
    <div className="row justify-content-center">
      <div className="col-md-5 mt-5 text-start">
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

          <button onClick={register} className="btn btn-danger mt-3">REGISTER</button>
        </div>

      </div>
    </div>
  </div>;
};

export default Registerscreen;
