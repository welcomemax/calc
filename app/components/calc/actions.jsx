function setDispatch(type, payload) {
    return { type: type, payload: payload }
}

export function setInput(prevVal, input = '') {
    let newVal = '';

    //TODO переписать костыли - разбить на экшены
    if (input === '') {
        newVal = ''
    } else if (input === '%') {
        newVal = prevVal/100
    } else if (input === '.' && !(/\./.test(prevVal))) {
        newVal = prevVal + input
    } else if (prevVal.length >= 9) {
        newVal = prevVal
    } else if (parseFloat(prevVal + input) == 0) {
        newVal = '';
    } else {
        newVal = prevVal + input;
    }

    return(dispatch) => {
        dispatch(setDispatch('CALC_SET_INPUT_VAL', { inputVal: newVal.toString() }));
    }
}

export function changeSign(prevVal) {
    let sign = (prevVal.substring(0, 1) !== '-') ? '-' : '';
    let newVal = (sign=='-') ? sign + prevVal : sign + prevVal.substring(1, prevVal.length);

    return(dispatch) => {
        dispatch(setDispatch('CALC_SET_INPUT_VAL', { inputVal: newVal }));
    }
}

export function setOperator(operator, prevVal) {
    return(dispatch) => {
        dispatch(setDispatch('CALC_SET_OPERATOR', { prevVal: prevVal, operator: operator }));
    }
}

export function execute(prev, next, operator) {
    let result = 0;
    switch (operator) {
        case '/': {
            result = +prev / +next; break;
        }
        case '*': {
            result = +prev * +next; break;
        }
        case '+': {
            result = +prev + +next; break;
        }
        case '-': {
            result = +prev - +next; break;
        }
    }

    return(dispatch) => {
        dispatch(setDispatch('CALC_SET_INPUT_VAL', { inputVal: result.toString() }));
        //dispatch(setDispatch('CALC_SET_OPERATOR', { prevVal: null, operator: '' }));
    }
}