import React, {useRef, useEffect} from 'react'
import classes from './PhotoItem.module.scss'

const PhotoItem = (props) => {
    
    const mainRef = useRef()
    const imgContainerRef = useRef()

    useEffect(() => {
        const height = mainRef.current.offsetWidth

        imgContainerRef.current.style.height = height + 'px'
    }, [])

    const cls = [
        classes.task_bar,
        classes[`size_${props.size}`]
    ]

    return(
        <div
            className={classes.PhotoItem}
            ref={mainRef}
        >
            <div
                className={classes.img_container}
                ref={imgContainerRef}
                onClick={e => props.onOpenImg(
                    e, props.photoKey, props.photo.user_uid, props.photo.src
                )}
            >
                <div className={cls.join(' ')}>
                    <i
                        className={`${props.isLiked ? 'fas': 'far'} fa-heart`}
                        onClick={e => props.onLikeHandler(
                            e, props.photoKey, props.isLiked, props.photo.user_uid
                        )}
                    />
                    <i
                        className={`far fa-comment-dots`}
                        onClick={e => props.onCommentHandler(
                            e, props.photoKey, props.photo.user_uid, props.photo.src
                        )}
                    />
                </div>
                <img src={props.photo.src} alt=""/>
            </div>
        </div>
    )
}

export default PhotoItem