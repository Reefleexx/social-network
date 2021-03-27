import React, {} from 'react'
import classes from './warningWin.module.scss'
import Button from "../../components/Forms/Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {closeWarningWin} from "../../redux/actions/appActions";

const WarningWin = (props) => {

    const dispatch = useDispatch()

    const text = useSelector(state => state.app.window)
    const funcCallback = useSelector(state => state.app.funcCallback)
    const onConfirm = e => {
        e.preventDefault()

        funcCallback()
        dispatch(closeWarningWin())
    }

    const onCancel = e => {
        e.preventDefault()
        dispatch(closeWarningWin())
    }

    return(
        <div className={classes.sign_back}>
            <div className={classes.signWrapper}>
            <span>
                {text}
            </span>
                <form action={"submit"}>
                    <Button
                        type={'lightRed'}
                        onClick={e => onConfirm(e)}
                        text={'YES'}
                        typeOfAction={'submit'}
                    />

                    <Button
                        type={'green'}
                        onClick={e => onCancel(e)}
                        text={'NO'}
                    />
                </form>
            </div>
        </div>
    )
}

export default WarningWin