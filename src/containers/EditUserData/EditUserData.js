import React, {useState, useRef, useEffect} from 'react'
import classes from './EditUserData.module.scss'
import {useDispatch, useSelector} from "react-redux";
import Sex from "../../components/Forms/Select/Sex";
import Calendar from "../../components/Forms/Select/Calendar";
import Country from "../../components/Forms/Select/Country";
import {fetchUpdateUserData, fetchUserData} from "../../redux/actions/userActions";
import {withRouter} from "react-router";
import {authentication} from "../../bl/firebaseConfig";
import {isValidCheck} from "../../bl/functions";


const EditUserData = (props) => {

    const user_data = useSelector(state => state.user.user_data)
    const sortData = ({dateOfBirth, location, defaultPhotoSrc, user_name, sex,  ...rest}) => rest

    const [textDataValue, changeTextData] = useState({
        ...sortData(user_data)
    })
    const [dateValue, changeDate] = useState({
        ...user_data.dateOfBirth
    })
    const [sexValue, changeSex] = useState(user_data.sex)
    const [locationValue, changeLocation] = useState({
        ...user_data.location
    })
    const [areaValue, changeArea] = useState(user_data.about)

    const [allValid, changeValid] = useState({
        name: true,
        surname: true,
        about: true
    })

    const areaRef = useRef()
    const dispatch = useDispatch()

    const inputFields = [
        {label: 'First name:', type: 'name'},
        {label: 'Last name:', type: 'surname'},
    ]

    useEffect(() => {
        dispatch(fetchUserData(authentication.currentUser.uid))
    }, [])

    useEffect(() => {
        const el = areaRef.current
        const offSet = el.offsetHeight - el.clientHeight

        el.style.height = el.scrollHeight + (el.offsetHeight - el.clientHeight) + 'px'

        if (el.innerHeight < el.scrollHeight) {
            el.style.height = el.scrollHeight + offSet + 'px'
        } else {
            el.style.height = 'auto'
            el.style.height = el.scrollHeight + offSet + 'px'
        }
    }, [areaValue])

    useEffect(() => {
        changeTextData({...sortData(user_data)})
        changeDate({...user_data.dateOfBirth})
        changeSex(user_data.sex)
        changeLocation({...user_data.location})
        changeArea(user_data.about)
    }, [user_data])

    const onInputChange = (e, type) => {
        e.preventDefault()

        changeTextData(prev => {
            return {
                ...prev,
                [type]: e.target.value
            }
        })
    }

    const renderInputItem = data => {
        return (
            <div className={classes.input_item} key={data.label}>
                <span className={classes.input_label}>
                    {data.label}
                </span>
                <div className={classes.input_right_side}>
                    <input
                        type="text"
                        id={data.label}
                        value={textDataValue[data.type]}
                        onChange={e => onInputChange(e, data.type)}
                    />
                </div>
            </div>
        )
    }

    const changeTextareaHandler = e => {
        e.preventDefault()

        const newValue = e.target.value

        changeArea(newValue < 800 ? newValue : newValue.slice(0, 800))
    }

    const submitHandler = e => {
        e.preventDefault()

        const valid = Object.keys(allValid).reduce((result, key) => {
            switch(key) {
                case 'name': {
                    const a = isValidCheck(textDataValue.name, key)
                    return !!(result && !isValidCheck(textDataValue.name, key))
                }
                case 'surname': return !!(result && !isValidCheck(textDataValue.surname, key))
                case 'about': return !!(result && !isValidCheck(textDataValue.about, key))
                default: return result
            }
        }, true)

        if (valid) {
            dispatch(fetchUpdateUserData({
                name: textDataValue.name,
                surname: textDataValue.surname,
                sex: sexValue,
                dateOfBirth: dateValue,
                location: locationValue,
                about: areaValue,
                defaultPhotoSrc: user_data.defaultPhotoSrc,
                user_name: user_data.user_name
            }))
            props.history.push('/profile')
        }
    }

    return(
        <div className={classes.EditUserData}>
            <div className={classes.wrapper}>
                <h3 className={classes.main_headline}>Change your data</h3>
                <hr/>

                <div className={classes.input_fields}>
                    {
                        inputFields.map(inputField => {
                            return renderInputItem(inputField)
                        })
                    }
                    <div className={classes.input_item}>
                        <span className={classes.input_label}>
                            Gender:
                        </span>

                        <div className={classes.input_right_side}>
                            <Sex
                                onChange={(e) => {
                                    e.preventDefault()
                                    changeSex(e.target.value)
                                }}
                                edit={true}
                                defaultValue={sexValue}
                            />
                        </div>
                    </div>

                    <div className={classes.input_item}>
                        <span className={classes.input_label}>
                            Birthday:
                        </span>

                        <div className={classes.input_right_side}>
                            <Calendar
                                onChange={(e, type) => {
                                    e.preventDefault()

                                    changeDate(prev => {
                                        return {
                                            ...prev,
                                            [type]: parseInt(e.target.value)
                                        }
                                    })
                                }}
                                value={dateValue}
                                edit={true}
                            />
                        </div>
                    </div>

                    <div className={classes.input_item}>
                        <span className={classes.input_label}>
                           Location:
                        </span>

                        <div className={classes.input_right_side}>
                            <Country
                                onChange={(val, type) => {
                                    changeLocation(state => {
                                        return {
                                            ...state,
                                            [type]: val
                                        }
                                    })
                                }}
                                values={locationValue}
                                edit={true}
                            />
                        </div>
                    </div>

                    <div className={classes.input_item}>
                        <span className={classes.input_label}>
                            About:
                        </span>

                        <div className={classes.input_right_side}>
                            <textarea
                                rows="2"
                                onChange={e => changeTextareaHandler(e)}
                                value={areaValue}
                                ref={areaRef}
                                name={'message_text'}
                                className={classes.textarea}
                                placeholder={'Write something...'}
                            />
                        </div>
                    </div>
                </div>

                <hr/>

                <button className={classes.confirm_button} onClick={e => submitHandler(e)}>
                    Save
                </button>
            </div>
        </div>
    )
}

export default withRouter(EditUserData)