import React, { Component } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import EditModal from './EditModal';
import CreateModal from './CreateModal';

class PostsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            showModal: false,
            showCreateModal: false
        }
    this.onEditButtonClick = this.onEditButtonClick.bind(this);
    this.onCreateButtonClick = this.onCreateButtonClick.bind(this);
    this.rerenderParent = this.rerenderParent.bind(this);
    }

    getData() {
        fetch('http://localhost:8000/products/')
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

    rerenderParent() {
        console.log('in rerender')
        this.getData()
    }

    onEditButtonClick(data) {
        this.refs.child.open();
        this.refs.child.setModalData(data);
        this.setState({
            showModal: true
        });
    }

    onCreateButtonClick() {
        this.refs.grandChild.open();
        this.setState({
            showCreateModal: true
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
            table_data.push(<td>{obj.id}</td>);
            table_data.push(<td>{obj.title}</td>);
            table_data.push(<td>{obj.price}</td>);
            table_data.push(<td width="40%">{obj.description}</td>)
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
                <div style={{marginBottom: '10px'}}>
                <h3 style={{textAlign: 'center'}}>Products List</h3>
                <Button 
                        variant="primary" 
                        type="button"
                        style={{textAlign: 'right'}}
                        onClick={() => this.onCreateButtonClick()}
                    >
                        + Add New
                </Button>
                </div>
                <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Product ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Description</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {this.populateTable()}
                </tbody>
            </Table>
            <EditModal ref="child" rerenderParent={this.rerenderParent}/>
            <CreateModal ref="grandChild" rerenderParent={this.rerenderParent}/>
            </div>
        );
    }
}

export default PostsTable;