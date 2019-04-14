import React, { Component } from 'react';
import { Icon, Table, Button, Header, Image, Modal } from 'semantic-ui-react'
import NewProductModal from './NewProductModal';
import EditProductModal from './EditProductModal.jsx';
import DeleteProductModal from './DeleteProductModal.jsx';

class Product extends Component {
    state = {
        column: null,
        direction: null,
        data: []
    };

    componentDidMount() {
        this.loadProductData();
    }

    loadProductData = () => {

        let baseUrl = location.protocol + '//' + location.host;

        $.ajax({
            url: baseUrl+"/product/GetAllProductDetails",
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
                    <NewProductModal name="New Product" loadProductData={this.loadProductData} />
                </div>

                <div className="dataTable">
                    <Table sortable striped celled fixed>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell
                                    sorted={column === 'name' ? direction : null}
                                    onClick={this.handleSort('name')}     
                                >Name</Table.HeaderCell>
                                <Table.HeaderCell
                                    sorted={column === 'price' ? direction : null}
                                    onClick={this.handleSort('price')}
                                >Price</Table.HeaderCell>
                                <Table.HeaderCell>Actions</Table.HeaderCell>
                                <Table.HeaderCell>Actions</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {this.state.data.map((item) =>

                                <Table.Row key={item.id}>
                                    <Table.Cell>{item.name}</Table.Cell>
                                    <Table.Cell>{item.price}</Table.Cell>
                                    <Table.Cell>
                                        <EditProductModal product={item} loadProductData={this.loadProductData}  />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <DeleteProductModal productId={item.id} loadProductData={this.loadProductData} />


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

export default Product