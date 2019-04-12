import React from 'react'
import { Button, Header, Image, Modal,Form } from 'semantic-ui-react'



class NewSaleModal extends React.Component {
    state = {   
        open: false,
        date: '',
        customer: [],
        customerOptions: [],
        productOptions: [],
        storeOptions: [],
        selectedCustomer: {
            key: '',
            text: '',
            value: ''
        },
        selectedProduct: {
            key: '',
            text: '',
            value: ''
        },
        selectedStore: {
            key: '',
            text: '',
            value: ''
        },
       
    }

    show = dimmer => () => {
        this.setState({
            open: true,
            dimmer,
            date: this.state.date,
            customer: this.state.customer,
            selectedCustomer: this.state.selectedCustomer,
            selectedProduct: this.state.selectedProduct,
            selectedStore: this.state.selectedStore,
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
            customer: this.state.customer,
            selectedCustomer: this.state.selectedCustomer,
            selectedProduct: this.state.selectedProduct,
            selectedStore: this.state.selectedStore       

        })
    }


    createSales = () => {
               let data = {
                   'datesold': this.state.date,
                   'customerid': this.state.selectedCustomer.key,
                   'productid': this.state.selectedProduct.key,
                   'storeid': this.state.selectedStore.key
                
               };
        console.log(data);
       
        $.ajax({
            url: "http://localhost:61419/Sales/CreateSales",
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
                    value:item.name
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
        console.log(options_store);
    }

    onChange = (event, type) => {
        let s = {};
        s[type] = event.target.value;
        this.setState(s);
        console.log("onchange value", event.target.value);
    }


    onChangeCustomer = (event, data) => {  
        
        let customer = {
            selectedCustomer: null
        }
        const value = data.value;
        const key = data.options.find(o => o.value === value);
 
        customer.selectedCustomer = key;
        
        this.setState(customer)
    }

    onChangeProduct = (event, data) => {    
        let product = {
            selectedProduct: null
        }
        const value = data.value;
        const key = data.options.find(o => o.value === value);

        product.selectedProduct = key;

        this.setState(product)
   
    }

    onChangeStore = (event, data) => {
        let store = {
            selectedStore: null
        }
        const value = data.value;
        const key = data.options.find(o => o.value === value);

        store.selectedStore = key;

        this.setState(store)
    }


    
    createNewSale = () => {
        let data = {
            date: this.state.date,
            'name': this.state.selectedCustomer.id,
            'product': this.state.selectedProduct.id,
            'store': this.state.selectedStore.id
        };
        console.log("from createsale",data);

        $.ajax({
            url: "http://localhost:61419/sales/CreateSales",
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
    

     
    render() {
        const { open, dimmer, date, customer, selectedCustomer, selectedProduct, selectedStore, customerOptions, productOptions, storeOptions } = this.state
        return (
                 <React.Fragment>
                <Button primary onClick={this.show('blurring')}>New Sale</Button>
                <Modal size={'small'} dimmer={dimmer} open={open} onClose={this.close}>
                            <Modal.Header>Create sales</Modal.Header>
                            <Modal.Content>
                                <Form>
                                    <Form.Field>
                                <label>Date Sold</label>
                                <input placeholder='date' name='date' value={date} onChange={(event) => { this.onChange(event, 'date') }} />
                            </Form.Field>
                            <Form.Select fluid label='Customer' name='customerName' key={selectedCustomer.id} value={selectedCustomer.value} options={customerOptions} onChange={this.onChangeCustomer} />
                            <Form.Select fluid label='Product' name='productName' key={selectedProduct.id} value={selectedProduct.value} options={productOptions} onChange={this.onChangeProduct} />
                            <Form.Select fluid label='Store' name='storeName' key={selectedStore.id} value={selectedStore.value} options={storeOptions} onChange={this.onChangeStore} />
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
                                            onClick={this.createNewSale}
                                        />
                            </Modal.Actions>
                         </Modal>
                 </React.Fragment>
                )
        }
}

export default NewSaleModal
