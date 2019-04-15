import React, { Component } from 'react';
import { Icon, Table, Button, Header, Image, Modal } from 'semantic-ui-react'
import NewStoreModal from './NewStoreModal.jsx'
import EditStoreModal from './EditStoreModal.jsx'
import DeleteStoreModal from './DeleteStoreModal.jsx'
import Pagination from 'semantic-ui-react-button-pagination';

class Store extends Component {
    state = {
        column: null,
        direction: null,
        data: [],
        paginateddata: [],
        offset: 0,
        limit: 10
    };
    componentDidMount() {
        this.loadStoreData();
    }

    loadStoreData = () => {
        let baseUrl = location.protocol + '//' + location.host;

        $.ajax({
            url: baseUrl+"/store/GetAllStoreDetails",
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
                    <NewStoreModal name="New Store" loadStoreData={this.loadStoreData} />
                </div>
                <div className="dataTable">
                    <Table  sortable striped celled fixed>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell
                                    sorted={column === 'name' ? direction : null}
                                    onClick={this.handleSort('name')}
                                >Name</Table.HeaderCell>
                                <Table.HeaderCell
                                    sorted={column === 'address' ? direction : null}
                                    onClick={this.handleSort('address')}    
                                >Address</Table.HeaderCell>
                                <Table.HeaderCell>Action</Table.HeaderCell>
                                <Table.HeaderCell>Action</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {paginateddata.map((item) =>

                                <Table.Row key={item.id}>
                                    <Table.Cell>{item.name}</Table.Cell>
                                    <Table.Cell>{item.address}</Table.Cell>
                                    <Table.Cell>
                                        <EditStoreModal store={item} loadStoreData={this.loadStoreData} />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <DeleteStoreModal storeId={item.id} loadStoreData={this.loadStoreData}/> 


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

export default Store