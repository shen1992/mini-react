
import diff from './diff'
import patch from './patch'

class Component {
    constructor (props = {}) {
        this.props = props
    }
    setState(state) {
        const oldEl = this.el
        this.state = state
        this.el = this.renderDOM()
        if (this.onStateChange) this.onStateChange(oldEl, this.el)
    }
    renderDOM() {
        this.el = createDOMFromString(this.render())
        if (this.onClick) {
            this.el.addEventListener('click', this.onClick.bind(this), false)
        }
        return this.el
    }
}

const createDOMFromString = (domString) => {
    let tree = domString.render()
}

const mount = (component, wrapper) => {
    component.onStateChange = (oldTree, newTree) => {
        let patches = diff(oldTree, newTree)
        let tree = oldTree.render()
        patch(tree, patches)
    }
}

export {
    Component,
    mount
}



