import React, { Component } from 'react';
import '../style/myStyle.css';
import { Icon, Table, Button, Header, Image, Modal, Menu } from 'semantic-ui-react'
import NewCustomerModal from './NewCustomerModal';
import EditCustomerModal from './EditCustomerModal';
import DeleteCustomerModal from './DeleteCustomerModal';
import _ from 'lodash';
import Pagination from 'semantic-ui-react-button-pagination';


class Customer extends Component {

    state = {
        column: null,
        direction: null,
        data: [],
        paginateddata: [],
        offset: 0,
        limit: 2
    };

    componentDidMount() {
        
        this.loadCustomerData();
    }

    loadCustomerData = () => {
        let baseUrl = location.protocol + '//' + location.host;
        $.ajax({
            url: baseUrl + "/customer/GetAllCustomerDetails",
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

    prepareTableData = (offset) => {        
        let tableData = [];
        for (var i = offset; (i < (offset + this.state.limit) && (i < this.state.data.length)); i++) {
            tableData.push(this.state.data[i]);
        }      
        this.setState({ paginateddata: tableData });
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

    handleClick(offset) {
        console.log('Inside offset '+offset);
        this.setState({ offset: offset });
        this.prepareTableData(offset);
    }

    render() {

        const { column, data, direction, offset, limit, paginateddata } = this.state
        return (
            <React.Fragment>

                <div className="newButton">
                    <NewCustomerModal name="New Customer" loadCustomerData={this.loadCustomerData}/>
                </div>


                <div className="dataTable">
                    <Table sortable striped celled fixed>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell
                                    sorted={column === 'name' ? direction : null}
                                    onClick={this.handleSort('name')}
                                >
                                    Name</Table.HeaderCell>
                                <Table.HeaderCell
                                    sorted={column === 'address' ? direction : null}
                                    onClick={this.handleSort('address')}
                                >Address</Table.HeaderCell>
                                <Table.HeaderCell>Action</Table.HeaderCell>
                                <Table.HeaderCell>Action</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body >
                            {paginateddata.map((item) =>

                                <Table.Row key={item.id}>
                                    <Table.Cell>{item.name}</Table.Cell>
                                    <Table.Cell>{item.address}</Table.Cell>
                                    <Table.Cell>
                                        <EditCustomerModal customer={item} loadCustomerData={this.loadCustomerData} />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <DeleteCustomerModal customerId={item.id} loadCustomerData={this.loadCustomerData} />

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
                    primary = 'true'
                    onClick={(e, props, offset) => this.handleClick(offset)}
                />
            </React.Fragment>


        )
    }
}

export default Customer