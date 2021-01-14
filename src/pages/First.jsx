import React from 'react'

function First() {
    const compare = () => {
        return (a, b) => {
            let position = 0
            if (a < b) {
                position = -1
            }
            if (a > b) {
                position = 1
            }

            return position;
        }
    };

    const initialState = {
        count: 0,
        dateStart: `${new Date().getFullYear()}-${new Date().getMonth() + 1 < 10 ? 0 : null}${new Date().getMonth() + 1}-${new Date().getDate()}`,
        listDate: [],
        sortedDate: [],
    };
    const [state, setState] = React.useState(initialState);

    const firstFunction = (dateStart, listDate) => {
        const sorted = [];
        const copyList = [...listDate]
        copyList.sort(compare()).map(date => date >= dateStart ? sorted.push(date) : null)
        setState(prev => ({
            ...prev,
            sortedDate: sorted
        }))
    };
    const countHandler = (e) => {
        setState(() => ({ ...initialState, [e.target.name]: e.target.value }))
    }
    const changeHandler = (e) => {
        setState((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }
    const dateHandler = (e) => {
        const index = parseInt(e.target.name);
        const copyDate = [...state.listDate];
        copyDate[index] = e.target.value
        setState(prev => ({
            ...prev,
            listDate: copyDate
        }))
    }
    const loopInput = () => {
        const inputDate = [];
        for (let index = 0; index < state.count; index++) {
            inputDate.push(
                <input type="date" key={index} name={`${index}`} onChange={dateHandler} className="form-control mb-1" />
            )
        }
        return inputDate
    }

    return (
        <div className="container">
            <div className="upper column mb-3">
                <label htmlFor="count">Total service date</label>
                <input type="text" className="form-control" name="count" value={state.count} onChange={countHandler} />
            </div>
            <div className="mid column mb-3">
                {
                    state.count > 0 ? <span>Service Dates</span> : null
                }
                {
                    state.count > 0 ? loopInput() : null
                }
            </div>
            <div className="mb-3">
                <label htmlFor="dateStart">Date Today</label>
                <input type="date" name="dateStart" className="form-control mb-1" value={state.dateStart} onChange={changeHandler} />
                <button className="btn btn-success" onClick={() => firstFunction(state.dateStart, state.listDate)} >start</button>
            </div>
            <div className="lower column">
                <span>Services</span>
                {
                    state.sortedDate.map((date, i) => {
                        i = i + 1;
                        return <input className="form-control mb-1" type="date" value={date} disabled key={i} />
                    })
                }
            </div>
        </div>
    )
}

export default React.memo(First)
