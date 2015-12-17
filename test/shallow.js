import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import shallowRender from 'react-shallow-render';
import { findAll } from 'react-shallow-testutils';
import objectMatches from 'object-matches';

function findAllMatching(tree, match) {
  return findAll(tree, (el) =>
    (match.type ? el.type === match.type : true) && // match type if specified
    objectMatches(el.props, match.props) // match subset of props
  );
}

function findMatching(tree, match) {
  const found = findAllMatching(tree, match);
  if (found.length !== 1) throw new Error('Did not find exactly one match');
  return found[0];
}


class PageHeader extends React.Component {
  render() {
    return (<div/>)
  }
}

class Page extends React.Component {
  render() {
    return (
      <div>
        <div className="page-head">
          <PageHeader title={this.props.title} unimportant="something" />
        </div>
        <div className="page-body">
          {this.props.children}
        </div>
      </div>
    );
  }
}

const titleText = 'My Page';
const renderedTree = shallowRender(<Page title={titleText} />);

// make assertions about the shallow rendered tree
test('Find a search result', (assert) => {
// matches any PageHeader element where the 'title' prop equals the value titleText
assert(findMatching(renderedTree, <PageHeader title={titleText} />) != null);

// matches an element of any type where the 'title' prop equals the value titleText
assert(findMatching(renderedTree, {props: {title: titleText}}) != null);

});
