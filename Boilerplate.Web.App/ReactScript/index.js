
import React from 'react';
import ReactDOM from 'react-dom';
import App from './Component/App.jsx';
import 'semantic-ui-css/semantic.min.css';

import './style/myStyle.css';


ReactDOM.render(<App />, document.getElementById("root"));

/*function renderApp() {
    render(
        <App/>,
        document.getElementById("root")
    );
}
renderApp();*/

// Allow Hot Module Replacement
if (module.hot) {
    module.hot.accept();
    //module.hot.accept('./routes', () => { const NextApp = require('./routes').default; renderApp(); });
}