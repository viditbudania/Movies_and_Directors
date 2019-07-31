import React, { Component } from "react";
import "../App.css";
import Popup from "./addMovie";
import PopupEdit from "./editMovie";
// import PopupShow from "./showMovieCard";
import { Link } from "react-router-dom";

// import { async } from "q";

//import { async } from 'q';

class movies extends Component {
  state = {
    allMovies: [],
    copyOfMovies: [],
    popup: false,
    editpopup: false,
    id: null,
    index: null
    // showCard: false
  };
  componentDidMount() {
    fetch("http://localhost:4000/api/movies")
      .then(boardData => {
        return boardData.json();
      })
      .then(boardData => {
        console.log(boardData);
        this.setState({ allMovies: boardData, copyOfMovies: boardData });
      });
  }
  onDelete = async element => {
    console.log(element["movies_Id"]);
    await fetch("http://localhost:4000/api/movies/" + element["movies_Id"], {
      method: "DELETE"
    });
    await this.componentDidMount();
  };
  onEdit = async () => {
    console.log(this.state.id["movies_Id"]);
    let originalValue = this.state.allMovies[this.state.index];
    let input = document.querySelectorAll(".element input");
    console.log(input);
    let obj = {
      Rank: `${originalValue["Rank_id"]}`,
      Title:
        `${input[0].value}` !== ""
          ? `${input[0].value}`
          : `${originalValue["Title_name"]}`,
      Description:
        `${input[1].value}` !== ""
          ? `${input[1].value}`
          : `${originalValue["Description_about"]}`,
      Runtime:
        `${input[2].value}` !== ""
          ? `${input[2].value}`
          : `${originalValue["Runtime_time"]}`,
      Genre:
        `${input[3].value}` !== ""
          ? `${input[3].value}`
          : `${originalValue["Genre_id"]}`,
      Rating:
        `${input[4].value}` !== ""
          ? `${input[4].value}`
          : `${originalValue["Rating"]}`,
      Metascore:
        `${input[5].value}` !== ""
          ? `${input[5].value}`
          : `${originalValue["Metascore"]}`,
      Votes:
        `${input[6].value}` !== ""
          ? `${input[6].value}`
          : `${originalValue["Votes"]}`,
      Gross_Earning_in_Mil:
        `${input[7].value}` !== ""
          ? `${input[7].value}`
          : `${originalValue["Gross_Earning_in_Mil"]}`,

      Actor:
        `${input[8].value}` !== ""
          ? `${input[8].value}`
          : `${originalValue["Actor"]}`,
      Year:
        `${input[9].value}` !== ""
          ? `${input[9].value}`
          : `${originalValue["Year"]}`,
      Director: `${originalValue["ID"]}`
    };
    console.log(obj);
    this.setState({
      editpopup: !this.state.editpopup
    });

    await fetch(
      `http://localhost:4000/api/movies/${this.state.id["movies_Id"]}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },

        body: JSON.stringify(obj)
      }
    );
    await this.componentDidMount();
  };
  onAdd = async () => {
    // console.log("hi")
    let input = document.querySelectorAll(".element input");
    console.log(input);
    let obj = {
      Rank: input[0].value,
      Title: input[1].value,
      Description: input[2].value,
      Runtime: input[3].value,
      Genre: input[4].value,
      Rating: input[5].value,
      Metascore: input[6].value,
      Votes: input[7].value,
      Gross_Earning_in_Mil: input[8].value,
      Director: input[9].value,
      Actor: input[10].value,
      Year: input[11].value
    };
    console.log(obj);
    this.setState({
      popup: !this.state.popup
    });

    await fetch("http://localhost:4000/api/movies/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },

      body: JSON.stringify(obj)
    });
    await this.componentDidMount();
  };
  onSearch = event => {
    let searchText = event.target.value;
    let searchContact = this.state.copyOfMovies.filter(movie => {
      return (
        movie["Title_name"].toLowerCase().includes(searchText) ||
        movie["Title_name"].toUpperCase().includes(searchText)
      );
    });
    console.log(searchContact);
    this.setState({ allMovies: searchContact });
  };
  changePopupClass = () => {
    this.setState({
      popup: !this.state.popup
    });
  };
  changeEditPopupClass = () => {
    this.setState({
      editpopup: !this.state.editpopup
    });
  };

  render() {
    return (
      <div>
        <div>
          {this.state.popup && (
            <Popup add={this.onAdd} popupClass={this.changePopupClass} />
          )}
        </div>
        {this.state.editpopup && (
          <PopupEdit
            edit={this.onEdit}
            popupClass={this.changeEditPopupClass}
            data={this.state.id}
          />
        )}

        <div className="search-add">
          <input placeholder="Search Movie" onChange={this.onSearch} />
          <button onClick={() => this.changePopupClass()}>Add</button>
        </div>
        <div className="box">
          <div className="container">
            <div className="row">
              {this.state.allMovies.map((element, indexOfmap) => (
                <div
                  className="col-lg-4 col-md-4 col-sm-4 col-xs-12"
                  key={element["Rank_id"]}
                >
                  <div className="box-part text-center">
                    {/* {str=`/movies/${element['Rank_id']}`} */}
                    <Link
                      to={{
                        pathname: `/movies/${element["Rank_id"]}`,
                        state: element
                      }}
                    >
                      <div className="title">
                        <h4>
                          {element["Title_name"]}({element["Year"]})
                          {/* <PopupShow originalValue={element} /> */}
                        </h4>
                      </div>
                      <div className="Actor">
                        <h6>Actor:{element["Actor"]}</h6>
                      </div>
                      <div className="Runtime_time">
                        <h6>Runtime:{element["Runtime_time"]}</h6>
                      </div>
                      <div className="Rating">
                        <h6>
                          Rating:{element["Rating"]}, Votes:{element["Votes"]}{" "}
                        </h6>
                      </div>
                      <div>
                        <h6>Genre:{element["Genre_id"]}</h6>
                      </div>
                      <div>
                        <h6>
                          Gross_Earning_in_Mil:{element["Gross_Earning_in_Mil"]}
                        </h6>
                      </div>
                    </Link>
                    <div>
                      <button
                        onClick={() => {
                          this.changeEditPopupClass();
                          this.setState({
                            id: element,
                            index: indexOfmap
                          });
                        }}
                      >
                        Edit
                      </button>
                      <button onClick={() => this.onDelete(element)}>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default movies;
