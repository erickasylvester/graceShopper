/*
 * READ THIS FIRST
 *
 * The default initial of the store is the following:
 *
 * {
 *   age: 0,
 *   cash: 0,
 *   posessions, []
 * }
 *
 * Look at the files in: `src/02-combine-reducers/`
 *
 * Included in that directory is a reducer named `originalReducer`. This code is
 * commented out, and represents legacy code to refactor. All these tests pass
 * with the `originalReducer` function.
 *
 * Also included in that director are the empty reducer functions named
 * `ageReducer`, `cashReducer`, and `possessionsReducer`. These are used as
 * reducer functions in a call to `combineReducers`
 *
 * The object of this test is to move the appropriate chunks of the
 * `originalReducer` into the individual reducers named above.
 *
 * You will have to subtly re-write the reducer code, as the original version
 * was returning an entire state object, and these new reducers are tightly
 * scoped to either the `age`, `cash`, or `possessions` slice of state.
 *
 */
import MockAxiosAdapter from 'axios-mock-adapter'
import {expect} from 'chai'
import axios from 'axios'
import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import reducer, {getAllCandiesThunk} from './reducer'
import enforceImmutableState from 'redux-immutable-state-invariant'
import {Candy} from '../../server/db/models'

let store
let mockAxios

describe('Thunks', () => {
  beforeEach(() => {
    mockAxios = new MockAxiosAdapter(axios)
    store = createStore(
      reducer,
      applyMiddleware(thunkMiddleware, enforceImmutableState())
    )
  })
  afterEach(() => {
    mockAxios.restore()
  })

  describe('GET /candies succeeds', () => {
    let candyOne = {
      name: 'someJCandy',
      imageUrl:
        'http://cdn.shopify.com/s/files/1/0768/4331/products/UHA-Puchao-Fruit-Mix-4-Flavor-wm-800x72_1024x1024.jpg?v=1502413813'
    }
    let candyTwo = {
      name: 'someOtherCandy',
      imageUrl:
        'http://cdn.shopify.com/s/files/1/0768/4331/products/UHA-Puchao-Fruit-Mix-4-Flavor-wm-800x72_1024x1024.jpg?v=1502413813'
    }
    beforeEach(() => {
      mockAxios.onGet('/api/candies').reply(200, [candyOne, candyTwo])
    })

    it('sets the received candies on state', async () => {
      await store.dispatch(getAllCandiesThunk())
      const state = store.getState()
      expect(state.candies).to.deep.equal([candyOne, candyTwo])
    })
  })

  describe('GET /candies fails', () => {
    beforeEach(() => {
      mockAxios.onGet('/api/candies').reply(404, 'No candies today!')
    })

    it('sets the thrown error on state', async () => {
      await store.dispatch(getAllCandiesThunk())
      const state = store.getState()
      console.log('Current state: ', state)
      expect(state.candies).to.deep.equal([])
    })
  })
})
