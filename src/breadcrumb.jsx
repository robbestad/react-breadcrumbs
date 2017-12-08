// Import External Dependencies
import React from 'react'
import PropTypes from 'prop-types'
import UUID from 'uuid'
import IsEqual from 'lodash.isequal'

// Import Utilities
import { Dispatch } from './store'

// Create and export the component
export default class Breadcrumb extends React.Component {
	static propTypes = {
		data: PropTypes.object.isRequired,
		hidden: PropTypes.bool,
		children: PropTypes.element
	}

	static defaultProps = {
		hidden: false,
		children: null
	}

	state = {
		id: UUID.v4()
	}

	render() {
		return this.props.children
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
		let { id } = this.state

		Dispatch({
			type: action,
			payload: { id, ...data }
		})
	}
}
