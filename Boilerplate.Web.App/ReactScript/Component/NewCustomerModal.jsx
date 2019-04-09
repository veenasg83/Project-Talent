import React from 'react'
import { Button, Header, Image, Modal,Form } from 'semantic-ui-react'



class NewCustomerModal extends React.Component {
    state = {   
        open: false,
        name: '',
        address:''
    }

    show = dimmer => () => {
        this.setState({
            open: true,
            name: this.state.name,
            address: this.state.address
        })
    }

    close = () => {  
        this.setState({
            open: false,
            name: this.state.name,
            address: this.state.address

        })
    }


    createCustomer = () => {
               let data = {
                'name': this.state.name,
                'address': this.state.address
        };
        console.log(data);
       
        $.ajax({
            url: "http://localhost:61419/Customer/CreateCustomer",
            type: "POST",
            data: JSON.stringify(data),
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8',
            success: function (response) {
                console.log(data);
                this.close();
               // this.setState({ CustomerList: [...this.state.CustomerList, response] })
               // this.props.onClose()
            }.bind(this)
        }); 
        }


    onChange = (event, type) => {
        let s = {};
        s[type] = event.target.value;
        this.setState(s);
    }

    


    render() {
        const { open, dimmer, name, address} = this.state
        return (
                 <React.Fragment>
                <Button primary onClick={this.show('blurring')}>New Customer</Button>
                <Modal size={'small'} open={open} onClose={this.close}>
                            <Modal.Header>Create customer</Modal.Header>
                            <Modal.Content>
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
                                            content="Create"
                                            onClick={this.createCustomer}
                                        />
                            </Modal.Actions>
                         </Modal>
                 </React.Fragment>
                )
        }
}

export default NewCustomerModal
