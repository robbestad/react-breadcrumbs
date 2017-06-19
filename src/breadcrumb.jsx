import React from 'react'
import PropTypes from 'prop-types'
import UUID from 'uuid'
import IsEqual from 'lodash.isequal'
import { Dispatch } from './store'

export default class Breadcrumb extends React.Component {
	static propTypes = {
		data: PropTypes.object.isRequired
	}

	state = {
		id: UUID.v4()
	}

	render() {
		return this.props.children
	}

	componentDidMount() {
		let { data } = this.props,
			{ id } = this.state

		Dispatch({
			type: 'ADD_CRUMB',
			payload: { id, ...data }
		})
	}

	componentWillReceiveProps(nextProps) {
		let { data } = nextProps,
			{ id } = this.state

		if ( !IsEqual(data, this.props.data) ) {
			Dispatch({
				type: 'UPDATE_CRUMB',
				payload: { id, ...data }
			})
		}
	}

	componentWillUnmount() {
		let { data } = this.props,
			{ id } = this.state

		Dispatch({
			type: 'REMOVE_CRUMB',
			payload: { id, ...data }
		})
	}
}
