import React from 'react';
import './header.css';

export default class Header extends React.Component {
    render() {
        const {toDo, done} = this.props;
        return (
            <div className="header d-flex">
                <h1>Todo List</h1>
                <h2>{toDo} more to do, {done} done</h2>
            </div>
        );       
    }
}


