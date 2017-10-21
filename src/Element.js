import _ from './utils'
class Element {
    constructor(tagName, props, children) {
        this.init(tagName, props, children)
    }
    init(tagName, props, children) {
        if (!(this instanceof Element)) {
            if (!_.isArray(children) && children !== null) {
                children = _.slice(arguments, 2).filter(_.truthy)
            }
            return new Element(tagName, props, children)
        }

        if (_.isArray(props)) {
            children = props
            props = {}
        }

        this.tagName = tagName
        this.props = props || {}
        this.children = children || []
        this.key = props ? props.key : void 666

        var count = 0
        _.each(this.children, function (child, i) {
            if (child instanceof Element) {
                count += child.count
            } else {
                children[i] = '' + child
            }
            count++
        })

        this.count = count
    }
    render() {
        let el = document.createElement(this.tagName)
        let props = this.props
        for(let propsName in props) {
            let propValue = props[propsName]
            _.setAttr(el, propsName, propValue)
        }
        _.each(this.children, function (child) {
            var childEl = (child instanceof Element)
                ? child.render()
                : document.createTextNode(child)
            el.appendChild(childEl)
        })
        return el
    }
}

export default (tagName, props, children) => {
    return new Element(tagName, props, children)
}