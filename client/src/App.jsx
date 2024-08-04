import { useState, React } from 'react'
import ListHeader from './components/ListHeader'


function App() {
  const [count, setCount] = useState(0)

  return (
   <div className='app'>
    <ListHeader listName={'Holiday Tick List'}/>
   </div>
  )
}

export default App
