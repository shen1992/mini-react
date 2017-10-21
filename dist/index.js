import {Component, mount} from '../src/index'
import createElement from '../src/Element'
class LikeButton extends Component {
    constructor (props) {
        super(props)
        this.state = { isLiked: false }
    }

    onClick () {
        this.setState({
            isLiked: !this.state.isLiked
        })
    }

    render () {
        return (createElement('div', {'id': 'container'}, [
                createElement('h1', {style: 'color: blue'}, ['simple virtal dom']),
                createElement('p', ['Hello, virtual-dom']),
                createElement('ul', [el('li')])])
        )
    }
}

const wrapper = document.querySelector('.wrapper')
mount(new LikeButton({ bgColor: 'red' }), wrapper)