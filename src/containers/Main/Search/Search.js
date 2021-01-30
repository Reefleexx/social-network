import React, {useState} from 'react'
import classes from './Search.module.scss'
import ItemSearch from "../../../components/ItemSearch/ItemSearch";

const Search = (props) => {

    const [value, changeValue] = useState('')

    const onSubmitHandler = e => {
        e.preventDefault();

        const value = e.target[0].defaultValue
        console.log(value)
    }

    const onChange = e => {
        changeValue(e.target.value)
    }

    return(
        <div className={classes.Search}>
            <div className={classes.search_wrapper}>
                <form onSubmit={e => onSubmitHandler(e)}>
                    <input
                        type="text"
                        className={classes.input_field}
                        placeholder={'Search...'}
                        onChange={e => onChange(e)}
                        value={value}
                    />
                </form>

                <div className={classes.search_items}>
                    <ItemSearch/>
                    <ItemSearch/>
                    <ItemSearch/>
                    <ItemSearch/>
                    <ItemSearch/>
                </div>
            </div>
        </div>
    )
}

export default Search