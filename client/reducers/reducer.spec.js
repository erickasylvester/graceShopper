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
import {expect} from 'chai'
import {createStore, applyMiddleware} from 'redux'
import reducer, {gotAllCandies} from 'reducer'
import enforceImmutableState from 'redux-immutable-state-invariant'

let store

beforeEach(() => {
  store = createStore(reducer, applyMiddleware(enforceImmutableState()))
})

describe('Reducers', () => {
  it('get all candie', async () => {
    let candyOne = await Candy.create({
      name: 'someJCandy',
      imageUrl:
        'http://cdn.shopify.com/s/files/1/0768/4331/products/UHA-Puchao-Fruit-Mix-4-Flavor-wm-800x72_1024x1024.jpg?v=1502413813'
    })
    let candyTwo = await Candy.create({
      name: 'someOtherCandy',
      imageUrl:
        'http://cdn.shopify.com/s/files/1/0768/4331/products/UHA-Puchao-Fruit-Mix-4-Flavor-wm-800x72_1024x1024.jpg?v=1502413813'
    })

    store.dispatch(gotAllCandies())

    expect(store.getState().candies).to.equal(2)
  })
})
