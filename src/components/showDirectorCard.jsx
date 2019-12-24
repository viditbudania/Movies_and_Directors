import React, { Component } from "react";
import "../App.css";
import {Link} from 'react-router-dom'

class addMovies extends Component {
  state = {
    movie:[]
  };
componentDidMount(){
  fetch("http://ec2-13-235-135-20.ap-south-1.compute.amazonaws.com:4000/api/movies/" + this.props.location.state["ID"], {
        method: "GET"
      })
      .then(boardData => {
        return boardData.json();
      })
      .then(boardData => {
        // console.log(boardData);
          this.setState({ movie: boardData});
      });
}
  render() {
    // console.log(this.props.location.state);
    //console.log()
    return (
      <div className="container">
        <div className="layer">
          <div className="popup-header">
            <h1>Details</h1>
          </div>
          <div className="popup-content">
            <div className="title">
              <h4>
                <h4> ID:{this.props.location.state["ID"]}</h4>
              </h4>
            </div>
            
              
            <div className= "genre">
              <h6>Director:{this.props.location.state["Director"]}</h6>
            </div>
            {this.state.movie.map( Element => (
              <div>
                <h6>Movie-{Element["Title_name"]}</h6>
              </div>
            ))}
            {/* <div className= "gross-earning">
              <h6>Gross_Earning_in_Mil:{this.props.location.state["Gross_Earning_in_Mil"]}</h6>
            </div> */}

            
          </div>
          <div className="buttons">
        <Link to = "/directors">
            <button>Done</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default addMovies;
