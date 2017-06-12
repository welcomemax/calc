'use strict';

import './styles.less'

class CalcKey extends React.Component {
    render() {
        var props = this.props;

        return (
            <button className={`mdl-button mdl-js-button mdl-js-ripple-effect calc-key ${props.className}`} onClick={props.onClick}>{props.children}</button>
        )
    }
}

class CalcDisplay extends React.Component {
    render() {
        var props = this.props;

        return (
            <div className="calc-display">{props.value}</div>
        )
    }
}


const CalculatorOperations = {
    '/': (prevValue, nextValue) => prevValue / nextValue,
    '*': (prevValue, nextValue) => prevValue * nextValue,
    '+': (prevValue, nextValue) => prevValue + nextValue,
    '-': (prevValue, nextValue) => prevValue - nextValue,
    '=': (prevValue, nextValue) => nextValue
};

class Calculator extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: null,
            displayValue: '0',
            operator: null,
            waitingForOperand: false
        }
    }

    clearAll() {
        this.setState({
            value: null,
            displayValue: '0',
            operator: null,
            waitingForOperand: false
        })
    }

    clearDisplay() {
        this.setState({
            displayValue: '0'
        })
    }

    clearLastChar() {
        const { displayValue } = this.state;

        this.setState({
            displayValue: displayValue.substring(0, displayValue.length - 1) || '0'
        })
    }

    performOperation(nextOperator) {
        const { value, displayValue, operator } = this.state;
        const inputValue = parseFloat(displayValue);

        if (value == null) {
            this.setState({
                value: inputValue
            })
        } else if (operator) {
            const currentValue = value || 0;
            const newValue = CalculatorOperations[operator](currentValue, inputValue);

            this.setState({
                value: newValue,
                displayValue: String(newValue)
            })
        }

        this.setState({
            waitingForOperand: true,
            operator: nextOperator
        })
    }

    toggleSign() {
        const { displayValue } = this.state;

        this.setState({
            displayValue: displayValue.charAt(0) === '-' ? displayValue.substr(1) : '-' + displayValue
        })
    }

    inputPercent() {
        const { displayValue } = this.state;
        const value = parseFloat(displayValue);

        if (value === 0)
            return;

        this.setState({
            displayValue: String(value / 100)
        })
    }

    inputDot() {
        const { displayValue } = this.state;

        if (!(/\./).test(displayValue)) {
            this.setState({
                displayValue: displayValue + '.',
                waitingForOperand: false
            })
        }
    }

    inputDigit(digit) {
        const { displayValue, waitingForOperand } = this.state;

        if (waitingForOperand) {
            this.setState({
                displayValue: String(digit),
                waitingForOperand: false
            })
        } else {
            this.setState({
                displayValue: displayValue === '0' ? String(digit) : displayValue + digit
            })
        }
    }

    handleKeyDown(event) {
        let { key } = event;

        if (event.ctrlKey || event.metaKey)
            return;

        if (key === 'Enter')
            key = '=';

        if ((/\d/).test(key)) {
            this.inputDigit(parseInt(key, 10))
        } else if (key in CalculatorOperations) {
            this.performOperation(key)
        } else if (key === '.') {
            this.inputDot()
        } else if (key === '%') {
            this.inputPercent()
        } else if (key === 'Backspace') {
            event.preventDefault()
            this.clearLastChar();
        } else if (key === 'Clear') {
            event.preventDefault()

            if (this.state.displayValue !== '0') {
                this.clearDisplay()
            } else {
                this.clearAll()
            }
        }
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown)
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyDown)
    }

    render() {
        const { displayValue } = this.state;

        const clearDisplay = displayValue !== '0';
        const clearText = clearDisplay ? 'C' : 'AC';

        const { waitingForOperand } = this.state;
        const { operator } = this.state;

        return (
            <div className="calc">
                <CalcDisplay value={ displayValue }/>
                <div className="calc-keypad">
                    <div className="input-keys">
                        <div className="function-keys">
                            <CalcKey className="key-clear" onClick={() => clearDisplay ? this.clearDisplay() : this.clearAll()}>{clearText}</CalcKey>
                            <CalcKey className="key-sign" onClick={() => this.toggleSign()}>±</CalcKey>
                            <CalcKey className="key-percent" onClick={() => this.inputPercent()}>%</CalcKey>
                        </div>
                        <div className="digit-keys">
                            <CalcKey className="key-0" onClick={() => this.inputDigit(0)}>0</CalcKey>
                            <CalcKey className="key-dot" onClick={() => this.inputDot()}>●</CalcKey>
                            <CalcKey className="key-1" onClick={() => this.inputDigit(1)}>1</CalcKey>
                            <CalcKey className="key-2" onClick={() => this.inputDigit(2)}>2</CalcKey>
                            <CalcKey className="key-3" onClick={() => this.inputDigit(3)}>3</CalcKey>
                            <CalcKey className="key-4" onClick={() => this.inputDigit(4)}>4</CalcKey>
                            <CalcKey className="key-5" onClick={() => this.inputDigit(5)}>5</CalcKey>
                            <CalcKey className="key-6" onClick={() => this.inputDigit(6)}>6</CalcKey>
                            <CalcKey className="key-7" onClick={() => this.inputDigit(7)}>7</CalcKey>
                            <CalcKey className="key-8" onClick={() => this.inputDigit(8)}>8</CalcKey>
                            <CalcKey className="key-9" onClick={() => this.inputDigit(9)}>9</CalcKey>
                        </div>
                    </div>
                    <div className="operator-keys">
                        <CalcKey className={`key-divide ${(waitingForOperand && operator == '/') ? 'active' : ''}`} onClick={() => this.performOperation('/')}>÷</CalcKey>
                        <CalcKey className={`key-multiply ${(waitingForOperand && operator == '*') ? 'active' : ''}`} onClick={() => this.performOperation('*')}>×</CalcKey>
                        <CalcKey className={`key-subtract ${(waitingForOperand && operator == '-') ? 'active' : ''}`} onClick={() => this.performOperation('-')}>−</CalcKey>
                        <CalcKey className={`key-add ${(waitingForOperand && operator == '+') ? 'active' : ''}`} onClick={() => this.performOperation('+')}>+</CalcKey>
                        <CalcKey className="key-equals" onClick={() => this.performOperation('=')}>=</CalcKey>
                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <div id="wrapper">
        <Calculator/>
    </div>,
    document.getElementById('app')
);