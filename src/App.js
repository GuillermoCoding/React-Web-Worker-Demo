import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { doSomething } from './registerServiceWorker'
import workerize from 'workerize';

const worker = workerize(`
      export function doSomething() {
        for (let i = 0; i < 5000; i++) {
          console.log(Math.random());
        }
      }
    `);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      worker: false
    }
  }
  
  async handleSubmit() {
    if (this.state.worker) {
      await worker.doSomething();
    } else {
      for (let i = 0; i < 5000; i++) {
        console.log(Math.random());
      }
    }
  }
  render() {
    console.log('web worker: '+this.state.worker);
    return (
      <div className="App">
        <h1>Web Worker Test Application</h1>
        <form action=''>
          <input type="radio" onClick={()=>this.setState({worker: true})} name='serviceworker'value='with'/>
          <label>With web worker</label>
          <input type="radio" onClick={()=>this.setState({worker: false})} name='serviceworker'value='without'/>
          <label>Without web worker</label>
        </form>
        <input type='text'/>
        <button onClick={()=> this.handleSubmit()}>Do some process!</button>
      </div>
    );
  }
}

export default App;
