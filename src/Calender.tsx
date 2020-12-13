import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './calendar.css';

const useStyles = makeStyles({
  tableContainer: {
      width: "97%",
      paddingLeft: 20,
      paddingRight: 20,
      backgroundColor: '#121212',
  },
  table: {
  },
  row: {
      height: 100
  },
  cell: {
      width: '14.285%',
      height: 100,
      borderBottom: 'none',
  },
  header: {
      paddingLeft: 0,
      paddingRight: 0,
      paddingBottom: 16,
      paddingTop: 16,
      color: '#999999',
      borderBottom: 'none',
  }
});

function getBackgroundColor(isBack: boolean) : string {
    return isBack ? 'blackBackground2' : 'blackBackground';
}

function isCurrentDay(day: Date) : string {
    const today = new Date();
    return today.getDate() === day.getDate() && today.getMonth() === day.getMonth() ?
         'borderLeft' : '';
}

interface IDay {
    day: Date;
    appointments?: string;
}

function createData(days: IDay[], week: number) {
    if(week === 1){
        return { mon: days[1], tue: days[2], wed: days[3], thru: days[4], fri: days[5], sat: days[6], sun: days[7]};
    } else {
        let weekBeginingDay = (week-1)*7;
        if(week !== 6 || days.length > 36) {
            return { mon: days[weekBeginingDay+1], tue: days[weekBeginingDay+2], wed: days[weekBeginingDay+3], thru: days[weekBeginingDay+4], fri: days[weekBeginingDay+5], sat: days[weekBeginingDay+6], sun: days[weekBeginingDay+7]};
        }
        else {
            return {}
        }
    }
}

const renderDay = (date: IDay) => {
    return (
        <div>
            <div className={`calenderDay ${isCurrentDay(date.day)}`}>
                {date.day.getDate()}&nbsp;
                <span className="calenderDayMonth">
                    {date.day.getDate() === 1 ? date.day.toLocaleString('default', { month: 'long' }) : ''}
                </span>
                {date.day.getDay() === 0 || date.day.getDay() === 6 ? (
                    <div className="weekoff">
                        Weekly off
                    </div>
                ) : (<div className="weekoff"></div>)} 
            </div>
        </div>
    )
}

function getDaysInMonth(month: number, year: number) : IDay[] {
    var date = new Date(year, month, 1);
    var days: IDay[] = [];
    var i;
    //Adding days before the start of current month
    if(date.getDay() !== 1){
        if(date.getDay() === 0){
            i = 6
        } else {
            i = date.getDay()-1;
        }
        var tempDate = new Date(year, month-1, daysInMonth(month, year));
        tempDate.setDate(tempDate.getDate() - i);
        while(i !== -1){
            days.push({day: new Date(tempDate)});
            tempDate.setDate(tempDate.getDate() + 1);
            i--;
        }
    }
    // Adding dates of the current month
    while (date.getMonth() === month) {
      days.push({day: new Date(date)});
      date.setDate(date.getDate() + 1);
    }
    // Adding dates for the next month
    if(days.length < 36){
        tempDate = new Date(year, month+1, 1);
        while(days.length !== 36){
            days.push({day: new Date(tempDate)});
            tempDate.setDate(tempDate.getDate() + 1);
        }
    } else if (days.length > 36) {
        tempDate = new Date(year, month+1, 1);
        while(days.length !== 36+7){
            days.push({day: new Date(tempDate)});
            tempDate.setDate(tempDate.getDate() + 1);
        }
    }
    return days;
}

function daysInMonth (month: number, year: number) {
    return new Date(year, month, 0).getDate();
}

const renderCells = (row: any, classes: any, index: number) => {
    return Object.keys(row).length === 0 && row.constructor === Object
              ? (
                 <></>
              ) : (
                <TableRow key={row.mon.day.getDate()} className={classes.row}>
                    <TableCell className={`${classes.cell} ${getBackgroundColor(index%2 === 0 ? false : true)}`} align="left">{renderDay(row.mon)}</TableCell>
                    <TableCell className={`${classes.cell} ${getBackgroundColor(index%2 === 0 ? true : false)}`} align="left">{renderDay(row.tue)}</TableCell>
                    <TableCell className={`${classes.cell} ${getBackgroundColor(index%2 === 0 ? false : true)}`} align="left">{renderDay(row.wed)}</TableCell>
                    <TableCell className={`${classes.cell} ${getBackgroundColor(index%2 === 0 ? true : false)}`} align="left">{renderDay(row.thru)}</TableCell>
                    <TableCell className={`${classes.cell} ${getBackgroundColor(index%2 === 0 ? false : true)}`} align="left">{renderDay(row.fri)}</TableCell>
                    <TableCell className={`${classes.cell} ${getBackgroundColor(index%2 === 0 ? true : false)}`} align="left">{renderDay(row.sat)}</TableCell>
                    <TableCell className={`${classes.cell} ${getBackgroundColor(index%2 === 0 ? false : true)}`} align="left">{renderDay(row.sun)}</TableCell>
                </TableRow>
              )
}

const Calendar = (props: {
    date: Date
}) => {
  const classes = useStyles();
  const month = props.date.getMonth();
  const daysInMonthData = getDaysInMonth(month, 2020)
  const rows = [
    createData(daysInMonthData, 1),
    createData(daysInMonthData, 2),
    createData(daysInMonthData, 3),
    createData(daysInMonthData, 4),
    createData(daysInMonthData, 5),
    createData(daysInMonthData, 6),
  ];

  return (
    <TableContainer className={classes.tableContainer} component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.header} align="center">MONDAY</TableCell>
            <TableCell className={classes.header} align="center">TUESDAY</TableCell>
            <TableCell className={classes.header} align="center">WEDNESDAY</TableCell>
            <TableCell className={classes.header} align="center">THURSDAY</TableCell>
            <TableCell className={classes.header} align="center">FRIDAY</TableCell>
            <TableCell className={classes.header} align="center">SATURDAY</TableCell>
            <TableCell className={classes.header} align="center">SUNDAY</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => {
              return renderCells(row, classes, index)
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Calendar;