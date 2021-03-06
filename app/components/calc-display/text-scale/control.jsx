import './style.less';

class ScaleText extends React.Component {
    state = {
        scale: 1
    };

    componentDidUpdate() {
        const { scale } = this.state;

        const node = this.node;
        const parentNode = node.parentNode;

        const availableWidth = parentNode.offsetWidth;
        const actualWidth = node.offsetWidth;
        const actualScale = availableWidth / actualWidth;

        if (scale === actualScale)
            return

        if (actualScale < 1) {
            this.setState({ scale: actualScale })
        } else if (scale < 1) {
            this.setState({ scale: 1 })
        }
    }

    render() {
        const { scale } = this.state

        return (
            <span
                className="scale-text"
                style={{ transform: `scale(${scale},${scale})` }}
                ref={node => this.node = node}
                >{this.props.children}</span>
        )
    }
}

export default ScaleText;