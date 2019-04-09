import React, { Component } from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'

class DeleteCustomerModal extends Component {
    state = {
        open: false,
        id: this.props.customerId
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


    deleteCustomer = () => {

        let id = this.state.id;

        $.ajax({
            url: 'http://localhost:61419/Customer/Delete/'+id,
          
            type: 'DELETE',
            contentType:'text',
        
            
            success: function (data) {
                this.close();
            }.bind(this)

        });

    }


    render() {
        const { open, dimmer,id } = this.state

        return (
            <div>
                
                <Button color='red' onClick={this.show('blurring')}>
                    <i className="trash icon"></i>
                Delete</Button>
                <Modal dimmer={dimmer} open={open} onClose={this.close}>
                    <Modal.Header>Delete Customer</Modal.Header>
                    <Modal.Content>                       
                        <Modal.Description>                      
                            <p >Are you sure?</p>
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='black' onClick={this.close}>
                            Nope
                        </Button>
                        <Button
                            negative
                            icon='delete'
                            labelPosition='right'
                            content="delete"
                            onClick={this.deleteCustomer}
                        />
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
}

export default DeleteCustomerModal
