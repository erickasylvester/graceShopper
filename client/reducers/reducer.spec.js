import MockAxiosAdapter from 'axios-mock-adapter'
import {expect} from 'chai'
import axios from 'axios'
import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import reducer, {getAllCandiesThunk} from './reducer'
import enforceImmutableState from 'redux-immutable-state-invariant'

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
