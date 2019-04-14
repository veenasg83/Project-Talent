import React, { Component } from 'react';
import { Icon, Table, Button, Header, Image, Modal } from 'semantic-ui-react'
import NewStoreModal from './NewStoreModal.jsx'
import EditStoreModal from './EditStoreModal.jsx'
import DeleteStoreModal from './DeleteStoreModal.jsx'

class Store extends Component {
    state = {
        column: null,
        direction: null,
        data: []
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
    render() {

        const { column, data, direction } = this.state
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
                            {this.state.data.map((item) =>

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
            </div>


        )
    }
}

export default Store