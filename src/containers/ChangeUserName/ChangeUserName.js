import React, {useState} from 'react'
import classes from './ChangeUserName.module.scss'
import {useDispatch} from "react-redux";
import {changeUserName} from "../../redux/actions/userActions";
import {preventPropagation} from "../../bl/functions";
import {closeDrawer} from "../../redux/actions/appActions";

const ChangeUserName = (props) => {

    const dispatch = useDispatch()

    const [inputValue, changeValue] = useState(props.defaultValue)

    const onChangeInput = e => {
        e.preventDefault()

        changeValue(e.target.value.slice(0, 30))

    }

    const onConfirm = (e) => {
        e.preventDefault()
        dispatch(closeDrawer())
        dispatch(changeUserName(inputValue))
    }

    return(
        <div className={classes.ChangeUserName} onClick={e => preventPropagation(e)}>
            <div className={classes.wrapper}>
                <form action="submit" onSubmit={e => onConfirm(e)}>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={e => onChangeInput(e)}
                        onSubmit={e => onConfirm(e)}
                    />
                </form>
                <i className={'fas fa-check'} onClick={e => onConfirm(e)}/>
            </div>
        </div>
    )
}

export default ChangeUserName