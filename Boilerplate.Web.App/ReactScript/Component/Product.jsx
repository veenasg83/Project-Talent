import React, { Component } from 'react';
import { Icon, Table, Button, Header, Image, Modal } from 'semantic-ui-react'
import NewProductModal from './NewProductModal';
import EditProductModal from './EditProductModal.jsx';
import DeleteProductModal from './DeleteProductModal.jsx';
import Pagination from 'semantic-ui-react-button-pagination';
import _ from 'lodash';

class Product extends Component {
    state = {
        column: null,
        direction: null,
        data: [],
        paginateddata: [],
        offset: 0,
        limit:10
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

    formatPrice(price){
        let formattedPrice = '';
        formattedPrice = "$" + price;
        return formattedPrice;

    }

    prepareTableData = (offset) => {
        let tableData = [];
        for (var i = offset; (i < (offset + this.state.limit) && (i < this.state.data.length)); i++) {
            tableData.push(this.state.data[i]);
        }
        this.setState({ paginateddata: tableData });
    }

    handleClick(offset){
        this.setState({ offset: offset });
        this.prepareTableData(offset);
    }


    render() {

        const { column, data, direction,paginateddata } = this.state
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
                            {paginateddata.map((item) =>

                                <Table.Row key={item.id}>
                                    <Table.Cell>{item.name}</Table.Cell>
                                    <Table.Cell>{this.formatPrice(item.price)}</Table.Cell>
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

export default Product