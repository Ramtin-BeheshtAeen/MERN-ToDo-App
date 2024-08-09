import { useEffect, useState, React } from 'react'
import ListHeader from './components/ListHeader'
import ListItem from './components/ListItem'

function App() {
  
  const userId = "66b5e7e4de8cd33172512479"
  const [task, setTask] = useState(null)

  async function getData(){
    try{
      const response = await fetch(`http://localhost:8000/todo/${userId}`)
      const json = await response.json()
      setTask(json)
      
    } catch(err) {
      console.log(err)
    }
  }

  useEffect( () => getData, [])

  //Sort Tasks By Date:
  // if they exist:
  const sortedTasks = task?.sort( (a, b) => new Date(a.date) - new Date(b.date) ) 

  return (
   <div className='app'>
    <ListHeader listName={'Holiday Tick List'}/>
    {sortedTasks?.map( (task) => <listItem key={task.id} task={task} />)}
   </div>
  )
}

export default App
