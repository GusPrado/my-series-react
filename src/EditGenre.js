import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'

const EditGenre = ({match}) => {
  const [name, setName] = useState("")
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    axios
      .get(`/api/genres/${match.params.id}`)
      .then(res => {
        setName(res.data.name)
      })
  }, [match.params.id])


  const handleChange = (event) => {
    setName(event.target.value)
  }

  const handleSave = () => {
    axios
        .put(`/api/genres/${match.params.id}`, {
          name
        })
        .then(res => {
          setSuccess(true)
        })
  }

if (success) {
  return <Redirect to='/genres' />
}

  return (
    <div className="container">
      <h1>Edit Genre</h1>
      <form>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input type="text" value={name} onChange={handleChange} className="form-control" id="name" placeholder="Enter genre name" />
      </div>
      <button type="button" onClick={handleSave} className="btn btn-primary">Save</button>
      </form>
    </div>
  )
}

export default EditGenre