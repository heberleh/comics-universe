import React, { Component } from 'react'
require('bootstrap');
require('bootstrap/dist/css/bootstrap.css');

import './App.css'
import Universe from './components/universe/Universe'
import legend from '../static/images/legend.png'
import BarChart from './components/barchart/BarChart/BarChart';
import LoadDataset from './dataset/LoadDataset';
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
    let marvelData =  LoadDataset.marvelData()
    let dcData = LoadDataset.dcData()

    function countGender(a, b, value, n){
      if (b.gender === value && b.presentInWorks.length > n){
        return a+1
      }else{
        return a
      }
    }

    function countTotalGender(a, b, n){
      if (b.gender !== undefined && b.presentInWorks.length > n){
        return a+1
      }else{
        return a
      }
    }

    // n: filter by minimum Number of works (n)
    function percentageMale(data, n){
      return parseInt(data.reduce((a,b)=>{return countGender(a,b,'male',n)},0)/data.reduce((a,b)=>countTotalGender(a,b,n),0)*100,0)
    }

    return (
      <div className="App">
        {/* <Header title={this.title} author={this.author} authorUrl={this.authorUrl}/> */}
       
        <div className="App-universe d-flex justify-content-center">          
            <Universe marvelData={marvelData} dcData={dcData} />                   
        </div>

        <hr style={{width: '97%', color: 'gray', opacity:0.1, height: '3px', backgroundColor:'gray'}} />

       <div className='App-description-container'>

          <div className="row App-description">

            <div className="col-sm-12 col-lg-6">
                <img className="img-fluid" alt="Legend" src={legend}/>
            </div>
            <div className="col-sm-12 col-lg-6">
               <p>:: <b>Comics Universe</b> ::</p> 
               <p>Marvel and DC galaxies were created with Wikipedia data extracted in Jun 2019, which are instances of <b>fictional character</b>. If you are a comic expert, consider using the visualization to identify gaps in the data and contribute to <a href="https://en.wikipedia.org/wiki/Wikipedia:Contributing_to_Wikipedia" target="_blank">Wikipedia</a> and <a href="https://www.wikidata.org/wiki/Wikidata:Contribute" target="_blank">Wikidata</a>. You may also contribute to this project by creating a <a href="https://github.com/heberleh/comics-universes" target="_blank"><b>Github</b></a> pull request, or just fav. or fork it to let me know. The system is coded in Javascript, React and D3.</p>

               <p>On the left you find a description of the visualization attributes. In summary: <b>size</b> and <b>color</b> represent the number of works the characters are present in, or derived works; <b>white</b> is used to highlight the ones are not male. The closer the orbit (ellipses) is to its Sun, the more <b>super abilities</b> the characters have.</p>

              <p>As expected, in both Marvel and DC galaxies we find females and other non-male genders as minorities in most of the works. This can be concluded by checking the amount of white circles in each galaxy. More precisely, excluding characters with undefined gender, <b>{percentageMale(marvelData, 10)}%</b> of Marvel's characters and <b>{percentageMale(dcData, 10)}%</b> of DC's characters present in <b>over 10 works</b> are male.</p>
              
              <p> Those numbers get more balanced when we consider characters that appear in fewer works: {percentageMale(marvelData, 0)}% (Marvel) and {percentageMale(dcData, 0)}% (DC) when considering characters with at least 1 work registered on Wikipedia; and {percentageMale(marvelData, -1)}% (Marvel) and {percentageMale(dcData, -1)}% (DC) when considering characters with 0 or more registered works. Below, you find bar charts that represent the distributions of abilities and of occupations, with gender counts and character names in the tooltips.</p>

              <br/>
              <p style={{textAlign: 'right'}}>I hope you enjoy the visualizations. If so, consider <b>sharing</b> it with your friends :)</p>

              <div className="App-author">
                <p>Feel free to contact me by e-mail or any other media.</p>
                <p>Henry Heberle, Phd</p>
              </div>
            </div>

          </div>

          <div className="row">
            <div className="col-sm-12 col-lg-6">              
              <div>
                <BarChart title="Marvel - Abilities" dataModel={LoadDataset.abilitiesDataModel(marvelData)} key="Abilities-Marvel"/>
              </div>
              <div>
                <BarChart title="Marvel - Occupations" height={3500} dataModel={LoadDataset.occupationsDataModel(marvelData)} key="Occupations-Marvel"/>
              </div>              
            </div>
            <div className="col-sm-12 col-lg-6">
              <div>
                <BarChart title="DC - Abilities" dataModel={LoadDataset.abilitiesDataModel(dcData)} key="Abilities-DC"/>
              </div>
              <div>
                <BarChart title="DC - Occupations" height={4000} dataModel={LoadDataset.occupationsDataModel(dcData)} key="Occupations-DC"/>
              </div>

            </div>
          </div>



          
          

       </div>
              
      </div>
    );
  }
}

export default App;
