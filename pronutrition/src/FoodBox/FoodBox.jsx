import React, { Component } from 'react';
import './FoodBox.css';

class FoodBox extends Component {
    constructor(props)
    {
        super(props);
        this.state={
            foods : [
                {
                    id:1,
                    name:'Apple',
                    cal:80
                },
                {
                    id:2,
                    name:'Banana',
                    cal:40
                },
                {
                    id:3,
                    name:'Orange',
                    cal:30
                },
                {
                    id:4,
                    name:'Pizza',
                    cal:140
                },
                {
                    id:5,
                    name:'Dates',
                    cal:20
                },
                {
                    id:6,
                    name:'Noodles',
                    cal:120
                },
                {
                    id:7,
                    name:'Chocolates',
                    cal:110
                },
                {
                    id:8,
                    name:'Grapes',
                    cal:70
                }
            ],
            totalCal:0,
            addedItems:[]
        };
    }

    //handle add item changes
    handleAddItems=(id)=>{
        const data = this.state.foods;
        //console.log(id);
        const mapRows = data.filter((item)=>(item.id==id)).map((item)=>{
            let addedItems = this.state.addedItems;
            addedItems.push(item);
            this.setState({ addedItems: addedItems});
        });
        //console.log(this.state.addedItems);
        const dataCal = this.state.addedItems;
        var cal = dataCal.reduce((sum,item)=>{console.log(item.cal); return item.cal+sum},0);
        //console.log(dataCal.reduce((sum,item)=>{console.log(item.cal); return item.cal+sum},0));
        this.setState({totalCal:cal});
    }

    handleDeleteItems=(id)=>{
        console.log(id);
        const data = this.state.addedItems;
        const mapRows = data.filter((item,index)=>{
            if(item.id==id)
            {
                data.splice(index,1);
            }
            
        });
        this.setState({ addedItems:data});
        const dataCal = this.state.addedItems;
        var cal = dataCal.reduce((sum,item)=>{console.log(item.cal); return item.cal+sum},0);
        this.setState({totalCal:cal});
    }

    // display all items
    renderItems = () => {
        const data = this.state.foods;
        return (<div className="container">
        <div className="boxes">
        {
         data.map((item) => (
            <React.Fragment key={item.id}>
                <div className="box">
                <article className="media">
                    <div className="media-left">
                    <figure className="image is-64x64">
                        <img src="https://i.imgur.com/eTmWoAN.png" height="90px" width="90px"/>
                    </figure>
                    </div>
                    <div className="media-content">
                    <div className="content">
                        <p>
                        <strong>{item.name}</strong> <br />
                        <small>{item.cal}</small>
                        </p>
                    </div>
                    </div>
                    <div className="media-right">
                    <div className="field has-addons">
                        <div className="control">
                        <input className="input" type="number" value="1" />
                        </div>
                        <div className="control">
                        <button className="button is-info" onClick={()=>this.handleAddItems(item.id)}>
                            +
                        </button>
                        </div>
                    </div>
                    </div>
                </article>
            </div>
            </React.Fragment>
        ))
         }
         </div>
         <div className="calList">
                <p>Today's Food {this.state.totalCal} Cal</p>
                {
                    this.calculateCals()
                }
            </div>
        </div>);
    };

    renderOnlyFilteredItems(){
        const data = this.state.foods;
        let foodValue = this.props.value;
        return (<div className="container">
            <div className="boxes">
            {
                data.filter((item)=>(item.name.includes(foodValue))).map((item) => (
                    <React.Fragment key={item.id}>
                            <div className="box">
                                <article className="media">
                                    <div className="media-left">
                                    <figure className="image is-64x64">
                                        <img src="https://i.imgur.com/eTmWoAN.png" height="90px" width="90px"/>
                                    </figure>
                                    </div>
                                    <div className="media-content">
                                    <div className="content">
                                        <p>
                                        <strong>{item.name}</strong> <br />
                                        <small>{item.cal}</small>
                                        </p>
                                    </div>
                                    </div>
                                    <div className="media-right">
                                        <div className="field has-addons">
                                            <div className="control">
                                                <input className="input" type="number" value="1" />
                                            </div>
                                            <div className="control">
                                                <button className="button is-info" onClick={()=>this.handleAddItems(item.id)}>
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </div>
                    </React.Fragment>
                ))
            }
            </div>
            <div className="calList">
                <p>Today's Food {this.state.totalCal} Cal</p>
                {
                    this.calculateCals()
                }
            </div>
        </div>);
        
    };


    calculateCals(){
        var dataCal = this.state.addedItems;
        console.log(dataCal[0]);
        console.log(this.state.foods);
        var calculateCal;
        if(dataCal.length!=0)
        {
             calculateCal = dataCal.map((item)=>(
                <React.Fragment key={item.id}>
                    <div>
                        <span className="list">{item.name}</span>
                        <span className="list">{item.cal}</span>
                        <span className="list">
                            <button className="button" id={item.id} onClick={()=>this.handleDeleteItems(item.id)}>x</button>
                        </span>
                        
                    </div>
                </React.Fragment>
            ));
        }
        return calculateCal;
    };
    render() {
        let rendering;
        if(this.props.value=='') {
            rendering = this.renderItems()
        }
        else {
            rendering = this.renderOnlyFilteredItems()
        } 
        return (
            <React.Fragment>
                {
                    rendering
                }
            </React.Fragment>
        );
    }
}

export default FoodBox;