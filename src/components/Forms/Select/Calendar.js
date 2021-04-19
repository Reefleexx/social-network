import React from 'react'
import classes from './Select.module.scss'

const Calendar = (props) => {

    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ]

    let days = []

    for(let i = 0; i < 31; i++){
        days.push(i)
    }

    const years = []

    for(let i = new Date().getFullYear(); i >= 1950; i--){
        years.push(i)
    }

    return(
        <div className={!props.edit ? classes.reg_wrapper : classes.wrapper}>

            <select
                id={classes.day}
                onChange={e => props.onChange(e, 'day')}
                defaultValue={props.value ? props.value.day : 1}
            >
                {
                    days.map(day => {
                        return (
                            <option value={day + 1} key={day}>
                                {day + 1}
                            </option>
                        )
                    })
                }
            </select>

            <select
                id={classes.month}
                onChange={e => props.onChange(e, 'month')}
                defaultValue={props.value ? props.value.month : 1}
            >
                {
                    months.map((month, i) => {
                        return (
                            <option value={i + 1} key={month}>
                                {month}
                            </option>
                        )
                    })
                }
            </select>

            <select
                id={classes.year}
                onChange={e => props.onChange(e, 'year')}
                defaultValue={props.value ? props.value.year : ''}
            >
                {
                    years.map((year, i) => {
                        return (
                            <option value={year} key={year}>
                                {year}
                            </option>
                        )
                    })
                }
            </select>
        </div>
    )
}

export default Calendar