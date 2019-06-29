import React, { Component } from 'react'
require('bootstrap');
require('bootstrap/dist/css/bootstrap.css');

import './App.css'
import Universe from './components/universe/Universe'
import legend from '../static/images/legend.png'
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
        {/* <Header title={this.title} author={this.author} authorUrl={this.authorUrl}/> */}
       
        <div className="App-universe d-flex justify-content-center">          
            <Universe />                   
        </div>

        <hr style={{width: '97%', color: 'gray', opacity:0.1, height: '3px', backgroundColor:'gray'}} />

       <div className='App-description-container'>

          <div className="row App-description">

            <div className="col-sm-12 col-lg-6">
                <img className="img-fluid" alt="Legend" src={legend}/>
            </div>
            <div className="col-sm-12 col-lg-6">
               <p>:: <b>Comics Universe</b> ::</p> 
               <p>Marvel and DC galaxies were created with Wikipedia data extracted in Jun 2019. If you are a comic expert, consider using the visualization to identify gaps in the data and contribute to <a href="https://en.wikipedia.org/wiki/Wikipedia:Contributing_to_Wikipedia" target="_blank">Wikipedia</a> and <a href="https://www.wikidata.org/wiki/Wikidata:Contribute" target="_blank">Wikidata</a>. You may also contribute to this project by creating a <a href="https://github.com/heberleh/comics-universes" target="_blank"><b>Github</b></a> pull request, or just fav. or fork it to let me know. The system is coded in Javascript, React and D3.</p>

               <p>On the left you find a description of the visualization attributes. In summary: <b>size</b> and <b>color</b> represents the number of works the characters are present in, or derived works; <b>white</b> is used to highlight the ones are not male. The closer the orbit (ellipses) is to its Sun, the more <b>super abilities</b> the characters have.</p>

              <div className="App-author">
                <p>Henry Heberle, Phd.</p>
              </div>
            </div>

            
            
          </div>

       </div>
              
      </div>
    );
  }
}

export default App;
