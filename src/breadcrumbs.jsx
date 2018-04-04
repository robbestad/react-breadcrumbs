// Import External Dependencies
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// TODO: Use imitation and allow it to be passed as a prop
import { NavLink } from 'react-router-dom'

// Import Utilities
import Store from './store'

// Specify BEM block name
const block = 'breadcrumbs'

// Create and export the component
class Breadcrumbs extends React.Component {
    static propTypes = {
        className: PropTypes.string,
        hidden: PropTypes.bool,
        separator: PropTypes.node,
        wrapper: PropTypes.oneOfType([ 
            PropTypes.func, 
            PropTypes.instanceOf(
                React.Component
            ) 
        ]),
        children: PropTypes.oneOfType([
            PropTypes.node,
            PropTypes.arrayOf(
                PropTypes.node
            )
        ]),
        crumbs: PropTypes.array
    }


    static defaultProps = {
        className: '',
        hidden: false,
        separator: '>',
        wrapper: props => (
            <nav { ...props }>
                { props.children }
            </nav>
        )
    }

    _unsubscribe = null

    render() {
        let { className, hidden, wrapper: Wrapper } = this.props,
            hiddenMod = hidden ? `${block}--hidden` : '',
            crumbs = this.props.crumbs || Store.getState()

        return (
            <div className={ className }>
                <Wrapper className={ `${block} ${hiddenMod}` }>
                    <div className={ `${block}__inner` }>
                        { 
                            crumbs.sort((a, b) => {
                                return a.pathname.length - b.pathname.length
                            }).map((crumb, i) => (
                                <span key={ crumb.id } className={ `${block}__section` }>
                                    <NavLink
                                        exact
                                        className={ `${block}__crumb` }
                                        activeClassName={ `${block}__crumb--active` }
                                        to={{ 
                                            pathname: crumb.pathname,
                                            search: crumb.search,
                                            state: crumb.state
                                        }}>
                                        { crumb.title }
                                    </NavLink>

                                    { i < crumbs.length - 1 ? (
                                        <span className={ `${block}__separator` }>
                                            { this.props.separator }
                                        </span>
                                    ) : null }
                                </span>
                            ))
                        }
                    </div>
                </Wrapper>

                { this.props.children }
            </div>
        )
    }

    componentWillMount() {
        this._unsubscribe = Store.subscribe(() => {
            this.forceUpdate()
        })
    }

    componentWillUnmount() {
        this._unsubscribe()
    }
}

const mapStateToProps = state => ({crumbs: state.crumbs})

const ConnectedBreadcrumbs = connect(mapStateToProps)(Breadcrumbs)

export {
    Breadcrumbs as default,
    ConnectedBreadcrumbs
}
