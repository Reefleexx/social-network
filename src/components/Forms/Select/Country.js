import React from 'react'
import classes from './Select.module.scss'
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';


const Country = (props) => {

    return(
        <div className={classes.wrapper}>
            <div>
                <CountryDropdown
                    value={props.values.country}
                    onChange={val => props.onChange(val, 'country')} />
                <RegionDropdown
                    country={props.values.country}
                    value={props.values.region}
                    onChange={val => props.onChange(val, 'region')} />
            </div>
        </div>
    )
}

export default Country