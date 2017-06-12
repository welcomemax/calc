import { Provider } from 'react-redux'
//import { Router, browserHistory } from 'react-router'
//import RootRouter from './router.jsx'
import configureStore from './store/configure-store.jsx'

import Calc from './components/calc/control.jsx';

const store = configureStore({});
ReactDOM.render(
    <Provider store={store}>
        <Calc />
    </Provider>,
    document.getElementById('root')
);