import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import Store from './store'

const block = 'breadcrumbs'

export default class Breadcrumbs extends React.Component {
	static propTypes = {
		className: PropTypes.string,
		hidden: PropTypes.bool
	}

	static defaultProps = {
		className: '',
		hidden: true
	}

	_unsubscribe = null

	render() {
		let { className, hidden } = this.props,
			hiddenMod = hidden ? `${block}--hidden` : '',
			crumbs = Store.getState()

		// TODO: Allow custom wrapper with normal attributes/props
		return (
			<div>
				<nav className={ `${block} ${hiddenMod} ${className}` }>
					<div className={ `${block}__inner` }>
						{ 
							crumbs.sort((a, b) => {
								return a.pathname.length - b.pathname.length
							}).map(crumb => (
								<NavLink
									exact
									key={ crumb.id }
									className={ `${block}__crumb` }
									activeClassName={ `${block}__crumb--active` }
									to={{ 
										pathname: crumb.pathname,
										search: crumb.search,
										state: crumb.state
									}}>
									{ crumb.title }
								</NavLink>
							))
						}
					</div>
				</nav>

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
