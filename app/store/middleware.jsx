import { UPDATE_LOCATION } from 'react-router-redux'

export default store => next => action => {
    return next(action)
}