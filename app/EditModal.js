import React, { Component } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

class EditModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            title: '',
            id: '',
            body: ''
        }
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.onSubnit = this.onSubnit.bind(this);
    }

    close() {
        this.setState({ showModal: false });
      }
  
    open() {
        this.setState({ showModal: true });
      }

    setModalData(data) {
        this.setState({
            title: data.title,
            id: data.id,
            body: data.body
        });
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
        console.log('title: ' + this.state.title);
        const post_id = this.state.id
        fetch('https://jsonplaceholder.typicode.com/posts/' + post_id, {
        method: 'PATCH',
        body: JSON.stringify({
            title: this.state.title,
            body: this.state.body
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
        })
        this.close();
    }
    
    render() {
        return (
            <Modal
                onHide={this.close}
                show={this.state.showModal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                    Edit Post
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="inputform">
                        <Form.Group controlId="formBasicText">
                        <Form.Label>Title</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Post title" 
                            value={this.state.title} 
                            name='title'
                            onChange={this.onInputChange} />
                        <Form.Text className="text-muted">
                            Post title must be at least 20 chars long
                        </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicText">
                        <Form.Label>Body</Form.Label>
                        <textarea 
                            className="form-control"
                            placeholder="Post body" 
                            value={this.state.body} 
                            name='body'
                            onChange={this.onInputChange}>
                        </textarea>
                        <Form.Text className="text-muted">
                            Post body can be at max 255 chars long
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

export default EditModal;