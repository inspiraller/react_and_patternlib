import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'
import calendar from './calendar/reducers.jsx';

const calendarGroup = {    
   calendar:calendar /* function - returns object*/
};

const combinedCustomReducers =  combineReducers({    
	...calendarGroup,    /* object with values as functions which return objects */
	routing: routerReducer //not forgetting to add routerRedcuer to the mix too..
});

export default combinedCustomReducers


