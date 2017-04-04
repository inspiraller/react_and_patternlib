import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import CalendarPresenter from './calendarPresenter.jsx'
import {onClickToggle} from 'react_project/assets/js/duxdata/calendar/actions.jsx'

class CalendarContainer extends Component {
  render() {
    return (
    	<div className="calendarWrapper">
			<CalendarPresenter {...this.props}/>			
		</div>		
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isOn: state.calendar.isOn || false
  }
}

export default connect(
  mapStateToProps,
  {onClickToggle}
)(CalendarContainer)

