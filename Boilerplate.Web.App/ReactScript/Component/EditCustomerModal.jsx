import React, { Component } from 'react'
import { Button, Header, Image, Modal,Form } from 'semantic-ui-react'

class EditCustomerModal extends Component {
    state = {
        open: false,
        id: this.props.customer.id,
        name: this.props.customer.name,
        address: this.props.customer.address
    }


    show = dimmer => () => {
        this.setState({
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

    editCustomer = () => {
        let data = {
            'id': this.state.id,
            'name': this.state.name,
            'address': this.state.address
        };

        let baseUrl = location.protocol + '//' + location.host;

        $.ajax({
            url: baseUrl+'/Customer/EditCustomer',
            type: 'PUT',
            data: JSON.stringify(data),
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8',
            success: function (data) {
                this.props.loadCustomerData();
                this.close();
            }.bind(this)
            });
    }


    render() {
        const { open, name, address } = this.state

        return (
            <div>
             
                <Button color='yellow' onClick={this.show('blurring')}>
                    <i className="edit icon"></i>Edit</Button>

                <Modal  open={open} onClose={this.close}>
                    <Modal.Header>Edit customer</Modal.Header>
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
                            onClick={this.editCustomer}
                        />
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
}

export default EditCustomerModal
