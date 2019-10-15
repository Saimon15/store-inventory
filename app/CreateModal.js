import React, { Component } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

class CreateModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCreateModal: false,
            title: '',
            description: '',
            price: '',
            category: ''
        }
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.onSubnit = this.onSubnit.bind(this);
    }

    close() {
        this.setState({ showCreateModal: false });
      }
  
    open() {
        this.setState({ showCreateModal: true });
      }

    onInputChange(event){
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = target.name
    
        this.setState({
          [name]: value
        });
      }
    
    onSubnit() {
        fetch('http://localhost:8000/products/', {
        method: 'POST',
        body: JSON.stringify({
            title: this.state.title,
            price: this.state.price,
            description: this.state.description,
            category: this.state.category
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
        })
        .then(response => {
            console.log('status: ' + response.status)
            const statusCode = response.status;
            const data = response.json()
            return Promise.all([statusCode, data]);
        })
        .then(res => {
            console.log(res[0], res[1]);
            this.props.rerenderParent();
        })
        this.close();
    }
    
    render() {
        return (
            <Modal
                onHide={this.close}
                show={this.state.showCreateModal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                    Create new product
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="inputform">
                        <Form.Group controlId="formBasicText">
                        <Form.Label>Title</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Product Name" 
                            value={this.state.title} 
                            name='title'
                            onChange={this.onInputChange} />
                        <Form.Text className="text-muted">
                            Post title must be at least 20 chars long
                        </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicText">
                        <Form.Label>Description</Form.Label>
                        <textarea 
                            className="form-control"
                            placeholder="Product description" 
                            value={this.state.description} 
                            name='description'
                            onChange={this.onInputChange}>
                        </textarea>
                        <Form.Text className="text-muted">
                            Post body can be at max 255 chars long
                        </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicText">
                        <Form.Label>Price</Form.Label>
                        <Form.Control 
                            type="number" 
                            placeholder="Product Price" 
                            value={this.state.price} 
                            name='price'
                            onChange={this.onInputChange} />
                        <Form.Text className="text-muted">
                            Enter amount in BDT
                        </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicText">
                        <Form.Label>Category</Form.Label>
                        <Form.Control 
                            type="number" 
                            placeholder="Product Category" 
                            value={this.state.category} 
                            name='category'
                            onChange={this.onInputChange} />
                        <Form.Text className="text-muted">
                            Enter the product category
                        </Form.Text>
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.close}>Close</Button>
                    <Button 
                        onClick={this.onSubnit}
                        variant="primary" 
                        type="button"
                    >
                    OK
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default CreateModal;