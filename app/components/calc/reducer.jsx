const initialState = {
    inputVal: '',
    prevVal: null,
    operator: ''
};


export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case 'CALC_SET_INPUT_VAL':
            return {
                ...state,
                inputVal: action.payload.inputVal
            };
        case 'CALC_SET_OPERATOR':
            return {
                ...state,
                prevVal: action.payload.prevVal,
                operator: action.payload.operator,
                inputVal: ''
            };
        default:
            return state;
    }
}