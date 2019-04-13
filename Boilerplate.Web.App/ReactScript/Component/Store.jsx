import React, { Component } from 'react';
import { Icon, Table, Button, Header, Image, Modal } from 'semantic-ui-react'
import NewStoreModal from './NewStoreModal.jsx'
import EditStoreModal from './EditStoreModal.jsx'
import DeleteStoreModal from './DeleteStoreModal.jsx'

class Store extends Component {
    constructor() {
        super();
        this.state = {
            data: []
        }
    }
    componentDidMount() {
        $.ajax({
            url: "http://localhost:61419/store/GetAllStoreDetails",
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
                <div className="newButton">
               <NewStoreModal name="New Store" />
                </div>
                <div className="dataTable">
                    <Table  striped celled>
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
                                        <EditStoreModal store={item} />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <DeleteStoreModal storeId={item.id}/> 


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