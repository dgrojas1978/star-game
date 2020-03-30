import Utils from '../utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

const StarsDisplay = props => (
  <>
  { Utils.range(1,props.count).map(starId =>

      <FontAwesomeIcon key={starId}  icon={faStar} size = '3x' className="star"/>

  )}
  </>

)

export default StarsDisplay
