function setDispatch(type, payload) {
    return { type: type, payload: payload }
}

export function setInputVal(val) {
    return(dispatch) => {
        dispatch(setDispatch('CALC_SET_INPUT_VAL', { inputVal: val }));
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
            result = +prev / +next;
            break;
        }
        case '*': {
            result = +prev * +next;
            break;
        }
        case '+': {
            result = +prev + +next;
            break;
        }
        case '-': {
            result = +prev - +next;
            break;
        }
    }

    return(dispatch) => {
        dispatch(setDispatch('CALC_SET_INPUT_VAL', { inputVal: result }));
        //dispatch(setDispatch('CALC_SET_OPERATOR', { prevVal: null, operator: '' }));
    }
}