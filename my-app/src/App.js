import logo from './logo.svg';
import './App.css';

import React, {useState} from 'react';

import Article from './Components/Article.js'
import Followed from './Components/Followed.js'
import Recent from './Components/Recent.js'

function App() {
  let data;
  const [followed, setFollowed] = useState(false)
  const [recent, setRecent] = useState(false)
  const [request,setrequest] = useState(false)
  const [selected,setSelected] = useState(false)
  const handleFollowed = () => {
    setFollowed(true);
    setSelected(true);
  }
  const handleRecent = () => {
    setFollowed(false);
    setSelected(false);
  }

  // const fetchapi = async () => {
  //   const res = await fetch("https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=c8503c90442c4249860c2ead0a8ce1f8")
  //   data = await res.json();
  //   // console.log(data.articles)
  //   setrequest(true)
  //   apiwork()
  // }

  // fetchapi()
  
  // const apiwork = () => {
  //   // for (let da of data.articles) {
  //   //   // console.log(da.title)
  //   //   console.log(da.content)
  //   // }

  //   console.log(data.articles[0].content)
  // }

  
  




  return (
    <div className="App">
      <header className="App-header">
        <h1>
          KISSFEED
        </h1>
      </header>
      <body>
        <div class = 'mainpage'>
          <div id = 'column1'>
              <div class = 'row1'>
                <button  class= 'selected sidebarbutton'  onClick={() => handleRecent()}>
                All
                </button>
              </div>
              <div class = 'row1'>
                <button class = 'sidebarbutton' onClick= {() => handleFollowed()}>
                  Followed
                </button>
                
              </div>
              
              <div class = 'row1-custom'>
                <button class = 'sidebarbutton' >
                Custom
                </button>
              </div>


          </div>
          <div id = 'column2'>
            <div> 
              {followed ? (
                <Followed></Followed>
              ) : (
                  <Recent></Recent>
                )}
            </div>
          </div>
        </div>
      </body>
    </div>
  );
}

export default App;
