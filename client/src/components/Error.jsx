import React from 'react'

const Error = ({ error }) => {
  return (
    <div class="alert alert-danger" role="alert">
        {error}
    </div>
  )
}

export default Error