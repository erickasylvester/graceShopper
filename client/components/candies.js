import React from 'react'
import Candy from './candy'

const Candies = props => {
  return (
    <div>
      {props.candies.map((student, idx) => <Candy candy={candy} key={idx} />)}
    </div>
  )
}

export default Candies
