import React, { Component } from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'

class DeleteProductModal extends Component {
    state = {
        open: false,
        id: this.props.productId
    }


    show = dimmer => () => {
        this.setState({
            dimmer,
            open: true,
            id: this.state.id

        })
    }

    close = () => {
        this.setState({
            open: false,
            id: this.state.id
        });

    }


    deleteProduct = () => {

        let id = this.state.id;
        let baseUrl = location.protocol + '//' + location.host;

        $.ajax({
            url: baseUrl+'/Product/Delete/' + id,

            type: 'DELETE',
            contentType: 'text',


            success: function (data) {
                this.props.loadProductData(); 
                this.close();
            }.bind(this)

        });

    }


    render() {
        const { open, dimmer, id } = this.state

        return (
            <div>

                <Button color='red' onClick={this.show('blurring')}>
                    <i className="trash icon"></i>
                    Delete</Button>
                <Modal dimmer={dimmer} open={open} onClose={this.close}>
                    <Modal.Header>Delete Product</Modal.Header>
                    <Modal.Content>
                        <Modal.Description>
                            <p >Are you sure?</p>
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='black' onClick={this.close}>
                            cancel
                        </Button>
                        <Button
                            negative
                            icon='delete'
                            labelPosition='right'
                            content="delete"
                            onClick={this.deleteProduct}
                        />
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
}

export default DeleteProductModal
