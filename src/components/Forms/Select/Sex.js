import React from 'react'
import classes from './Select.module.scss'

const Sex = (props) => {
    return(
        <div className={!props.edit ? classes.reg_wrapper : classes.wrapper}>
            <select onChange={e => props.onChange(e)} defaultValue={props.defaultValue ? props.defaultValue : ''}>
                <option value={''} disabled hidden>Choose sex</option>
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