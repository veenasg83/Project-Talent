import React, { Component } from 'react';
import '../style/myStyle.css';
import { Icon, Table, Button, Header, Image, Modal, Pagination } from 'semantic-ui-react'
import NewCustomerModal from './NewCustomerModal';
import EditCustomerModal from './EditCustomerModal';
import DeleteCustomerModal from './DeleteCustomerModal';
import _ from 'lodash';



class Customer extends Component {

    state = {
        column: null,        
        direction: null,
        data: []
    };

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
            <React.Fragment>

                <div className = "newButton">
                 <NewCustomerModal name="New Customer" />
            </div>


                <div  className="dataTable">
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
                            {this.state.data.map((item) =>

                                <Table.Row key={item.id}>
                                    <Table.Cell>{item.name}</Table.Cell>
                                    <Table.Cell>{item.address}</Table.Cell>
                                    <Table.Cell>
                                        <EditCustomerModal customer={item}/>                                      
                                    </Table.Cell>
                                    <Table.Cell>
                                        <DeleteCustomerModal customerId={item.id}/>
                                      
                                    </Table.Cell> 
                                </Table.Row>

                        )}

                    </Table.Body>
                </Table>
                </div>
                   
              
                </React.Fragment>           
 
                    
               )
           }
}

export default Customer