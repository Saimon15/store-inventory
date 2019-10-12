import React, { Component } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import EditModal from './EditModal';

class PostsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            showModal: false
        }
    this.onEditButtonClick = this.onEditButtonClick.bind(this);
    }

    getData() {
        fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
        .then(response => response.json())
        .then(json_response => {
            this.setState({
                posts: json_response
            });
            console.log(this.state.posts);
        })
      }
    
    componentDidMount() {
        this.getData();
    }

    onEditButtonClick(data) {
        this.refs.child.open();
        this.refs.child.setModalData(data);
        this.setState({
            showModal: true
        });
    }

    onDeleteButtonClick(data) {
        console.log('in delete');
        
    }

    populateTable() {
        let rows = []
        const data = this.state.posts;

        data.forEach((obj) => {
            let table_data = [];
            table_data.push(<td>{obj.userId}</td>);
            table_data.push(<td>{obj.id}</td>);
            table_data.push(<td>{obj.title}</td>);
            table_data.push(<td width="40%">{obj.body}</td>)
            table_data.push(
                <td><Button 
                        variant="primary" 
                        type="button"
                        onClick={() => this.onEditButtonClick(obj)}
                        style={{width: '45%'}}
                    >
                    Edit
                    </Button>
                    <Button 
                        className="btn btn-danger" 
                        type="button"
                        onClick={() => this.onEditButtonClick(obj)}
                        style={{width: '45%', marginLeft: '10px'}}
                    >
                    Delete
                    </Button>
                </td>
            );
            rows.push(<tr>{table_data}</tr>);
        })

        return rows;
    }

    render() {
        return (
            <div>
                <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>User ID</th>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Body</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {this.populateTable()}
                </tbody>
            </Table>
            <EditModal ref="child"/>
            </div>
        );
    }
}

export default PostsTable;