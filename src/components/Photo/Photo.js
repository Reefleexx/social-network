import React, {useState, useRef, useEffect} from 'react'
import classes from './Photo.module.scss'
import {fetchLikePhoto} from "../../redux/actions/allPhotosActions";
import {useDispatch, useSelector} from "react-redux";
import {authentication, database} from "../../bl/firebaseConfig";
import {preventPropagation} from "../../bl/functions";
import {closeDrawer} from "../../redux/actions/appActions";
import {withRouter} from "react-router";
import {addComment, fetchAllPhotos, successAllComments} from "../../redux/actions/photoActions";

const Photo = (props) => {

    const dispatch = useDispatch()
    const allLikes = useSelector(state => state.allPhotos.allPhotos[props.photoKey].likes)
    const comments = useSelector(state => state.photo.comments)

    const textareaRef = useRef()
    const mainRef = useRef()
    const imgRef = useRef()

    const [value, changeValue] = useState('')
    const [showComments, changeCommentsState] = useState(false)

    const currentUid = authentication.currentUser.uid
    const isLiked = allLikes ? allLikes.find(el => el === currentUid) : false

    useEffect(async () => {
        await database.ref(`users/${props.user_uid}/photos/${props.photoKey}/comments`)
        .on('value', snap => {
            dispatch(successAllComments(snap.val()))
        })
    }, [])

    const onLikeHandler = e => {
        e.preventDefault()
        e.stopPropagation()

        dispatch(fetchLikePhoto(props.photoKey, props.user_uid, isLiked))
    }

    const onCommentHandler = e => {
        e.preventDefault()
        e.stopPropagation()

        textareaRef.current.focus()
    }

    const onSendComment = e => {
        if (value) {
            e.preventDefault()

            dispatch(addComment(value, props.photoKey, props.user_uid, new Date().getTime()))

            const el = textareaRef.current

            el.style.height = 'auto'

            changeValue('')

            mainRef.current.scrollTo({
                top: imgRef.current.height
            })
        }
    }

    const onChangeInputValue = e => {
        e.preventDefault()

        const el = textareaRef.current
        const offSet = el.offsetHeight - el.clientHeight

        el.style.height = el.scrollHeight + (el.offsetHeight - el.clientHeight) + 'px'

        if (el.innerHeight < el.scrollHeight) {
            el.style.height = el.scrollHeight + offSet + 'px'
        } else {
            el.style.height = 'auto'
            el.style.height = el.scrollHeight + offSet + 'px'
        }

        changeValue(e.target.value)
    }

    const openUserHandler = (e, user_uid) => {
        e.preventDefault()

        dispatch(closeDrawer())

        props.history.push(`search/${user_uid}`)
    }

    const renderComments = () => {
        // ////////// if there are at least one comment \\\\\\\\\\\\\
        // if (comments) {
        //
        // }
        // /////////// NO comments at all \\\\\\\\\\
        // else {
        //     return 'no comments'
        // }
        //////////////  SHOULD SHOW ALL comments \\\\\\\\\\\\\\\


        if (Object.keys(comments).length > 0) {
            console.log('hi')
            console.log(comments)
            if (showComments) {
                return (
                    <>
                        {
                            Object.keys(comments).reverse().map((commentStamp, i) => {
                                return (
                                    <>
                                        <div className={classes.comment_item} key={i}>
                                            <div className={classes.comment_leftSide}>
                                                <img
                                                    src={props.src}
                                                    alt=""
                                                    onClick={e => openUserHandler(e, comments[commentStamp].sender)}
                                                />
                                            </div>

                                            <div className={classes.comment_rightSide}>
                                            <span
                                                className={classes.comment_user_nick}
                                                onClick={e => openUserHandler(e, comments[commentStamp].sender)}
                                            >
                                                Vasayyy_
                                            </span>

                                                <pre className={classes.comment_main_text}>
                                            {
                                                comments[commentStamp].text
                                            }
                                            </pre>

                                                <span className={classes.comment_time}>
                                            three hours ago
                                            </span>
                                            </div>
                                        </div>

                                        {i !== Object.keys(comments).length - 1 ? <hr/> : null}
                                    </>
                                )
                            })
                        }
                    </>
                )
            }
            ///////////// SHOULD SHOW ONE comment
            else {
                ////////// Check if you have comments \\\\\\\\\\\\
                const yourComments = Object.keys(comments).reduce((result, timeStamp) => {
                    if (comments[timeStamp].sender === currentUid) {
                        result[timeStamp] = comments[timeStamp]
                    }
                }, {})
                console.log(yourComments)
                ///////////// You have written some comments
                if (yourComments    ) {
                    const lastComment = yourComments[Object.keys(yourComments)[Object.keys(yourComments).length]]
                    return (
                        <div className={classes.comment_item}>
                            <div className={classes.comment_leftSide}>
                                <img
                                    src={props.src}
                                    alt=""
                                    onClick={e => openUserHandler(e, lastComment.sender)}
                                />
                            </div>

                            <div className={classes.comment_rightSide}>
                                <span
                                    className={classes.comment_user_nick}
                                    onClick={e => openUserHandler(e, lastComment.sender)}
                                >
                                    Vasayyy_
                                </span>

                                <pre className={classes.comment_main_text}>
                                    {
                                        lastComment.text
                                    }
                                </pre>

                                <span className={classes.comment_time}>
                                    three hours ago
                                </span>
                            </div>
                        </div>
                    )
                }
                //////////////  You haven't written no comments \\\\\\\\\\\
                else {
                    const lastComment = comments[Object.keys(comments)[Object.keys(comments).length]]

                    return (
                        <div className={classes.comment_item}>
                            <div className={classes.comment_leftSide}>
                                <img
                                    src={props.src}
                                    alt=""
                                    onClick={e => openUserHandler(e, lastComment.sender)}
                                />
                            </div>

                            <div className={classes.comment_rightSide}>
                                <span
                                    className={classes.comment_user_nick}
                                    onClick={e => openUserHandler(e, lastComment.sender)}
                                >
                                    Vasayyy_
                                </span>

                                <pre className={classes.comment_main_text}>
                                    {
                                        lastComment.text
                                    }
                                </pre>

                                <span className={classes.comment_time}>
                                    three hours ago
                                </span>
                            </div>
                        </div>
                    )
                }
            }
        }
    }

    return(
        <div className={classes.Photo} onClick={e => preventPropagation(e)} ref={mainRef}>

            <div className={classes.wrapper}>
                <div className={classes.photo_part}>
                    <div className={classes.photo_container}>
                        <img src={props.src} alt="" ref={imgRef}/>
                    </div>

                    <hr className={classes.after_photo}/>

                    <div className={classes.photo_action_buttons}>
                        <i
                            className={`${isLiked ? 'fas': 'far'} fa-heart`}
                            onClick={e => onLikeHandler(e)}
                        />

                        <i
                            className={`far fa-comment-dots`}
                            onClick={e => onCommentHandler(e)}
                        />

                        <i className={`fas fa-share`}/>
                    </div>
                </div>

                {
                    comments ? <hr id={'newComment'}/> : null
                }

                {
                    comments ? <div className={classes.comments_part}>
                        <div className={classes.comments_items}>
                            {renderComments()}
                        </div>
                    </div> : null
                }

                {
                    comments ? <hr/> : null
                }

                <div className={classes.send_part}>
                    <img src={props.src} alt="" onClick={e => openUserHandler(e, currentUid)}/>

                    <form action="submit" className={classes.textarea_form}>
                    <textarea
                        onChange={e => onChangeInputValue(e)}
                        value={value}
                        rows={1}
                        ref={textareaRef}
                        placeholder={'Leave your comment here...'}>
                    </textarea>

                    </form>

                    <i
                        className={'fas fa-paper-plane'}
                        onClick={e => onSendComment(e)}
                        style={{color: '#6b7272'}}
                    />
                </div>
            </div>

        </div>     
    )
}

export default withRouter(Photo)