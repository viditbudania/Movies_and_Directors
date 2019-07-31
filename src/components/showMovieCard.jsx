import React, { Component } from "react";
import "../App.css";
import {Link} from 'react-router-dom'

class addMovies extends Component {
  state = {
      director:""
  };
componentDidMount(){
    fetch("http://localhost:4000/api/directors/" + this.props.location.state["ID"], {
        method: "GET"
      })
      .then(boardData => {
        return boardData.json();
      })
      .then(boardData => {
        // console.log(boardData[0]["Director"]);
         this.setState({ director: boardData[0]["Director"]});
      });
}
  render() {
    // console.log(this.props.location.state);
    return (
      <div className="container">
        <div className="layer">
          <div className="popup-header">
            <h1>Details</h1>
          </div>
          <div className="popup-content">
            <div className="title">
              <h4>
                {this.props.location.state["Title_name"]}({this.props.location.state["Year"]})
              </h4>
            </div>
            <div className="director">
              <h6>Director:{this.state.director}</h6>
            </div>
            <div className="actor">
              <h6>Actor:{this.props.location.state["Actor"]}</h6>
            </div>
            <div className="description">
              <h6>Description:{this.props.location.state["Description_about"]}</h6>
            </div>
            <div className="runtime">
              <h6>Runtime:{this.props.location.state["Runtime_time"]}</h6>
            </div> 
            <div className="rating">
              <h6>
                Rating:{this.props.location.state["Rating"]}
              </h6>
              </div>
              <div className="votes">
              <h6>
              Votes:{this.props.location.state["Votes"]}
              </h6>
            </div>
            <div className= "genre">
              <h6>Genre:{this.props.location.state["Genre_id"]}</h6>
            </div>
            <div className= "gross-earning">
              <h6>Gross_Earning_in_Mil:{this.props.location.state["Gross_Earning_in_Mil"]}</h6>
            </div>

            
          </div>
          <div className="buttons">
        <Link to = "/movies">
            <button>Done</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default addMovies;
