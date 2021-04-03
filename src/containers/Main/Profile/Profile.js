import React, {useEffect} from 'react'
import classes from './Profile.module.scss'
import photo from '../../../img/wide.jpg'
import Photo from '../../../img/tall.jpg'
import Button from "../../../components/Forms/Button/Button";
import IconProfile from "../../../components/UI/IconProfile/IconProfile";
import {useDispatch, useSelector} from "react-redux";
import {fetchUser, followUser, openAllType, unFollowUser} from "../../../redux/actions/userActions";
import {withRouter} from "react-router";
import {openDrawer} from "../../../redux/actions/appActions";
import AllFollows from "../../allFollows/allFollows";


const Profile = (props) => {

    const dispatch = useDispatch()
    const uid = useSelector(state => state.auth.uid)
    const user = useSelector(state => state.user)

    const isFollow = Object.keys(user.followers).includes(uid)

    const user_data = user.user_data
    const path = props.match.params.uid

    useEffect(() => {
        dispatch(fetchUser(path ? path : uid))
    }, [])

    const onWhiteButton = (e, type) => {
        e.preventDefault()

        switch (type) {
            case 'Follow':
                dispatch(followUser(path))
                break;
            case 'Unfollow':
                dispatch(unFollowUser(path))
                break;
            case 'send_message':
                props.history.push(`/${path}/chat`)
                break;

            default:
                return;
        }
    }

    const onViewAll = (e, type) => {
        e.preventDefault()
        dispatch(openDrawer(() => <AllFollows type={type} user_name={user_data.name}/>))
    }

    const renderBarText = (left, type) => {
        return (
            <div className={`${classes.barText}`}>
                <span className={`${classes.barTextLeft}`}>
                    {`${left} `}
                    <span className={classes.follows_count}>{Object.keys(user[type]).length}</span>
                </span>
                {Object.keys(user[type]).length > 0 && <span onClick={e => onViewAll(e, type)} className={`${classes.barTextRight}`}>View all</span>}
            </div>
        )
    }

    const renderUserPhotos = () => {
        return (
            ''
        )
    }

    const renderMainUserData = () => {
        return (
            <div className={classes.mainData_item}>
                <div className={classes.data_item}>
                    <span className={classes.data_itemLeft}>Name: </span>
                    <span className={classes.data_itemRight}>{user_data.name}</span>
                </div>
                <div className={classes.data_item}>
                    <span className={classes.data_itemLeft}>Surname: </span>
                    <span className={classes.data_itemRight}>{user_data.surname}</span>
                </div>
                <div className={classes.data_item}>
                    <span className={classes.data_itemLeft}>Sex: </span>
                    <span className={classes.data_itemRight}>{user_data.sex}</span>
                </div>
                <div className={classes.data_item}>
                    <span className={classes.data_itemLeft}>Date of birthday : </span>
                    <span className={classes.data_itemRight}>
                        {Object.keys(user_data.dateOfBirth).map((el, i) => {
                            if (i < 2) {
                                const isZero = parseInt(user_data.dateOfBirth[el]) < 10 ? '0' : ''
                                return `${isZero}${user_data.dateOfBirth[el]}.`
                            } else return user_data.dateOfBirth[el]
                        })}
                    </span>
                </div>
                <div className={classes.data_item}>
                    <span className={classes.data_itemLeft}>Location : </span>
                    <span className={classes.data_itemRight}>{user_data.location.country}, {user_data.location.region}</span>
                </div>
                {
                    user_data.about ? <div className={classes.data_item}>
                        <span className={classes.data_itemLeft}>About myself : </span>
                        <span className={classes.data_itemRight}>{user_data.about}</span>
                    </div> : null
                }

            </div>
        )
    }

    const renderProfile_items = type => {

        const users = Object.keys(user[type]).map(uid => {
            return {
                uid,
                user_name: user[type][uid].user_name
            }
        })

        if (users.length <= 3 && users.length > 0) {
            return (
                <div className={classes.followers_items}>
                    {
                        users.map(user => <IconProfile key={user.uid}
                                                       name={user.user_name}
                                                       photo={photo}
                                                       uid={user.uid}/>)
                    }
                </div>
            )
        }

        if (users.length > 3) {
            return (
                <>
                    <div className={classes.followers_items}>
                        {
                            users.slice(0, 3).map(user => <IconProfile key={user.uid}
                                                                       name={user.user_name}
                                                                       photo={photo}
                                                                       uid={user.uid}/>)
                        }
                    </div>
                    <div className={classes.followers_items}>
                        {
                            users.slice(3, 6).map(user => <IconProfile key={user.uid}
                                                                       name={user.user_name}
                                                                       photo={photo}
                                                                       uid={user.uid}/>)
                        }
                    </div>
                </>
            )
        } else {
            return (
                <div className={classes.followers_items}>
                    <span className={classes.noFollows}>
                        {type === 'followers' ? 'This user has no followers' : `This user doesn't follow anybody`}
                    </span>
                </div>
            )
        }
    }

    const renderUnderPhotoButtons = () => {
        if (path) {
            const type = isFollow ? 'Unfollow' : 'Follow'
            return (
                <div className={classes.buttons_under_photo}>
                    <Button
                        type={'white'}
                        text={type}
                        onClick={e => onWhiteButton(e, type)}
                        size={'2'}
                    />
                    <Button
                        type={'white'}
                        text={'Send a message'}
                        onClick={e => onWhiteButton(e, 'send_message')}
                        size={'2'}
                    />
                </div>
            )
        } else {
            return (
                <Button
                    type={'white'}
                    text={'New default photo'}
                    onClick={e => e.preventDefault('new_photo')}
                    size={'3'}
                />
            )
        }
    }

    return(
        <div className={`${classes.Profile}`}>
            <div className={classes.ProfileWrapper}>
                <div className={`${classes.leftBar}`}>

                    <div className={`${classes.photoContainer}`}>
                        <div className={classes.photo_img}>
                            <img src={Photo} alt="#"/>
                        </div>
                        {
                            path === uid ? null : renderUnderPhotoButtons()
                        }
                    </div>

                    <div className={`${classes.followers}`}>
                        {renderBarText('Followers', 'followers')}
                        {renderProfile_items('followers')}
                    </div>

                    <div className={`${classes.favorites}`}>
                        {renderBarText('Following', 'following')}
                        {renderProfile_items('following')}
                    </div>

                </div>

                <div className={`${classes.rightBar}`}>

                    <div className={classes.userData}>
                        <div className={classes.userName}>
                            <div className={classes.userNameItem}>
                                <span className={classes.userName_text}>{user_data.user_name}</span>
                                {
                                    path ? null : <span className={classes.userName_edit}>Edit user name</span>
                                }
                            </div>
                            <span className={classes.userStatus}>{user.presence}</span>
                        </div>

                        <hr/>

                        <div className={classes.mainUserData}>

                            {renderMainUserData()}
                            {
                                path ? null : <Button
                                    type={'forProfile'}
                                    onClick={e => e.preventDefault()}
                                    text={'Edit user data'}
                                />
                            }
                        </div>

                        <hr id={classes.fuckingHr}/>
                    </div>

                    <div className={classes.userPhotos}>
                        <div className={classes.userPhotoText}>
                            <span>My photos</span>
                            <span>Add new one</span>
                        </div>


                        {renderUserPhotos()}

                    </div>

                </div>
            </div>
        </div>
    )
}

export default withRouter(Profile)