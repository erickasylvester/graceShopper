import Axios from 'axios'

const initialState = {
  candies: [],
  candiesError: ''
  // singleCandy: null
}

//action types
const GOT_ALL_CANDIES = 'GOT_ALL_CANDIES'

//action creators
const gotAllCandies = candies => ({
  type: GOT_ALL_CANDIES,
  candies
})

//Thunk creators
export const getAllCandiesThunk = () => async dispatch => {
  try {
    const {data} = await Axios.get('/api/candies')
    dispatch(gotAllCandies(data))
  } catch (err) {
    console.log('Unable to retrieve candies')
  }
}

//reducers
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_ALL_CANDIES:
      return {...state, candies: action.candies}
    // case ADD_CANDIES:
    // case REMOVE_CANDIES:
    default:
      return state
  }
}

export default rootReducer
