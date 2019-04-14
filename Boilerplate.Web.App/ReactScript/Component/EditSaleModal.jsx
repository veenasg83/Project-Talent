import React, { Component } from 'react'
import { Button, Header, Image, Modal, Form } from 'semantic-ui-react'

class EditSaleModal extends Component {
    state = {
        open: false,
        date: this.props.sale.dateSold,
        saleid: this.props.sale.id,
        customerName: this.props.sale.customer.name,
        productName: this.props.sale.product.name,
        storeName: this.props.sale.store.name,
        customerOptions: [],
        productOptions: [],
        storeOptions: [],
        selectedCustomerId: this.props.sale.customer.id,
        selectedProductId: this.props.sale.product.id,
        selectedStoreId: this.props.sale.store.id
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
        let baseUrl = location.protocol + '//' + location.host;
        $.ajax({
            url: baseUrl + "/customer/GetAllCustomerDetails",
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
            url: baseUrl +"/product/GetAllProductDetails",
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
            url: baseUrl +"/store/GetAllStoreDetails",
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
        let s = '';
        s = event.target.value;
        this.setState({ date: s });
        console.log("onchange value", event.target.value);
        console.log(s);
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
            'id': this.state.saleid,
            'productid': this.state.selectedProductId,
            'customerid': this.state.selectedCustomerId,
            'storeid': this.state.selectedStoreId,
            'datesold': this.state.date
        };

        let baseUrl = location.protocol + '//' + location.host;

        $.ajax({
            url: baseUrl+'/sales/EditSales',
            type: 'PUT',
            data: JSON.stringify(data),
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8',
            success: function (data) {
                this.props.loadSaleData();
                this.close();
            }.bind(this)
        });
    }

    formatDate = (dateString) => {
        

        let date = new Date(dateString);
        let formattedDate = (date.getMonth()+1) + "/" + date.getDate() + '/ '  + date.getFullYear();
        return formattedDate;
    }


    render() {
        const { open, dimmer, date, customerName,productName,storeName, customerOptions, productOptions, storeOptions } = this.state
        return (
            <React.Fragment>
                <Button color='yellow' onClick={this.show('blurring')}>
                    <i className="edit icon"></i>Edit</Button>
                <Modal size={'small'} dimmer={dimmer} open={open} onClose={this.close}>
                    <Modal.Header>Edit sales</Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.Field>
                                <label>Date Sold</label>
                                <input name='date' value={this.formatDate(date)} onChange={(event) => { this.onChange(event, 'date') }} />
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