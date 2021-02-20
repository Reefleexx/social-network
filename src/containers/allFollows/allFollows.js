import React, {useEffect} from 'react'
import classes from './allFollows.module.scss'
import IconProfile from "../../components/UI/IconProfile/IconProfile";
import photo from "../../img/wide.jpg";
import {useDispatch, useSelector} from "react-redux";
import {closeAll, fetchUserFollowers, fetchUserFollowing} from "../../redux/actions/userActions";
import {withRouter} from "react-router";

const AllFollows = (props) => {

    const dispatch = useDispatch()
    const users = useSelector(state => state.user[props.type])
    const uid = useSelector(state => state.auth.uid)

    const path = props.location.pathname.split('/')[2]
    console.log(path)
    useEffect(() => {
        if (props.type === 'followers') {
            dispatch(fetchUserFollowers(path ? path : uid))
        } else {
            dispatch(fetchUserFollowing(path ? path : uid))
        }
    }, [])

    const onClose = e => {
        e.preventDefault()
        dispatch(closeAll())
    }

    const renderUsers = () => {
        return (
            <div className={classes.user_items}>
                <i
                    className={'fa fa-times'}
                    id={classes.fa_times}
                    onClick={e => onClose(e)}
                />
                {Object.keys(users).map((el, i) => {

                    if ((i % 3 === 0 && i !== 1) || i === 0) {
                        return (
                            <div className={classes.users_row} key={i}>
                                {
                                    Object.keys(users).length > 5 &&
                                    Object.keys(users).slice(i, i + 4).map((el, i) => {
                                        console.log(users[el])
                                        return (
                                            <IconProfile
                                                key={i}
                                                name={users[el].user_name}
                                                photo={photo}
                                                type={'all'}
                                                uid={el.uid}
                                            />
                                        )
                                    })
                                }
                                {
                                    Object.keys(users).length <= 5 &&
                                    Object.keys(users).map((el, i) => {
                                        return (
                                            <IconProfile
                                                key={i}
                                                name={users[el].user_name}
                                                photo={photo}
                                                type={'all'}
                                                uid={el.uid}
                                            />
                                        )
                                    })
                                }
                            </div>

                        )
                    }

                    return ''

                })}
            </div>
        )
    }

    return(
        <div className={classes.allFollows}>
            <div className={classes.wrapper}>
                <h2>
                    {props.type === 'followers' ? `All users following ${props.user_name}` :
                        `All users followed by ${props.user_name}`}
                </h2>

                {
                    users && renderUsers()
                }

            </div>
        </div>
    )
}

export default withRouter(AllFollows)