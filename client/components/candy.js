import React from 'react'
import {connect} from 'react-redux'
import {getAllCandiesThunk} from '../reducers'

class Candy extends React.Component {
  handleDeletion(event, candyId) {
    event.preventDefault()
    this.props.getAllCandies(candyId)
  }
  render() {
    return (
      <div className="item-container">
        <a href={`/candies/${this.props.candy.id}`}>
          <div className="sub-container-header">
            <p>{this.props.candy.name}</p>
          </div>
        </a>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  getAllCandies: candyId => dispatch(getAllCandiesThunk(candyId))
})

export default connect(null, mapDispatchToProps)(Candy)
