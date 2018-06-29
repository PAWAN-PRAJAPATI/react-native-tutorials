import { connect } from 'react-redux'
import { helloWorld_action,helloWorld_1_action } from '../actions'
import Link from '../components/Helloworld'


const mapDispatchToProps = (dispatch) => {
    return{
      onClick_1: (text) => dispatch(helloWorld_1_action(text)),
      onClick: (text) => dispatch(helloWorld_action(text)),
  }
}

export default connect(
    null,
    mapDispatchToProps
)(Link)
