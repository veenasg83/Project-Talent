import React, { Component } from 'react'
import { Button, Header, Image, Modal, Form } from 'semantic-ui-react'

class EditSaleModal extends Component {
    state = {
        open: false,
        date: '',   
        customerName: this.props.sale.customer.name,
        productName: this.props.sale.product.name,
        storeName: this.props.sale.store.name,
        customerOptions: [],
        productOptions: [],
        storeOptions: [],
        selectedCustomerId: 0,
        selectedProductId: 0,
        selectedStoreId: 0

    }

    show = dimmer => () => {
        this.setState({
            open: true,
            dimmer,
            date: this.state.date,  
            selectedCustomerId: this.state.selectedCustomerId,
            selectedProduct: this.state.selectedProductId,
            selectedStore: this.state.selectedStoreId,
            customerOptions: [],
            productOptions: [],
            storeOptions: []
        })
        this.loadData();
    }

    close = () => {
        this.setState({
            open: false,
            date: this.state.date,          
            selectedCustomerId: this.state.selectedCustomerId,
            selectedProduct: this.state.selectedProductId,
            selectedStore: this.state.selectedStoreId

        })
    }

    loadData = () => {
        let options_customers = [];
        let options_products = [];
        let options_store = [];
        $.ajax({
            url: "http://localhost:61419/customer/GetAllCustomerDetails",
            type: "GET",
            dataType: 'json',
            ContentType: 'application/json',
            success: function (data) {

                data.map((item) => options_customers.push({
                    key: item.id,
                    text: item.name,
                    value: item.name
                }))
                this.setState({
                    customerOptions: options_customers

                });

            }.bind(this),
            error: function (jqXHR) {
                console.log(jqXHR);
            }.bind(this)
        })
        $.ajax({
            url: "http://localhost:61419/product/GetAllProductDetails",
            type: "GET",
            dataType: 'json',
            ContentType: 'application/json',
            success: function (data) {
                data.map((item) => options_products.push({
                    key: item.id,
                    text: item.name,
                    value: item.name
                }))
                this.setState({ productOptions: options_products });
            }.bind(this),
            error: function (jqXHR) {
                console.log(jqXHR);
            }.bind(this)
        })
        $.ajax({
            url: "http://localhost:61419/store/GetAllStoreDetails",
            type: "GET",
            dataType: 'json',
            ContentType: 'application/json',
            success: function (data) {
                data.map((item) => options_store.push({
                    key: item.id,
                    text: item.name,
                    value: item.name
                }))
                this.setState({ storeOptions: options_store });
            }.bind(this),
            error: function (jqXHR) {
                console.log(jqXHR);
            }.bind(this)
        })

    }

    onChange = (event, type) => {
        let s = {};
        s[type] = event.target.value;
        this.setState(s);
        console.log("onchange value", event.target.value);
    }


    onChangeCustomer = (event, data) => {

        let value = '';
        let select = [];

        value = data.value;

        select = data.options.find(o => o.value === value);


        console.log("onchangecustomre key", select.key);

        this.setState({
            customerName: value,
            selectedCustomerId: select.key
        });


    }

    onChangeProduct = (event, data) => {
        let select = [];
        const value = data.value;
        select = data.options.find(o => o.value === value);
        console.log("onchangeproduct", select.key);
        this.setState({
            productName:value,
            selectedProductId: select.key
        });

    }

    onChangeStore = (event, data) => {
        let select = [];
        const value = data.value;
        select = data.options.find(o => o.value === value);
        console.log("onchangestore", select.key);
        this.setState({
            storeName: value,
            selectedStoreId: select.key
        });
    }

    editSale = () => {
        let data = {
            'ProductId': this.state.selectedProductId,
            'CustomerId': this.state.selectedCustomerId,
            'StoreId': this.state.selectedStoreId,
            'DateSold': this.state.date
        };

        $.ajax({
            url: 'http://localhost:61419/sales/EditSales',
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
        const { open, dimmer, date, customerName,productName,storeName, customerOptions, productOptions, storeOptions } = this.state
        return (
            <React.Fragment>
                <Button color='yellow' onClick={this.show('blurring')}>
                    <i className="edit icon"></i>Edit</Button>
                <Modal size={'small'} dimmer={dimmer} open={open} onClose={this.close}>
                    <Modal.Header>Create sales</Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.Field>
                                <label>Date Sold</label>
                                <input placeholder='date' name='date' value={date} onChange={(event) => { this.onChange(event, 'date') }} />
                            </Form.Field>
                            <Form.Select fluid label='Customer' name='customerName' value={customerName} options={customerOptions} onChange={this.onChangeCustomer} />
                            <Form.Select fluid label='Product' name='productName' value={productName} options={productOptions} onChange={this.onChangeProduct} />
                            <Form.Select fluid label='Store' name='storeName' value={storeName} options={storeOptions} onChange={this.onChangeStore} />
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
                            onClick={this.editSale}
                        />
                    </Modal.Actions>
                </Modal>
            </React.Fragment>
        )
    }

}
export default EditSaleModal;