import React from 'react'
import classes from './Select.module.scss'

const Sex = (props) => {
    return(
        <div className={classes.wrapper}>
            <select onChange={e => props.onChange(e)}>
                <option value={''} disabled selected hidden>Choose sex</option>
                <option value={'Male'}>Male</option>
                <option value={'Female'}>Female</option>
            </select>
            {
                props.error && <span className={classes.select_error}>{props.error}</span>
            }
        </div>
    )
}

export default Sex