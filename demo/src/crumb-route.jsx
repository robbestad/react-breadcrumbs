// Import External Dependencies
import React from 'react';
import { Route } from 'react-router-dom';

// Import Components
import { Breadcrumb } from '../../src/index.js';

// Create and export the component
export default ({ component: Component, render, ...props }) => (
  <Route { ...props } render={ routeProps => (
    <Breadcrumb data={{ title: props.title, pathname: props.path }}>
      { Component ? <Component { ...routeProps } /> : render(routeProps) }
    </Breadcrumb>
  )} />
)