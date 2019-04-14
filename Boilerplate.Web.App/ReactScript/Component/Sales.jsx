import React, { Component } from 'react';
import { Icon, Table, Button, Header, Image, Modal } from 'semantic-ui-react'
import NewSaleModal from './NewSaleModal';
import EditSaleModal from './EditSaleModal.jsx';
import DeleteSaleModal from './DeleteSaleModal.jsx';


class Sales extends Component {
    

    state = {
        column: null,
        direction: null,
        data: []
    };

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

    handleSort = clickedColumn => () => {
        const { column, data, direction } = this.state

        if (column !== clickedColumn) {
            this.setState({
                column: clickedColumn,
                data: _.sortBy(data, [clickedColumn]),
                direction: 'ascending',
            })

            return
        }
        this.setState({
            data: data.reverse(),
            direction: direction === 'ascending' ? 'descending' : 'ascending',
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

        const { column, data, direction } = this.state
        return (
            <div id="parent">
                <div className="newButton">
                    <NewSaleModal name="New Sale" /></div>


                <div className="dataTable">
                    <Table sortable striped celled fixed>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell
                                    sorted={column === 'customer' ? direction : null}
                                    onClick={this.handleSort('customer')}    
                                >Customer</Table.HeaderCell>
                                <Table.HeaderCell
                                    sorted={column === 'product' ? direction : null}
                                    onClick={this.handleSort('product')}    
                                >Product</Table.HeaderCell>
                                <Table.HeaderCell
                                    sorted={column === 'store' ? direction : null}
                                    onClick={this.handleSort('store')}    
                                >Store</Table.HeaderCell>
                                <Table.HeaderCell
                                    sorted={column === 'datesold' ? direction : null}
                                    onClick={this.handleSort('datesold')}    
                                >Date Sold</Table.HeaderCell>
                                <Table.HeaderCell>Actions</Table.HeaderCell>
                                <Table.HeaderCell>Actions</Table.HeaderCell>
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
                                        <DeleteSaleModal saleId={item.id}/>                                  
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