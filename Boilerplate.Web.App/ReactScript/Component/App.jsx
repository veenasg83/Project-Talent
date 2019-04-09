
import React, { Component } from 'react';
import { Menu, Segment } from 'semantic-ui-react'

import Customer from './Customer.jsx';
import Product from './Product.jsx';
import Store from './Store.jsx';


class App extends Component {

    state = { activeItem: 'customers' }


    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name })
    }

    render() {
        const { activeItem } = this.state
        let mainPage;
        if (activeItem == 'customers')
        {
            mainPage = <Customer/>;
        }
        else if(activeItem == 'products')
        {
            mainPage = <Product/>;
        }
        else if(activeItem == 'stores')
        {
            mainPage = <Store/>;
        }
 

        return (
            <div>
                <Segment inverted>
                    <Menu inverted pointing secondary>
                        <Menu.Item name='React' />
                        <Menu.Item
                            name='customers'
                            active={activeItem === 'customers'}
                            onClick={this.handleItemClick}
                        />
                        <Menu.Item
                            name='products'
                            active={activeItem === 'products'}
                            onClick={this.handleItemClick}
                        />
                        <Menu.Item
                            name='stores'
                            active={activeItem === 'stores'}
                            onClick={this.handleItemClick}
                        />
                        <Menu.Item
                            name='sales'
                            active={activeItem === 'sales'}
                            onClick={this.handleItemClick}
                        />
                    </Menu>
                </Segment>
                {mainPage}
            </div>
        );
    }

}

export default App;

   