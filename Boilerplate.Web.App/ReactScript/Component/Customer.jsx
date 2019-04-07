import React, { Component } from 'react';
import { Icon, Table, Button, Header, Image, Modal } from 'semantic-ui-react'
import NewCustomerModal from './NewCustomerModal';
import EditCustomerModal from './EditCustomerModal';


class Customer extends Component {
    constructor() {
        super();
        this.state = {
            data: []
        }
    }
    componentDidMount() {
        $.ajax({
            url: "http://localhost:61419/customer/GetAllCustomerDetails",
            type: "GET",
            dataType: 'json',
            ContentType: 'application/json',
            success: function (data) {

                this.setState({ data: data });
            }.bind(this),
            error: function (jqXHR) {
                console.log(jqXHR);
            }.bind(this)
        })
    }
    render() {


        return (
            <div id="parent">
             
               
            <div>
                    <NewCustomerModal name="New Customer" />
            </div>


                <div id='container'>
                    <Table striped celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Address</Table.HeaderCell>
                            <Table.HeaderCell>Action</Table.HeaderCell>
                                <Table.HeaderCell>Action</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                        <Table.Body>
                            {this.state.data.map((item) =>

                                <Table.Row key={item.id}>
                                    <Table.Cell>{item.name}</Table.Cell>
                                    <Table.Cell>{item.address}</Table.Cell>
                                    <Table.Cell>
                                        <EditCustomerModal customer={item}/>
                                      
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Button color='red' >
                                            <i className="trash icon"></i>DELETE</Button>
                                    </Table.Cell> 
                                </Table.Row>

                        )}

                    </Table.Body>
                </Table>
                </div>
                </div>           
 
                    
               )
           }
}

export default Customer