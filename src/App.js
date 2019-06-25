import React, { Component } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'

import './App.css'
import Header from './Header'
import Universe from './components/universe/Universe'

//import $ from "jquery"

class App extends Component {

  constructor(props){
    super(props);
    this.title = "Marvel & DC Characters";
    this.author = "Henry Heberle"
    this.authorUrl = "https://heberleh.github.io"
  }
  
  render() {

    // $(document).keydown(function(event) {
    //   if (event.ctrlKey===true && (event.which == '61' || event.which == '107' || event.which == '173' || event.which == '109'  || event.which == '187'  || event.which == '189'  ) ) {
    //           event.preventDefault();
    //       }
    //       // 107 Num Key  +
    //       // 109 Num Key  -
    //       // 173 Min Key  hyphen/underscor Hey
    //       // 61 Plus key  +/= key
    //   });
      
    //   $(window).bind('mousewheel DOMMouseScroll', function (event) {
    //           if (event.ctrlKey == true) {
    //           event.preventDefault();
    //           }
    //   });


    return (
      <div className="App">
        <Header title={this.title} author={this.author} authorUrl={this.authorUrl}/>
       
       <div className="App-universe d-flex justify-content-center">          
          <Universe />                   
       </div>

       
       <div className='App-description-container container'>

        <div className="row  App-description">
          <p>Marvel and DC galaxies were created with Wikipedia data extracted in Jun 2019. If you are a comic expert, consider using the visualization to identify gaps in the data and contribute to <a href="https://en.wikipedia.org/wiki/Wikipedia:Contributing_to_Wikipedia" target="_blank">Wikipedia</a> and <a href="https://www.wikidata.org/wiki/Wikidata:Contribute" target="_blank">Wikidata</a>.</p>
        </div>

       </div>
              
      </div>
    );
  }
}

export default App;
