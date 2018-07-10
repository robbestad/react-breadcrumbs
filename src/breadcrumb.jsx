// Import External Dependencies
import React from 'react'
import PropTypes from 'prop-types'
import UUID from 'uuid'
import IsEqual from 'lodash.isequal'
import { connect } from 'react-redux'

// Import Utilities
import { Dispatch } from './store'

// Create and export the component
class Breadcrumb extends React.Component {
	static propTypes = {
		data: PropTypes.object.isRequired,
		hidden: PropTypes.bool,
		children: PropTypes.element,
		dispatch: PropTypes.func,
	}

	static defaultProps = {
		hidden: false,
		children: null
	}

	state = {
		id: UUID.v4(),
		dispatch: Dispatch
	}

	render() {
		return this.props.children
	}

    componentWillMount() {
		if (this.props.dispatch) {
			this.state.dispatch = this.props.dispatch
        }
    }

	componentDidMount() {
		let { data, hidden } = this.props

		if ( !hidden ) this._dispatch('ADD_CRUMB', data)
	}

	componentWillReceiveProps(nextProps) {
		let { data, hidden } = nextProps

		// Update the crumb if its data has changed
		if ( !IsEqual(data, this.props.data) ) {
			this._dispatch('UPDATE_CRUMB', data)
		}

		// Remove/add crumb based on `hidden` prop
		if ( hidden && !this.props.hidden ) {
			this._dispatch('REMOVE_CRUMB', data)
			
		} else if ( !hidden && this.props.hidden ) {
			this._dispatch('ADD_CRUMB', data)
		}
	}

	componentWillUnmount() {
		this._dispatch(
			'REMOVE_CRUMB',
			this.props.data
		)
	}


	/**
	 * Dispatch the given `action`
	 * 
	 * @param  {string} action - A valid action name accepted by the store
	 * @param  {object} data   - The breadcrumb data to pass
	 */
	_dispatch(action, data) {
		const { id, dispatch } = this.state
		dispatch({
			type: action,
			payload: { id, ...data }
		})
	}
}

const mapDispatchToProps = dispatch => ({dispatch})

const ConnectedBreadcrumb = connect(null, mapDispatchToProps)(Breadcrumb)

export {
	Breadcrumb as default,
    ConnectedBreadcrumb
}
