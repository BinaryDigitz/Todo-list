import React from 'react'

function Loading({error}) {
  return (
    <div className='grid place-items-center h-[70dvh] bg-red-50 text-center'>
        <div>
            <h1 className="heading3 text-neutral-800 my-2">{error.statusCode}</h1>
            <p className='heading4 text-red-900'>{error.message.toUpperCase()}</p>
            <p className='text-indigo-900'>Please try again later</p>
        </div>
      
    </div>
  )
}

export default Loading
