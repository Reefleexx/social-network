import React from 'react'
import classes from './Profile.module.scss'
import photo from '../../img/wide.jpg'
import Photo from '../../img/tall.jpg'
import Button from "../../components/Button/Button";
import IconProfile from "../../components/IconProfile/IconProfile";


const Profile = (props) => {

    const renderBarText = (left, right) => {
        return (
            <div className={`${classes.barText}`}>
                <span className={`${classes.barTextLeft}`}>{left}</span>
                <span className={`${classes.barTextRight}`}>{right}</span>
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
                <div className={classes.data_item_left}>
                    <span>Name :</span>
                    <span>Surname :</span>
                    <span>Date of birthday :</span>
                    <span>Location :</span>
                    <span>About myself :</span>
                </div>
                <div className={classes.data_item_right}>
                    <span>Ivan</span>
                    <span>Dzemich</span>
                    <span>10.10.2001</span>
                    <span>Ukraine, Khmelnitsky</span>
                    <span>I am what I am and you go fuck)</span>
                </div>
            </div>
        )
    }

    const renderProfile_items = () => {
        return (
            <>
                <div className={classes.friends_items}>
                    <IconProfile name={'Peter'} photo={photo}/>
                    <IconProfile name={'Ivan'} photo={photo}/>
                    <IconProfile name={'Dmitriy'} photo={photo}/>
                </div>
                <div className={classes.friends_items}>
                    <IconProfile name={'Peter'} photo={Photo}/>
                    <IconProfile name={'Ivan'} photo={Photo}/>
                    <IconProfile name={'Dmitriy'} photo={Photo}/>
                </div>
            </>
        )
    }

    return(
        <div className={`${classes.Profile}`}>
            <div className={classes.ProfileWrapper}>
                <div className={`${classes.leftBar}`}>

                    <div className={`${classes.photoContainer}`}>
                        <div className={classes.photo_img}>
                            <img src={Photo} alt="#"/>
                        </div>
                        <Button
                            type={'white'}
                            text={'New default photo'}
                            onClick={e => e.preventDefault()}
                            size={'3'}
                        />
                    </div>

                    <div className={`${classes.friends}`}>
                        {renderBarText('Friends', 'View all')}
                        {renderProfile_items()}
                    </div>

                    <div className={`${classes.favorites}`}>
                        {renderBarText('Favorites', 'View all')}
                        {renderProfile_items()}
                    </div>

                </div>

                <div className={`${classes.rightBar}`}>

                    <div className={classes.userData}>
                        <div className={classes.userName}>
                            <div className={classes.userNameItem}>
                                <span className={classes.userName_text}>Vanya__</span>
                                <span className={classes.userName_edit}>Edit username</span>
                            </div>
                            <span className={classes.userStatus}>online</span>
                        </div>

                        <hr/>

                        <div className={classes.mainUserData}>
                            {renderMainUserData()}
                            <Button
                                type={'forProfile'}
                                onClick={e => e.preventDefault()}
                                text={'Edit user data'}
                            />
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

export default Profile