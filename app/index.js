import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import PostsTable from './PostsTable';

class App extends React.Component {
    render() {
        return(
            <PostsTable />
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'))