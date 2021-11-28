import React, { Component } from 'react';
import SystemsDashboard from './components/systemsDashboard'
import './App.css';

class App extends Component {
    state = {}

    componentDidMount () {
        fetch('/data.json')
        .then(res => res.json())
        .then(data => this.setState({data}))
        .catch(err => console.error(err.message))
    }

    render() {
        return (
            <div className="dashboard-app">
                <div className="dashboard-header">
                    <h1>Baffin Bay Networks</h1>
                </div>
                <SystemsDashboard />
            </div>
        );
    }
}


export default App;
