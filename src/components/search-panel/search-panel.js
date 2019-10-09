import React from 'react';
import ItemStatusFilter from '../item-status-filter/item-status-filter';
import './search-panel.css';

export default class SearchPanel extends React.Component {
    constructor() {
        super();
        this.state = {
            term: ''
        };
    }

    onSearchChange = (e) => {
        const term = e.target.value;
        this.setState({term});
        this.props.onSearchChange(term);
    }

    render() {
        return (
            <div>
                <input placeholder="Search" className="form-control search-input " value={this.state.term} onChange={this.onSearchChange}/>
            </div>
        );        
    }
}