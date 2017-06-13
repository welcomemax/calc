import ScaleText from './text-scale/control.jsx';

import './style.less';

class CalcDisplay extends React.Component {
    render() {
        const { value, ...props } = this.props

        let formattedValue = value.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')

        return (
            <div {...props} className="calc-display">
                <ScaleText>{ formattedValue }</ScaleText>
            </div>
        )
    }
}

export default CalcDisplay;