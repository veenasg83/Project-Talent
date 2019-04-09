import React, { Component } from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'

class DeleteStoreModal extends Component {
    state = {
        open: false,
        id: this.props.storeId
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


    deleteStore = () => {

        let id = this.state.id;

        $.ajax({
            url: 'http://localhost:61419/Store/Delete/' + id,

            type: 'DELETE',
            contentType: 'text',


            success: function (data) {
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
                    <Modal.Header>Delete Store</Modal.Header>
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
                            onClick={this.deleteStore}
                        />
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
}

export default DeleteStoreModal
