import React from 'react';
import Calendar from './Calender';
import Header from './Header';

class App extends React.Component {
    state = {
        date: new Date(),
    }

    onRigthClick = () => {
        const currDate = this.state.date;
        this.setState({
            date: new Date(currDate.setMonth(currDate.getMonth() + 1))
        })
    }

    onLeftClick = () => {
        const currDate = this.state.date;
        this.setState({
            date: new Date(currDate.setMonth(currDate.getMonth() - 1)),
        })
    }

    onTodayClick = () => {
        this.setState({
            date: new Date(),
        })
    }

    render() {
        return (
            <div style={{backgroundColor:"#121212"}}>
                <Header 
                    date={this.state.date}
                    onRigthClick={this.onRigthClick}
                    onLeftClick={this.onLeftClick}
                    onTodayClick={this.onTodayClick}
                />
                <Calendar date={this.state.date}/>
            </div>
        );
    }
}

export default App;