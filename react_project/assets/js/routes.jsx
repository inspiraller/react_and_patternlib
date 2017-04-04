import React from 'react';
import {IndexRoute, Router, Route, HistoryBase} from 'react-router';
import Calendar from './components/calendar/calendarContainer.jsx';

export default
    <Route path="/">
    	<IndexRoute component={Calendar} />
        <Route path='/Calendar' component={Calendar} />
    </Route>;
