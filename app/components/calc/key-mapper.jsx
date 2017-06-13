// TODO перенести маппер

class KeyMapper extends React.Component {
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
            actions.setInputVal(store.inputVal + key)
        } else if (key in ['+', '-', '/', '*']) {
            //this.performOperation(key)
            actions.setOperator(key, store.inputVal)
        } else if (key === '.') {
            //this.inputDot()
        } else if (key === '%') {
            actions.setInputVal(+store.inputVal / 100)
        } else if (key === 'Backspace') {
            event.preventDefault();
            actions.setInputVal(store.inputVal.substring(0, store.inputVal.length - 1) || '')
        } else if (key === 'Clear') {
            event.preventDefault();
            actions.setInputVal('0')
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
}

export default KeyMapper;