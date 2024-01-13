import React, {useContext, useEffect} from 'react'
import noteContext from '../context/notes/noteContext'

export const About = () => {

  const a = useContext(noteContext)
  useEffect(() => {
    a.update();
    // eslint-disable-next-line
  }, [])
  
  return (
    <div>This is the About {a.state.name} and class is {a.state.class}</div>
  )
}
