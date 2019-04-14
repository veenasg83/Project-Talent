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
        selectedCustomerId: 0,
        selectedProductId: 0,
        selectedStoreId:0
       
    }

    show = dimmer => () => {
        this.setState({
            open: true,
            dimmer,
            date: this.state.date,
            customer: this.state.customer,
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
            customer: this.state.customer,
            selectedCustomerId: this.state.selectedCustomerId,
            selectedProduct: this.state.selectedProductId,
            selectedStore: this.state.selectedStoreId       

        })
    }


    createSales = () => {
               let data = {
                   'datesold': this.state.date,
                   'customerid': this.state.selectedCustomerId,
                   'productid': this.state.selectedProductId,
                   'storeid': this.state.selectedStoreId
                
               };
        
        let baseUrl = location.protocol + '//' + location.host;
        $.ajax({
            
            url: baseUrl + "/Sales/CreateSales",
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
            url: baseUrl + "/product/GetAllProductDetails",
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
            url: baseUrl + "/store/GetAllStoreDetails",
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
   
        this.setState({ selectedCustomerId: select.key });
     
        
    }

    onChangeProduct = (event, data) => {
        let select = [];
        const value = data.value;
         select = data.options.find(o => o.value === value);       
        console.log("onchangeproduct", select.key);
        this.setState({ selectedProductId: select.key });
   
    }

    onChangeStore = (event, data) => {
        let select = [];
        const value = data.value;
         select = data.options.find(o => o.value === value);
        console.log("onchangestore", select.key);
        this.setState({ selectedStoreId: select.key });
    }


    
    createNewSale = () => {
        let data = {
           
            
            'ProductId': this.state.selectedProductId,
            'CustomerId': this.state.selectedCustomerId,
            'StoreId': this.state.selectedStoreId,
            'DateSold': this.state.date
        };
        let baseUrl = location.protocol + '//' + location.host;

        $.ajax({
            url: baseUrl+"/sales/CreateSales",
            type: "POST",
            data: JSON.stringify(data),
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8',
            success: function (response) {             
                this.props.loadSaleData();
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
                            <Form.Select fluid label='Customer' name='customerName' options={customerOptions} onChange={this.onChangeCustomer} />
                            <Form.Select fluid label='Product' name='productName' options={productOptions} onChange={this.onChangeProduct} />
                            <Form.Select fluid label='Store' name='storeName'  options={storeOptions} onChange={this.onChangeStore} />
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
