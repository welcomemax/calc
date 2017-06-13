import 'material-design-lite/dist/material.min.js';
import 'material-design-lite/dist/material.min.css';

import './style.less';

import CalcKey from '../calc-key/control.jsx';
import CalcDisplay from '../calc-display/control.jsx';

// TODO перенести маппер
//import './key-mapper.jsx';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from './actions.jsx';

class Calculator extends React.Component {

    handleKeyDown = (event) => {
        let store = this.props.store;
        let actions = this.props.actions;

        let { key } = event;

        if (NODE_ENV == 'dev')
            console.log('key pressed: ' + key);

        if (event.ctrlKey || event.metaKey)
            return;

        if (key === 'Enter')
            key = '=';

        if ((/\d/).test(key)) {
            actions.setInput(store.inputVal, key)
        } else if (key in ['+', '-', '/', '*']) {
            actions.setOperator(key, store.inputVal)
        } else if (key === '.') {
            actions.setInput(store.inputVal,'.')
        } else if (key === '%') {
            actions.setInput(+store.inputVal, '%')
        } else if (key === 'Backspace') {
            event.preventDefault();
            actions.setInput(store.inputVal.substring(0, store.inputVal.length - 1) || '')
        } else if (key === 'Clear') {
            event.preventDefault();
            actions.setInput('')
        } else if (key === '=') {
            actions.execute(store.prevVal, store.inputVal, store.operator)
        }
    };

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown)
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyDown)
    }

    render() {
        let store = this.props.store;
        let actions = this.props.actions;

        if (NODE_ENV == 'dev')
            console.log(store);

        return (
            <div id="wrapper" className="calc">
                <CalcDisplay value={ store.inputVal }/>
                <div className="calc-keypad">
                    <div className="input-keys">
                        <div className="function-keys">
                            <CalcKey className="key-clear" onClick={() => actions.setInput(store.inputVal,'')}>C</CalcKey>
                            <CalcKey className="key-sign" onClick={() => actions.changeSign(store.inputVal)}>±</CalcKey>
                            <CalcKey className="key-percent" onClick={() => actions.setInput(+store.inputVal,'%')}>%</CalcKey>
                        </div>
                        <div className="digit-keys">
                            <CalcKey className="key-0" onClick={() => actions.setInput(store.inputVal,0)}>0</CalcKey>
                            <CalcKey className="key-dot" onClick={() => actions.setInput(store.inputVal,'.')}>●</CalcKey>
                            <CalcKey className="key-1" onClick={() => actions.setInput(store.inputVal,1)}>1</CalcKey>
                            <CalcKey className="key-2" onClick={() => actions.setInput(store.inputVal,2)}>2</CalcKey>
                            <CalcKey className="key-3" onClick={() => actions.setInput(store.inputVal,3)}>3</CalcKey>
                            <CalcKey className="key-4" onClick={() => actions.setInput(store.inputVal,4)}>4</CalcKey>
                            <CalcKey className="key-5" onClick={() => actions.setInput(store.inputVal,5)}>5</CalcKey>
                            <CalcKey className="key-6" onClick={() => actions.setInput(store.inputVal,6)}>6</CalcKey>
                            <CalcKey className="key-7" onClick={() => actions.setInput(store.inputVal,7)}>7</CalcKey>
                            <CalcKey className="key-8" onClick={() => actions.setInput(store.inputVal,8)}>8</CalcKey>
                            <CalcKey className="key-9" onClick={() => actions.setInput(store.inputVal,9)}>9</CalcKey>
                        </div>
                    </div>
                    <div className="operator-keys">
                        <CalcKey className="key-divide" onClick={() => actions.setOperator('/', store.inputVal)}>÷</CalcKey>
                        <CalcKey className="key-multiply" onClick={() => actions.setOperator('*', store.inputVal)}>×</CalcKey>
                        <CalcKey className="key-subtract" onClick={() => actions.setOperator('-', store.inputVal)}>−</CalcKey>
                        <CalcKey className="key-add" onClick={() => actions.setOperator('+', store.inputVal)}>+</CalcKey>
                        <CalcKey className="key-equals" onClick={() => actions.execute(store.prevVal, store.inputVal, store.operator)}>=</CalcKey>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps (state) {
    return { store: state.calc }
}
function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(Actions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Calculator)