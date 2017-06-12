
const CalcKey = (props) => (
    <button className={`mdl-button mdl-js-button mdl-js-ripple-effect calc-key ${props.className}`} onClick={props.onClick}>{props.children}</button>
);

export default CalcKey;