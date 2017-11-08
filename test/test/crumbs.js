require("babel-polyfill")
require("../setup")
import React from 'react'
import {expect} from 'chai'
import {configure, mount, shallow, render} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {Breadcrumb} from "../../src/index"
const Root = () => <div>My root route</div>
configure({adapter: new Adapter()})
import PropTypes from 'prop-types'

describe('Friends', () => {
	it("renders a breadcrumb component with a breadcrumb element", () => {
		function Crumbroute({title, pathname}) {
			return (
				<Breadcrumb data={{title, pathname}}>
					<Root/>
				</Breadcrumb>
			)
		}
		Crumbroute.propTypes = {
			title: PropTypes.string.isRequired,
			pathname: PropTypes.string.isRequired
		}

		const wrapper = shallow(<Crumbroute title="My friends" pathname={"/friends"}/>)
		expect(wrapper.find('Breadcrumb')).to.have.length(1)

	})

})
