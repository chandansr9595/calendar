import React from 'react';
import './calendar.css';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import {CalendarToday, KeyboardArrowLeft, KeyboardArrowRight} from '@material-ui/icons';

const useStyles = makeStyles({
    todayButton: {
        backgroundColor: '#0f6ebe',
        fontFamily: 'Poppins',
        fontSize: 12,
        fontWeight: 500,
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 1.17,
        letterSpacing: 'normal',
        color: '#e6e6e6',
        width: 94,
        height: 38,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
    }
  });

const getMonthAndYear = (date: Date) => {
    return date.toLocaleString('default', { month: 'long' }) + ' ' + date.getFullYear();
}

const Header = (props: {
    date: Date,
    onRigthClick: () => void,
    onLeftClick: () => void,
    onTodayClick: () => void,
}) => {
    const calsses = useStyles();

    return (
        <div className="mainHeader">
            <div className="header">
                <Button 
                    onClick={props.onTodayClick}
                    className={calsses.todayButton}
                    startIcon={<CalendarToday />}
                >
                    Today
                </Button>
                <Button onClick={props.onLeftClick} style={{minWidth: 10, padding: '0 0 0 10px'}} startIcon={<KeyboardArrowLeft style={{color: '#999999'}}/>} />
                <span className='monthAndYear' style={{minWidth: 100}}>{getMonthAndYear(props.date)}</span>
                <Button onClick={props.onRigthClick} style={{minWidth: 10, padding: '0 0 0 10px'}} startIcon={<KeyboardArrowRight style={{color: '#999999'}}/>} />
            </div>
        </div>
    );
}

export default Header;