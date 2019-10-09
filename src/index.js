import React from 'react';
import ReactDOM from 'react-dom';

import Header from './components/header/header';
import SearchPanel from './components/search-panel/search-panel';
import TodoList from './components/todo-list/todo-list';
import ItemAddForm from './components/item-add-form/item-add-form';
import ItemStatusFilter from './components/item-status-filter/item-status-filter';

class App extends React.Component {
    maxId = 100;
    constructor() {
        super();
        this.state = {
            todoData: [
                this.createTodoItem("Wake up"),
                this.createTodoItem("To do something"),
                this.createTodoItem("Go to sleep")
            ],
            term: '',
            filter: 'all' // active, all, done
        };
    }

    deleteItem = (id) => {
        this.setState(({ todoData }) => {
            const idx = todoData.findIndex((el) => el.id === id);

            const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];

            return {
                todoData: newArray
            };
        })
    }

    createTodoItem(label) {
        return {
            id: this.maxId++,
            label,
            important: false,
            done: false
        }
    }

    addItem = (text) => {
        this.setState(({ todoData }) => {
            const newItem = this.createTodoItem(text);
            const newArray = [...todoData, newItem];
            return {
                todoData: newArray
            }
        })
    }

    toggleProperty(arr, id, propName) {
        const idx = arr.findIndex((el) => el.id === id);
        const oldItem = arr[idx];
        const newItem = { ...oldItem, [propName]: !oldItem[propName] };

        return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
    }

    onToggleImportant = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            }                       
        })
    }

    onToggleDone = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            }                       
        })
    }

    onSearchChange = (term) => {
        this.setState({term});
    }

    onFilterChange = (filter) => {
        this.setState({filter});
    }

    search(items, term) {
        if (term.length === 0) {
            return items
        }

        return items.filter((item) => {
            return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
        });
    }

    filter(items, filter) {
        switch(filter) {
            case 'all': 
                return items;
            case 'active':
                return items.filter((item) => !item.done);
            case 'done':
                return items.filter((item) => item.done);
            default:
                return items;
        }
    }

    render() {
        const visibleItems = this.filter(this.search(this.state.todoData, this.state.term), this.state.filter);
        const doneCount = this.state.todoData.filter((el) => el.done).length;
        const todoCount = this.state.todoData.length - doneCount;
        return (
            <div>
                <Header toDo={todoCount} done={doneCount} />
                <SearchPanel onSearchChange={this.onSearchChange}/>
                <ItemStatusFilter filter={this.state.filter} onFilterChange={this.onFilterChange}/>
                <TodoList todos={visibleItems} onDeleted={this.deleteItem} onToggleImportant={this.onToggleImportant} onToggleDone={this.onToggleDone} />
                <ItemAddForm onAddItem={this.addItem} />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));