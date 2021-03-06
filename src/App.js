import React from 'react';
//import logo from './logo.svg';
import './App.css';
//import {Router, Route, browserHistory} from 'react-router'
import { BrowserRouter, Route, Link } from 'react-router-dom'

//import Root from './components/Root';
import Movies from './components/Movies';
import Directors from './components/Directors';
import ShowMovieCard from './components/ShowMovieCard'
import ShowDirectorCard from './components/ShowDirectorCard'



function App() {
  return (
    <BrowserRouter>
    <div>
    <div className="App">
            <header className="App-header">
            <h1>IMDB
              </h1>
              <div className="movie">
                <h2 align="left" >
                  <Link to="/movies">Movies</Link>
                    </h2>
              </div>
              <div className="director">
                <h2 align="right" >
                  <Link to="/directors">Directors</Link>
                </h2>
              </div>
            </header>
    </div>
    <div>
      {/* <Route path={"/"} component = {Root}> */}
        <Route path={"/movies"} component = {Movies} />
        <Route path={"/directors"} component = {Directors} />
        <Route path={"/movies/:id"} component = {ShowMovieCard} />
        <Route path={"/directors/:id"} component = {ShowDirectorCard} />

      {/* </Route> */}
    
    </div>
     </div>
    </BrowserRouter>

  );
}

export default App;
