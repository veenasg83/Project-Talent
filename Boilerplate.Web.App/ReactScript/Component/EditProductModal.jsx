import React, { Component } from 'react'
import { Button, Header, Image, Modal, Form } from 'semantic-ui-react'

class EditProductModal extends Component {
    state = {
        open: false,
        id: this.props.product.id,
        name: this.props.product.name,
        price: this.props.product.price
    }


    show = dimmer => () => {
        this.setState({
            dimmer,
            open: true,
            id: this.state.id,
            name: this.state.name,
            price: this.state.price
        })
    }

    close = () => {
        this.setState({
            open: false,
            id: this.state.id,
            name: this.state.name,
            price: this.state.price

        })
    }

    onChange = (event, type) => {
        let s = {};
        s[type] = event.target.value;
        this.setState(s);
    }

    editProduct = () => {
        let data = {
            'id': this.state.id,
            'name': this.state.name,
            'price': this.state.price
        };

        $.ajax({
            url: 'http://localhost:61419/product/EditProduct',
            type: 'PUT',
            data: JSON.stringify(data),
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8',
            success: function (data) {

                this.close();
            }.bind(this)
        });
    }


    render() {
        const { open, dimmer,name, price } = this.state

        return (
            <div>

                <Button color='yellow' onClick={this.show('blurring')}>
                    <i className="edit icon"></i>Edit</Button>

                <Modal dimmer={dimmer} open={open} onClose={this.close}>
                    <Modal.Header>Edit customer</Modal.Header>
                    <Modal.Content >
                        <Form>
                            <Form.Field>
                                <label>NAME</label>
                                <input placeholder='name' name='name' value={name} onChange={(event) => { this.onChange(event, 'name') }} />
                            </Form.Field>
                            <Form.Field>
                                <label>PRICE</label>
                                <input placeholder='price' names='price' value={price} onChange={(event) => { this.onChange(event, 'price') }} />
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
                            onClick={this.editProduct}
                        />
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
}

export default EditProductModal
