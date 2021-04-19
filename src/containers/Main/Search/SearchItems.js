import React from 'react'
import ItemSearch from "../../../components/UI/ItemSearch/ItemSearch";

const SearchItems = (props) => {
    return(
        <>
            {
                props.usersList && props.usersList.map((user, i) => (
                    <ItemSearch
                        key={i}
                        user_name={user.user_data.user_name}
                        uid={user.uid}
                        defaultPhotoSrc={user.user_data.defaultPhotoSrc}
                    />
                ))
            }
        </>
    )
}

export default SearchItems