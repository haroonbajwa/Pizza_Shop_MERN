import React from 'react'

const Success = ({ success }) => {
  return (
    <div className="alert alert-success" role="alert">
        {success}
    </div>
  )
}

export default Success