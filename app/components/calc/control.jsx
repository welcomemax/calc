import 'material-design-lite/dist/material.min.js';
import 'material-design-lite/dist/material.min.css';
import './style.less';
import CalcKey from '../calc-key/control.jsx';
import CalcDisplay from '../calc-display/control.jsx';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from './actions.jsx';

class Calculator extends React.Component {
    render() {
        let store = this.props.store;
        let actions = this.props.actions;

        console.log(store);

        return (
            <div id="wrapper" className="calc">
                <CalcDisplay value={ store.inputVal }/>
                <div className="calc-keypad">
                    <div className="input-keys">
                        <div className="function-keys">
                            <CalcKey className="key-clear" onClick={() => actions.setInputVal('')}>C</CalcKey>
                            <CalcKey className="key-sign" onClick={() => actions.setInputVal(store.inputVal)}>±</CalcKey>
                            <CalcKey className="key-percent" onClick={() => actions.setInputVal(+store.inputVal / 100)}>%</CalcKey>
                        </div>
                        <div className="digit-keys">
                            <CalcKey className="key-0" onClick={() => actions.setInputVal(store.inputVal + 0)}>0</CalcKey>
                            <CalcKey className="key-dot" onClick={() => actions.setInputVal(store.inputVal + '.')}>●</CalcKey>
                            <CalcKey className="key-1" onClick={() => actions.setInputVal(store.inputVal + 1)}>1</CalcKey>
                            <CalcKey className="key-2" onClick={() => actions.setInputVal(store.inputVal + 2)}>2</CalcKey>
                            <CalcKey className="key-3" onClick={() => actions.setInputVal(store.inputVal + 3)}>3</CalcKey>
                            <CalcKey className="key-4" onClick={() => actions.setInputVal(store.inputVal + 4)}>4</CalcKey>
                            <CalcKey className="key-5" onClick={() => actions.setInputVal(store.inputVal + 5)}>5</CalcKey>
                            <CalcKey className="key-6" onClick={() => actions.setInputVal(store.inputVal + 6)}>6</CalcKey>
                            <CalcKey className="key-7" onClick={() => actions.setInputVal(store.inputVal + 7)}>7</CalcKey>
                            <CalcKey className="key-8" onClick={() => actions.setInputVal(store.inputVal + 8)}>8</CalcKey>
                            <CalcKey className="key-9" onClick={() => actions.setInputVal(store.inputVal + 9)}>9</CalcKey>
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