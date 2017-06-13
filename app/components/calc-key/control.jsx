import './style.less';

const CalcKey = ({ className, ...props }) => (
    <button className={["mdl-button mdl-js-button mdl-js-ripple-effect calc-key", className].join(' ')} {...props}/>
);

export default CalcKey;