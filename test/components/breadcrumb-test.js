(require("../init"))();
var React = require('react/addons');
var stubRouterContext = require('../stub-router-context');
var ComponentToTest = require('../../index.jsx');
var TestUtils = React.addons.TestUtils;

(require("../testdom"))();

var ComponentWithContext = stubRouterContext(ComponentToTest, {});
this.component = TestUtils.renderIntoDocument(
  <ComponentWithContext />
);
console.log(ComponentWithContext);
// Test 1 - render
var inputComponent = TestUtils.findRenderedDOMComponentWithClass(
  this.component,
  'simCardNumber'
);

this.dom = TestUtils.isDOMComponent(inputComponent);
const instance = this.component._reactInternalInstance._renderedComponent._instance;


it('should render the Component', function () {
  expect(this.dom).to.equal(true);
});


test('Find a search result', (assert) => {
  // assert.equals("test","test");
});
