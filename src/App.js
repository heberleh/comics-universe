import React, { Component } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'

import './App.css'
import Header from './Header'
import Universe from './components/universe/Universe'

import $ from "jquery"

class App extends Component {

  constructor(props){
    super(props);
    this.title = "Marvel & DC Characters";
    this.author = "Henry Heberle"
    this.authorUrl = "https://heberleh.github.io"
  }
  
  render() {

    $(document).keydown(function(event) {
      if (event.ctrlKey==true && (event.which == '61' || event.which == '107' || event.which == '173' || event.which == '109'  || event.which == '187'  || event.which == '189'  ) ) {
              event.preventDefault();
          }
          // 107 Num Key  +
          // 109 Num Key  -
          // 173 Min Key  hyphen/underscor Hey
          // 61 Plus key  +/= key
      });
      
      $(window).bind('mousewheel DOMMouseScroll', function (event) {
              if (event.ctrlKey == true) {
              event.preventDefault();
              }
      });


    return (
      <div className="App">
        <Header title={this.title} author={this.author} authorUrl={this.authorUrl}/>
       
       <div className="App-universe d-flex justify-content-center">
          <Universe />
       </div>
       
      </div>
    );
  }
}

export default App;
