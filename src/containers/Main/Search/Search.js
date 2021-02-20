import React, {useState} from 'react'
import classes from './Search.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {fetchSearchUser} from "../../../redux/actions/searchActions";
import SearchItems from "./SearchItems";


const Search = (props) => {

    const usersList = useSelector(state => state.search.users)
    const dispatch = useDispatch()

    const [value, changeValue] = useState('')


    const onSubmitHandler = e => {
        e.preventDefault();
        if (value.trim()) dispatch(fetchSearchUser(value.trim()))
    }

    const onChange = e => {
        e.preventDefault()
        changeValue(e.target.value)
    }

    return(
        <div className={classes.Search}>
            <div className={classes.search_wrapper}>
                <form action={'submit'}>
                    <input
                        onChange={e => onChange(e)}
                        type="text"
                        className={classes.input_field}
                        placeholder={'Search...'}
                        value={value}
                    />
                    <button
                        type={'submit'}
                        onClick={e => onSubmitHandler(e)}
                        className={classes.go}
                    >
                        GO
                    </button>
                </form>

                <div className={classes.search_items}>
                    <SearchItems
                        usersList={usersList}
                    />
                </div>
            </div>
        </div>
    )
}


export default Search