import { useState, React  } from 'react'


function ListHeader(props) {
  const [count, setCount] = useState(0)

  function signOut(){
    console.log("SignOut")
  }

  return (
    <div className='list-header'>
        <h1>{props.listName}</h1>
        <div className='button-container'>
          <button className='create'>ADD NEW</button>
          <button className='signout' onClick={signOut}>SIGN OUT</button>
        </div>
    </div>
  )
}

export default ListHeader
