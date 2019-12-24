import React from 'react';
import '../App.css';


function EditDirector (props) {
        return ( 
            <div className = "layer">
            <div className="popup-header">
                <h1>Edit Director Name</h1>
            </div>
            <div className="popup-content">
                
                <div className="element">
                <label>Director</label>
                <input defaultValue={props.data["Director"]} />
                </div>
                <div className="buttons">
                    <button onClick = {(event)=>props.edit(event)} >Submit</button>
                    <button onClick = {props.popupClass}>Cancel</button>
                
                    </div>
            </div>
            </div>
         );
    }

 
export default EditDirector;