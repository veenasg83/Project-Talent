import React, { Component } from 'react';
import { Icon, Table, Button, Header, Image, Modal } from 'semantic-ui-react'
import NewSaleModal from './NewSaleModal';
import EditSaleModal from './EditSaleModal.jsx';


class Sales extends Component {
    

    constructor() {
        super();
        this.state = {
            data: []
        }
    }
    componentDidMount() {
        $.ajax({
            url: "http://localhost:61419/sales/GetAllSalesDetails",
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


    formatDate = (dateString) => {
        let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
    "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
        
        console.log(dateString);
        let date = new Date(dateString);
        let formattedDate = date.getDay() + ' ' + monthNames[date.getMonth()] + "," + date.getFullYear();
        return formattedDate;
    }

    render() {


        return (
            <div id="parent">
                <div> <NewSaleModal name="New Sale"/></div>


                <div id='container'>
                    <Table striped celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Customer</Table.HeaderCell>
                                <Table.HeaderCell>Product</Table.HeaderCell>
                                <Table.HeaderCell>Store</Table.HeaderCell>
                                <Table.HeaderCell>Date Sold</Table.HeaderCell>
                                <Table.HeaderCell>Action</Table.HeaderCell>
                                <Table.HeaderCell>Action</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {this.state.data.map((item) =>

                                <Table.Row key={item.id}>
                                    <Table.Cell>{item.customer.name}</Table.Cell>
                                    <Table.Cell>{item.product.name}</Table.Cell>
                                    <Table.Cell>{item.store.name}</Table.Cell>
                                    <Table.Cell>{this.formatDate(item.dateSold)}</Table.Cell>
                                    <Table.Cell>
                                        <EditSaleModal sale={item}/>


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

export default Sales