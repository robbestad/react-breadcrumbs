import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import render from 'react-shallow-render';

class MyCmp extends React.Component {
  render() {
    return (<div/>)
  }
}

const renderedCmp = render(<MyCmp/>)


console.log(renderedCmp);
