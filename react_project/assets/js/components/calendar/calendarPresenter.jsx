import React, {PropTypes} from 'react';

const CalendarPresenter = ({isOn, onClickToggle}) => {

  const onClick = (event, isOn) => {  
    onClickToggle(!isOn);
  }

	return (
      <div className="calendarPresenter">
      	<p data-state-on={isOn}>Calendar is visible "{isOn? "true":"false"}"</p>
      	<button onClick={(event) => onClick(event, isOn)}>
      		Click me
      	</button>
      </div>
    )
};

CalendarPresenter.propTypes = {
  isOn: React.PropTypes.bool.isRequired,
  onClickToggle: React.PropTypes.func.isRequired
}

export default CalendarPresenter;