import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import {Badge} from 'reactstrap'

const InfoSerie = ({ match }) => {
  const [form, setForm] = useState({
    name: '',
    comments: ''
  })
  const [success, setSuccess] = useState(false)
  const [mode, setMode] = useState('INFO')
  const [genres, setGenres] = useState([])
  const [genreId, setGenreId] =  useState('')

  const [data, setData] = useState({})
  useEffect(() => {
    
    axios
      .get(`/api/series/${match.params.id}`)
      .then(res => {
        setData(res.data)
        setForm(res.data)
      })
  }, [match.params.id])

  useEffect(() => {
    axios
    .get('/api/genres')
    .then(res => {
      setGenres(res.data.data)
      const genres = res.data.data
      const found = genres.find(value => data.genre === value.name)
      if (found) {
        setGenreId(found.id)
      }
    })
  },[data])

  // custom header
  const masterHeader = {
    height: '50vh',
    minHeight: '500px',
    backgroundImage: `url('${data.background}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }

  const handleChange = field => event => {
    setForm({
      ...form,
      [field]: event.target.value
    })
  }

  const handleChangeGenre = event => {
    setGenreId(event.target.value)
  }

  const handleSelect = value => () => {
    setForm({
      ...form,
      status: value
    })
  }

  const handleSave = () => {
    axios
        .put(`/api/series/${match.params.id}`, {
          ...form,
          genre_id: genreId
        })
        .then(res => {
          setSuccess(true)
        })
  }

if (success) {
  return <Redirect to='/series' />
}

  return (

    <div>
      <header style={masterHeader}>
        <div className="h-100" style={{ background: 'rgba(0,0,0,0.7)' }}>
          <div className="h-100 container">
            <div className="row h-100 align-items-center">
              <div className="col-3">
                <img className="img-fluid img-thumbnail" src={data.poster} alt={data.name}/>
              </div>
              <div className="col-8">
                <h1 className="font-weight-light text-white">{data.name}</h1>
                <div className="lead text-white">
                  { data.status === 'WATCHED' && <Badge color="success">watched</Badge> }
                  { data.status === 'TO_WATCH' && <Badge color="warning">to watch</Badge> }
                  Genre:{data.genre}
                </div>   
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="container">
        <button onClick={() => setMode('EDIT')} className="btn btn-primary">Edit</button>
      </div>
      {
        mode === 'EDIT' &&
        <div className="container">
          <h1>{data.name}</h1>
          {/* <pre>{JSON.stringify(form)}</pre> */}
          <button onClick={() => setMode('INFO')} className="btn btn-primary">Cancel</button>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" value={form.name} onChange={handleChange('name')} className="form-control" id="name" placeholder="Enter serie name" />
            </div>
            <div className="form-group">
              <label htmlFor="name">Comments</label>
              <input type="text" value={form.comments} onChange={handleChange('comments')} className="form-control" id="name" placeholder="Enter comments" />
            </div>
            <div className="form-group">
              <label htmlFor="name">Genres</label>
                <select className="form-control" onChange={handleChangeGenre} value={genreId} >
                  { genres.map(genre => <option key={genre.id} value={genre.id}>{genre.name}</option>)}
                </select>
            </div>
            <div className="form-check">
            <input className="form-check-input" type="radio" checked={form.status === 'WATCHED'} name="status" id="watched" value="WATCHED" onChange={handleSelect('WATCHED')} />
              <label className="form-check-label" htmlFor="WATCHED">
                Watched
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" checked={form.status === 'TO_WATCH'} name="status" id="toWatch" value="TO_WATCH" onChange={handleSelect('TO_WATCH')}/>
              <label className="form-check-label" htmlFor="toWatch">
                To watch
              </label>
          </div>
            <button type="button" onClick={handleSave} className="btn btn-primary">Save</button>
          </form>
        </div>
      }
      
    </div>
  )
}

export default InfoSerie