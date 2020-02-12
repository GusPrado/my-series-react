import React, {useState} from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'

const NewSerie = () => {
  const [name, setName] = useState("")
  const [success, setSuccess] = useState(false)

  const handleChange = (event) => {
    setName(event.target.value)
  }

  const handleSave = () => {
    axios
        .post('/api/series', {
          name
        })
        .then(res => {
          setSuccess(true)
        })
  }

if (success) {
  return <Redirect to='/series' />
}

  return (
    <div className="container">
      <h1>New Serie</h1>
      <form>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input type="text" value={name} onChange={handleChange} className="form-control" id="name" placeholder="Enter serie name" />
      </div>
      <button type="button" onClick={handleSave} className="btn btn-primary">Save</button>
      </form>
    </div>
  )
}

export default NewSerie