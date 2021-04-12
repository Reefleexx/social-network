import is from 'is_js'

export const createForm = (type) => {
    switch (type) {
        case 'password':
            return {
                label: 'Password',
                name: 'password',
                type: 'password',
                placeholder: 'Password'
            }

        case 'email':
            return {
                label: 'Email',
                name: 'email',
                type: 'email',
                placeholder: 'dzemichivan@gmail.com'
            }

        case 'user_name':
            return {
                label: 'User name',
                name: 'user_name',
                type: 'text',
                placeholder: 'Your user name'
            }

        case 'name':
            return {
                label: 'Name',
                name: 'name',
                type: 'name',
                placeholder: 'Your name'
            }

        case 'surname':
            return {
                label: 'Surname',
                name: 'surname',
                type: 'name',
                placeholder: 'Your surname'
            }

        case 'about':
            return {
                label: 'About myself',
                name: 'about',
                type: 'about',
                placeholder: 'Write about yourself'
            }

        case 'text':
            return {
                label: 'text',
                name: 'text',
                type: 'text',
                placeholder: 'Some text'
            }

        default: {}
    }
}

export const getValues = (e) => {
    return Object.keys(e.target.form).reduce((result, el, i) => {
        console.log(el)
        const element = e.target.form[i]
        console.log(element)

       // if(element) {
       //     if (element.value) {
       //         const id = element.id.split('-')[0]
       //         result[id] = element.defaultValue
       //     }
       // }

        return result
    }, {})
}

export const isValidCheck = (value, type) => {
    let error = ''
    let validations

    switch(type) {
        case 'password':
            validations = {
                required: true,
                minLength: 6,
                haveCapital: true,
                max_length: 20
            }
            break;

        case 'email':
            validations = {
                required: true,
                email: true,
                max_length: 90
            }
            break;

        case 'user_name':
            validations = {
                required: true,
                minLength: 5,
                max_length: 25
            }
            break;

        case 'name':
            validations = {
                required: true,
                minLength: 2,
                max_length: 25
            }
            break;

        case 'surname':
            validations = {
                required: true,
                minLength: 2,
                max_length: 25
            }
            break;

        case 'text':
            validations = {
                minLength: 2,
                max_length: 90
            }
            break;

        case 'about':
            validations = {
                max_length: 500
            }
            break;

        default:
            validations = {
                required: true,
                minLength: 5,
                max_length: 25
            }
    }

    if (validations) {

        if (validations.required) {
            if (value === '') {
                return 'This field cannot be empty'
            }

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
                error = value.trim().length >= validations.minLength ? '' : `Min number of letters ${validations.minLength}`
            }
        }

        if (validations.max_length) {
            if (!error) {
                error = value.trim().length <= validations.max_length ? '': `Max number of letters ${validations.max_length}`
            }
        }

        if (validations.haveCapital) {
            if (!error) {
               error = is.any.upperCase(value.split('')) ? '' : 'Must have capital letters'
            }
        }

        if (type !== 'password' && 'email') {
            if (!error) {
                // TODO Add spam check
            }
        }
    }

    return error
}

export const preventPropagation = (e) => {
    e.preventDefault()
    e.stopPropagation()
}
