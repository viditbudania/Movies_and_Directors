import React, { Component } from "react";
import '../App.css';
// import { async } from "q";
import Popup from "./addDirector";
import PopupEdit from "./editDirector";
import { Link } from 'react-router-dom'

// import { async } from "q";
// import { async } from "q";

class directors extends Component {
  state = {
    allDirectors: [],
    copyOfDirector :[],
    popup: false,
    editpopup: false,
    id: null
  };
  componentDidMount() {
    fetch("http://localhost:4000/api/directors")
      .then(boardData => {
        return boardData.json();
      })
      .then(boardData => {
        console.log(boardData);
        this.setState({ allDirectors: boardData , copyOfDirector:boardData});
      });
      
  }
  onDelete = async (element) =>{
    console.log(element["ID"])
    await fetch('http://localhost:4000/api/directors/' + element["ID"],{
         method: "DELETE"

     });
 await this.componentDidMount();
  }
  onAdd = async () => {
    let input = document.querySelectorAll(".element input");
    let obj = {
        "Director":input[0].value
    }
    this.state.popup
    ? this.setState({ popup: false })
    : this.setState({ popup: true });
    await fetch("http://localhost:4000/api/directors/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
  
        body: JSON.stringify(obj)
      });
      await this.componentDidMount();
  }
  onSearch = (event) =>{
    let searchText = event.target.value;
    let searchContact = this.state.copyOfDirector.filter(director => {
      return (
        director["Director"].toLowerCase().includes(searchText) ||
        director["Director"].toUpperCase().includes(searchText) 
      );
    });
    console.log(searchContact);
    this.setState({ allDirectors: searchContact });
}
  onEdit = async(event) =>{
      
      //console.log(event.target)
    let input = document.querySelectorAll(".element input");
    console.log(input[0].value);
    await fetch("http://localhost:4000/api/directors/" + this.state.id["ID"], {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        Director : input[0].value
      })
    });
    await this.componentDidMount();

    this.setState({
        editpopup: !this.state.editpopup
    })
  }
  changePopupClass = () => {
      this.setState({
          popup: !this.state.popup
      })
  };
  changeEditPopupClass = () => {
    this.state.editpopup
      ? this.setState({ editpopup: false })
      : this.setState({ editpopup: true });
      this.setState({
          editpopup: !this.state.editpopup
      })
  };
  render() {
    return (
        <div>
             <div>
                {this.state.popup && (
          <Popup add={this.onAdd} popupClass={this.changePopupClass} />
        )}
        {this.state.editpopup && (
                        <PopupEdit edit = {this.onEdit} popupClass = { this.changeEditPopupClass} 
                         data= {this.state.id}
                         
                         />
                    )}
        </div>
               <div className="search-add">
                <input placeholder="Search Director" onChange={this.onSearch} />
                <button onClick= {() => this.changePopupClass()} >Add</button>
                </div>
            <div className="container">
     	            <div className="row">
                     {this.state.allDirectors.map(element => (
                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12" key={element["ID"]}>
               
                <div className="box-part text-center">
                    
                <Link to={{
                    pathname: `/directors/${element["ID"]}`,
                    state:element,
                  }}>
                    
                    <div className="ID">
                        <h4>{element["ID"] }</h4>
                    </div>
                    <div className ="Director">
                        <h6>Director:{element["Director"]}</h6>
                    </div>
                    
                    
                    </Link>
                    <div>
                        <button onClick={()=> {this.changeEditPopupClass(); this.setState({id : element})}} >Edit</button>
                        <button onClick = {()=> this.onDelete(element)} >Delete</button>
                    </div>
                </div>
                </div>
                     ))}
            </div>
            </div>     
             
        </div>
    );
  }
}

export default directors;
