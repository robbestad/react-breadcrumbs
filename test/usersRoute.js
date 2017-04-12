import React from 'react'
import Breadcrumbs from '../index.jsx'
import test from 'tape'
import shallow from 'react-test-renderer/shallow'

var userlist = [
  {id: "1", name: "John"},
  {id: "2", name: "Rambo"},
]

var UserRoutes = [
  {
    "name": "Users",
    "path": "/users",
    "childRoutes": [
      {
        "name": "UserLocator",
        "path": ":userId",
        "childRoutes": [
          {
            "name": "UserDetails",
            "path": "details"
          }
        ]
      }
    ]
  },
  {
    "name": "Route without path"
  },
  {
    "name": "User-locator",
    "path": ":userId",
    "childRoutes": [
      {
        "name": "UserDetails",
        "path": "details"
      }
    ]
  }
]

var prepend = <section />
var append = <section />
var arrayOfItems = [<section />, <output />]

test('Render breadcrumbs', (assert) => {
  var builder = new Breadcrumbs
  builder.props = {routes: UserRoutes}
  var res = builder.render(false)
  assert.equal(
    res.reduce((initialName, name)=> {
      return initialName + "," + name
    }),
    'Users,User-locator',
    'User Breadcrumbs generated'
  )
  assert.end()
})

test('Render breadcrumbs, removing one with excludes', (assert) => {
  var builder = new Breadcrumbs
  builder.props = {routes: UserRoutes, excludes: ['User-locator']}
  var res = builder.render(false)
  assert.equal(
    res.reduce((initialName, name)=> {
      return initialName + "," + name
    }),
    'Users',
    'User Breadcrumbs generated'
  )
  assert.end()
})

test('Render breadcrumbs, prettify words', (assert) => {
  var builder = new Breadcrumbs
  builder.props = {routes: UserRoutes, prettify: true}
  var res = builder.render(false)
  assert.equal(
    res.reduce((initialName, name)=> {
      return initialName + "," + name
    }),
    'Users,User Locator',
    'User Breadcrumbs generated'
  )
  assert.end()
})

test('Render breadcrumbs and prepend element child', (assert) => {
  var renderer = shallow.createRenderer()
  renderer.render(<Breadcrumbs params={{userId: "UserDetails"}} routes={UserRoutes} prepend={prepend}/>)
  const res = renderer.getRenderOutput()
  // 2 for breadcrumbs, 1 for prepend
  assert.equal(res.props.children.length, 3)
  assert.end()
})

test('Render breadcrumbs and append element child', (assert) => {
  var renderer = shallow.createRenderer()
  renderer.render(<Breadcrumbs params={{userId: "UserDetails"}} routes={UserRoutes} append={append}/>)
  const res = renderer.getRenderOutput()
  // 2 for breadcrumbs, 1 for append
  assert.equal(res.props.children.length, 3)
  assert.end()
})

test('Render breadcrumbs and prepend and append element child', (assert) => {
  var renderer = shallow.createRenderer()
  renderer.render(<Breadcrumbs params={{userId: "UserDetails"}} routes={UserRoutes} prepend={prepend} append={append}/>)
  const res = renderer.getRenderOutput()
  // 2 for breadcrumbs, 1 for prepend, 1 for append
  assert.equal(res.props.children.length, 4)
  assert.end()
})

test('Render breadcrumbs and append and prepend array of element child', (assert) => {
  var renderer = shallow.createRenderer()
  renderer.render(<Breadcrumbs params={{userId: "UserDetails"}} routes={UserRoutes} append={arrayOfItems} prepend={arrayOfItems}/>)
  const res = renderer.getRenderOutput()
  // 2 for breadcrumbs, 2 x size of array of items
  assert.equal(res.props.children.length, 2 + arrayOfItems.length * 2)
  assert.end()
})
