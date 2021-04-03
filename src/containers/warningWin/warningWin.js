import React, {} from 'react'
import classes from './warningWin.module.scss'
import Button from "../../components/Forms/Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {closeDrawer} from "../../redux/actions/appActions";
import {preventPropagation} from "../../bl/formLogic";

const WarningWin = (props) => {

    const dispatch = useDispatch()

    const onConfirm = e => {

        e.preventDefault()

        props.callBack()
        dispatch(closeDrawer())
    }

    const onCancel = e => {
        e.preventDefault()
        dispatch(closeDrawer())
    }

    return(
        <div className={classes.sign_back} onClick={e => preventPropagation(e)}>
            <div className={classes.signWrapper}>
            <span>
                {props.text}
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