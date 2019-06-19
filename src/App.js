import React, { Component } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'

import './App.css'
import Header from './Header'
import ComicsQueries from '../dataset/'

class App extends Component {

  constructor(props){
    super(props);
    this.title = "D3 & React - Comics Abilities";
    this.author = "Henry Heberle"
    this.authorUrl = "https://heberleh.github.io"
  }
  
  render() {


    return (
      <div className="App">
        <Header title={this.title} author={this.author} authorUrl={this.authorUrl}/>
       
       <div class="row">

        <div class="col-md-3">          
          
        </div>

        <div class="col-md-9">          
          
        </div>

       </div>
       
      </div>
    );
  }
}

export default App;
