import React, { Component } from 'react';
import { Icon, Table, Button, Header, Image, Modal } from 'semantic-ui-react'
import NewSaleModal from './NewSaleModal';
import EditSaleModal from './EditSaleModal.jsx';
import DeleteSaleModal from './DeleteSaleModal.jsx';
import Pagination from 'semantic-ui-react-button-pagination';

class Sales extends Component {
    

    state = {
        column: null,
        direction: null,
        data: [],
        paginateddata: [],
        offset: 0,
        limit: 10
    };

    componentDidMount() {
        this.loadSaleData();
    }

    loadSaleData = () => {
        let baseUrl = location.protocol + '//' + location.host;

        $.ajax({
            url: baseUrl+"/sales/GetAllSalesDetails",
            type: "GET",
            dataType: 'json',
            ContentType: 'application/json',
            success: function (data) {

                this.setState({ data: data });
                this.prepareTableData(this.state.offset);
            }.bind(this),
            error: function (jqXHR) {
                console.log(jqXHR);
            }.bind(this)
        })
    }

    handleSort = clickedColumn => () => {
        const { column, paginateddata, direction } = this.state

        if (column !== clickedColumn) {
            this.setState({
                column: clickedColumn,
                paginateddata: _.sortBy(paginateddata, [clickedColumn]),
                direction: 'ascending',
            })

            return
        }
        this.setState({
            paginateddata: paginateddata.reverse(),
            direction: direction === 'ascending' ? 'descending' : 'ascending',
        })
    }


    formatDate = (dateString) => {
        let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
    "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
        
        let date = new Date(dateString);
        let formattedDate = date.getDate() + ' ' + monthNames[date.getMonth()] + "," + date.getFullYear();
        return formattedDate;
    }

    prepareTableData = (offset) => {
        let tableData = [];
        for (var i = offset; (i < (offset + this.state.limit) && (i < this.state.data.length)); i++) {
            tableData.push(this.state.data[i]);
        }
        this.setState({ paginateddata: tableData });
    }

    handleClick(offset) {
        this.setState({ offset: offset });
        this.prepareTableData(offset);
    }

    render() {

        const { column, paginateddata, direction } = this.state
        return (
            <div id="parent">
                <div className="newButton">
                    <NewSaleModal name="New Sale" loadSaleData={this.loadSaleData}/></div>


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
                                       
                                >Date Sold</Table.HeaderCell>
                                <Table.HeaderCell>Actions</Table.HeaderCell>
                                <Table.HeaderCell>Actions</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {paginateddata.map((item) =>

                                <Table.Row key={item.id}>
                                    <Table.Cell>{item.customer.name}</Table.Cell>
                                    <Table.Cell>{item.product.name}</Table.Cell>
                                    <Table.Cell>{item.store.name}</Table.Cell>
                                    <Table.Cell>{this.formatDate(item.dateSold)}</Table.Cell>
                                    <Table.Cell>
                                        <EditSaleModal sale={item} loadSaleData={this.loadSaleData}/>


                                    </Table.Cell>
                                    <Table.Cell>
                                        <DeleteSaleModal saleId={item.id} loadSaleData={this.loadSaleData}/>                                  
                                    </Table.Cell>
                                </Table.Row>

                            )}

                        </Table.Body>
                    </Table>
                </div>
                <Pagination floated='right'
                    offset={this.state.offset}
                    limit={this.state.limit}
                    total={this.state.data.length}
                    primary={true}
                    onClick={(e, props, offset) => this.handleClick(offset)}
                />
            </div>


        )
    }
}

export default Sales