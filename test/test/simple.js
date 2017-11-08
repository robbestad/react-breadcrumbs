require("babel-polyfill")
require("../setup")
import React from 'react'
import {expect} from 'chai'
import {configure, mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {Breadcrumb} from "../../src/index"
const Root = () => <div>My root route</div>
configure({adapter: new Adapter()})

describe('<Breadcrumb />', () => {
	let wrapper

	before(() => {
		wrapper = mount(
			<Breadcrumb data={{title: "Test title", pathname: "/"}}>
				<Root/>
			</Breadcrumb>
		)
	})

	it('renders a breadcrumb component with the title `Test title`', () => {
		expect(wrapper.props().data.title).to.equal("Test title")
	})

	it('renders a breadcrumb component with the pathname `/`', () => {
		expect(wrapper.props().data.pathname).to.equal("/")
	})

	it("renders a breadcrumb component with the text from the Root component", () => {
		expect(wrapper.text()).to.equal("My root route")
	})

})
