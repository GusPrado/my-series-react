import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

const Genres = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    axios
      .get('/api/genres')
      .then(res => {
        setData(res.data.data)
      })
  },[])

if (data.length === 0) {

  return (
    <div className="container">
      <h1>Genres</h1>
      <div className="alert alert-warning" role="alert">
        You don't have any previously created genre
      </div>
    </div>
  )
}

const renderLine = record => {
  return (
    <tr key={record.id}>
      <th scope="row">{record.id}</th>
      <td>{record.name}</td>
      <td>
          <button className="btn btn-danger" onClick={() => handleDelete(record.id)}>Delete</button>
          <Link to={`/genres/${record.id}`} className="btn btn-warning">Edit</Link>
      </td>
    </tr>
  )
}

const handleDelete = id => {
  axios
    .delete(`/api/genres/${id}`)
    .then(res => {
      const filter = data.filter(item => item.id !== id)
      setData(filter)
    })
}

  return (
  <div className="container">
    <h1>Genres</h1>
    <Link to="/genres/new" className="btn btn-primary">New genre</Link>
    <table className="table table-dark">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">NAME</th>
          <th scope="col">ACTIONS</th>
        </tr>
      </thead>
      <tbody>
        {data.map(renderLine)}
      </tbody>
  </table>
      
  </div>

  )
}

export default Genres