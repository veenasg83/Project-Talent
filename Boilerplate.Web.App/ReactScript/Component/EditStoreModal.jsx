import React, { Component } from 'react'
import { Button, Header, Image, Modal,Form } from 'semantic-ui-react'

class EditStoreModal extends Component {
    state = {
        open: false,
        id: this.props.store.id,
        name: this.props.store.name,
        address: this.props.store.address
    }


    show = dimmer => () => {
        this.setState({
            dimmer,
            open: true,
            id: this.state.id,
            name: this.state.name,
            address: this.state.address
        })
    }

    close = () => {
        this.setState({
            open: false,
            id: this.state.id,
            name: this.state.name,
            address: this.state.address

        })
    }

    onChange = (event, type) => {
        let s = {};
        s[type] = event.target.value;
        this.setState(s);
    }

    editStore = () => {
        let data = {
            'id': this.state.id,
            'name': this.state.name,
            'address': this.state.address
        };

        $.ajax({
            url: 'http://localhost:61419/Store/EditStore',
            type: 'PUT',
            data: JSON.stringify(data),
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8',
            success: function(data) {
              
                this.close();
            }.bind(this)
            });
    }


    render() {
        const { open, dimmer,name, address } = this.state

        return (
            <div>
             
                <Button color='yellow' onClick={this.show('blurring')}>
                    <i className="edit icon"></i>Edit</Button>

                <Modal dimmer={dimmer}  open={open} onClose={this.close}>
                    <Modal.Header>Edit store</Modal.Header>
                    <Modal.Content >
                        <Form>
                            <Form.Field>
                                <label>NAME</label>
                                <input placeholder='name' name='name' value={name} onChange={(event) => { this.onChange(event, 'name') }} />
                            </Form.Field>
                            <Form.Field>
                                <label>ADDRESS</label>
                                <input placeholder='address' names='address' value={address} onChange={(event) => { this.onChange(event, 'address') }} />
                            </Form.Field>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='black' onClick={this.close}>
                            Cancel
                        </Button>
                        <Button
                            positive
                            icon='checkmark'
                            labelPosition='right'
                            content="Edit"
                            onClick={this.editStore}
                        />
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
}

export default EditStoreModal
