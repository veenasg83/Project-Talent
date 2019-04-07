
import React, { Component } from 'react';
import { Menu, Segment } from 'semantic-ui-react'

import Customer from './Customer.jsx';


class App extends Component {

    state = { activeItem: 'customers' }


    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name })
    }

    render() {
        const { activeItem } = this.state
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
                <Customer />
            </div>
        );
    }

}

export default App;

   