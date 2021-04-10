import React, { Component } from 'react';
import Pronutrition from './FoodBox.jsx';
import './search.css';

class Search extends Component {
    constructor()
    {
        super();
        // to bind the method with event handler without (). 
        this.handleChange = this.handleChange.bind(this);
        this.state={
            value:''
        };
    }
    //event handler method to change the state.
    //setState is used to change the state.
    handleChange(e){
        this.setState({value: e.target.value});
    }
    render() {
        return (
            <div className="search">Search
                <div className="control">
                    <input className="input" type="text" value={this.state.value} onChange={this.handleChange} />
                    <Pronutrition value={this.state.value}/>
                </div>
            </div>
        );
    }
}

export default Search;