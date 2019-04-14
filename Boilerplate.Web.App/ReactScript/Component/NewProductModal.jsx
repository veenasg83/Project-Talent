import React from 'react'
import { Button, Header, Image, Modal, Form } from 'semantic-ui-react'



class NewProductModal extends React.Component {
    state = {
        open: false,
        name: '',
        price: 0
    }

    show = dimmer => () => {
        this.setState({
            dimmer,
            open: true,
            name: this.state.name,
            price: this.state.price
        })
    }

    close = () => {
        this.setState({
            open: false,
            name: this.state.name,
            price: this.state.price

        })
    }


    createProduct = () => {
        let data = {
            'name': this.state.name,
            price: this.state.price
        };
        console.log(data);


        let baseUrl = location.protocol + '//' + location.host;

        $.ajax({
            url: baseUrl+"/product/CreateProduct",
            type: "POST",
            data: JSON.stringify(data),
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8',
            success: function (response) {
                console.log(data);
                this.props.loadProductData(); 
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
        const { open,dimmer, name, price } = this.state
        return (
            <React.Fragment>
                <Button primary onClick={this.show('blurring')}>New Product</Button>
                <Modal dimmer={dimmer} open={open} onClose={this.close}>
                    <Modal.Header>Create Product</Modal.Header>
                    <Modal.Content>
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
                            content="Create"
                            onClick={this.createProduct}
                        />
                    </Modal.Actions>
                </Modal>
            </React.Fragment>
        )
    }
}

export default NewProductModal
