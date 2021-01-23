import is from 'is_js'

export const createForm = (data, validations) => {
    return {
        ...data,
        touched: false,
        value: '',
        validations
    }
}

export const isValidCheck = (value, validations) => {
    let error = ''

    if (validations) {
        if (validations.required) {
            if (!error) {
                error = value.trim() !== '' ? '' : 'This field cannot be empty'
            }
        }

        if (validations.email){
            if (!error) {
                error = is.email(value) ? '' : 'Invalid email'
            }
        }

        if (validations.minLength) {
            if (!error) {
                error = value.trim().length >= validations.minLength ? '' : 'Min number of letters 6'
            }
        }

        if (validations.haveCapital) {
            if (!error) {
               error = is.any.upperCase(value.split('')) ? '' : 'Must have capital letters'
            }
        }
    }

    return error
}


