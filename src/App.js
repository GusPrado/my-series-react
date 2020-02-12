import React from 'react'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import Header from './Header'
import Genres from './Genres'
import Series from './Series'
import NewGenre from './NewGenre'
import EditGenre from './EditGenre'
import NewSerie from './NewSerie'
import InfoSerie from './InfoSerie'




const Home = () => {
  return <h1>Home</h1>
}

function App() {
  
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/genres' exact component={Genres} />
          <Route path='/genres/new' exact component={NewGenre} />
          <Route path='/genres/:id' exact component={EditGenre} />
          <Route path='/series' exact component={Series} />
          <Route path='/series/new' exact component={NewSerie} />
          <Route path='/series/:id' exact component={InfoSerie} />
        </Switch>
        {/* <pre>{JSON.stringify(data)}</pre> */}
      </div>
    </Router>

  );
}

export default App;
