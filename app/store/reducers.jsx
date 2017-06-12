import { combineReducers } from 'redux';
import calc from '../../app/components/calc/reducer.jsx';

export default combineReducers({
    calc: calc
});