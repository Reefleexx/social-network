import React, {} from 'react'
import classes from './warningWin.module.scss'
import Button from "../../components/Forms/Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {fetchSignOut} from "../../redux/actions/authActions";
import {closeWarningWin} from "../../redux/actions/appActions";
import CloseOnEscape from "react-close-on-escape/src";

const WarningWin = (props) => {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const dispatch = useDispatch()
    const text = useSelector(state => state.app.window)

    const onSignOut = e => {
        e.preventDefault()
        dispatch(closeWarningWin())
        dispatch(fetchSignOut())
    }

    const onCancel = e => {
        e.preventDefault()
        dispatch(closeWarningWin())
    }

    const onEscape = () => {
        dispatch(closeWarningWin())
    }

    return(
        <CloseOnEscape onEscape={onEscape}>
            <div className={classes.sign_back}>
                <div className={classes.signWrapper}>
            <span>
                {text}
            </span>
                    <form action={"submit"}>
                        <Button
                            type={'lightRed'}
                            onClick={e => onSignOut(e)}
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
        </CloseOnEscape>
    )
}

export default WarningWin