import React, { useState} from 'react'
import image from './e1a.png'
import Article from './Article'
const { Configuration, OpenAIApi } = require("openai");


function Modal(props) {
    const [input, setInput] = useState("")
    const [checked, setChecked] = useState([]);
    const [apiResponse, setapiResponse] = useState("")
    const checkList = ["NBC", "BBC", "CNN", "FOX"];
    
    const api2 = async ()=> {
      const configuration = new Configuration({
        apiKey: "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",
      });
      const openai = new OpenAIApi(configuration);
      const response = await openai.createCompletion("text-davinci-002", {
        prompt: input,
        max_tokens: 64,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      });

      console.log(response.data.choices[0].text)
      setapiResponse(response.data.choices[0].text)
    }
    

    
    const handleCheck = (event) => {
        var updatedList = [...checked];
        if (event.target.checked) {
          updatedList = [...checked, event.target.value];
        } else {
          updatedList.splice(checked.indexOf(event.target.value), 1);
        }
        setChecked(updatedList);
        
      };

      const print = () => {

        fetch(`https://newsapi.org/v2/everything?domains=nytimes.com,cnn.com&language=en&pageSize=9&apiKey=af5bdfeae6464c97b5e8c26fbc0f764c`)
        .then((res) => res.json())
        .then((res)=> props.setdata(res))
        
 
        if (props.data) {
          props.setSubmit(false)
        }
        
    }
    const handleChange = (e) => {
        setInput(e.target.value)
        console.log(input)
    }
    var isChecked = (item) => checked.includes(item) ? "checked-item" : "not-checked-item";

    return (
    <div>
        {props.type === 'checklist' ? <div className="app" class= 'modal' id='checklist'>
          <div className="checkList modal-content">
            <div className="title">Source You Want to Follow:</div>
            <div className="list-container">
              {checkList.map((item, index) => (
                <div key={index}>
                  <input value={item} type="checkbox" onChange={handleCheck} />
                  <span className={isChecked(item)}>{item}</span>
                </div>
              ))}
            </div>
            <div class = 'submit-container'>
              <button class = 'submit close' onClick = {print} >Submit </button><br/>
            </div>
          </div>
         </div>: props.type === 'custom' ? 
         <div className="app" class= 'modal' id='custom' onClick={props.clearCustom}>
          <div className="checkList modal-content" onClick={e => e.stopPropagation()}>
            <div className="title">Custom:</div>
            <textarea className="text-area" onChange={handleChange} value={input}>

            </textarea>
            <div class = 'submit-container'>
            <button class = 'submit close' onClick={api2}  >Submit </button>
            </div>
          </div>
          <br/>
          <div onClick={e => e.stopPropagation()}>
            {props.submitted ? <Article title="Custom" teaser="we are custards here" date="9/11" image={image} class="custom-article" author="dsjakldsajkdsa" text={apiResponse}></Article>: null} 
          </div>
          
         </div>: props.type === 'Article' ?
         <div className="app" class= 'modal' id = 'article' onClick={props.articleClick}>
          <div className="article-content modal-content" onClick={e => e.stopPropagation()}>
            <div className="title">Article</div>
            <div className="list-container article-container">
              <div class='image-container'>
                <img class= 'article-image' src={image}></img>
              </div>
              <div class = 'article-text'>
                {props.text}
              </div>
            </div>
           
          </div>
          <br/>
         </div> : null
            }
        
    </div>
)
}

export default Modal