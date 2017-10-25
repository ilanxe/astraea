import 'normalize.css'
import * as React from 'react'
import {render as renderToDOM} from 'react-dom'
import {AppRoot} from '../app/components/root'
import {createReducer} from '../app/reducer'
import {saga} from '../app/saga'
import {Container} from '../common/components/container'
import {createStore} from '../common/store'

// Reference app container to render to
const container = document.getElementById('container')!

// Create Redux store instance
const reducer = createReducer()
const store = createStore({reducer, saga})

// Render application. Also register to rerender if hot loading is available.
if(module.hot) { // tslint:disable-line:strict-boolean-expressions
  module.hot.accept('../app/components/root', render)
  module.hot.accept('../app/reducer', updateReducer)
  module.hot.accept('../app/saga', () => true)
  module.hot.accept('../common/components/container', render)
}
render()

/**
 * Render application to the container. If we are not in production and an
 * error is encountered the error is rendered to the screen. This may be called
 * multiple times to rerender when a hot reload occurs.
 */
function render() {
  renderToDOM(<Container store={store}><AppRoot /></Container>, container)
}

/**
 * Update the reducer for the store. This may be called multiple times when a
 * hot reload occurs.
 */
function updateReducer() {
  store.replaceReducer(reducer)
}
