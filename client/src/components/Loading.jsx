import React from 'react'

const Loading = () => {
  return (
    <div className="d-flex justify-content-center">
        <div class="spinner-grow text-danger" role="status" style={{height:'100px',width:'100px'}}>
            <span class="sr-only">Loading...</span>
        </div>
    </div>
    
  )
}

export default Loading