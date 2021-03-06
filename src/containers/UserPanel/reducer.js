import {
  WRONG_FIELD,
  USER_SENT,
  FIELD_CHANGED,
  USER_RECEIVED,
  ADD_HOLIDAY,
  DELETE_HOLIDAY,
  RESET,
} from './actions'

// Initial state contains no user data
var initialState = {
  credentials: {
    name: '',
    email: '',
    slack: '',
    reminder_hour: 14,
    holidays: [],
  },
  error: '',
}

// Function modifying credentials state
function credentials(state = initialState.credentials, action) {
  switch (action.type) {
    case FIELD_CHANGED:
      return Object.assign({}, state, {
        [action.name]: action.value,
      })
    case ADD_HOLIDAY:
      state.holidays.push(action.value)
      return state
    case DELETE_HOLIDAY:
      // state.holidays.filter((element) => false); not working?
      for (let i = 0; i < state.holidays.length; i++) {
        if (state.holidays[i].start == action.value) {
          state.holidays.splice(i, 1)
          break
        }
      }
    default:
      return state
  }
}

// Reducer for UserPanel
// Handles actions:
//  USER_SENT means user data has been sent to server
//  WRONG_FIELD means failed form valdiation
//  FIELD_CHANGED means changed form data
//  USER_RECEIVED means user data has been received from the server
//  RESET means current state will be replaced with initial state
export function user(state = initialState, action) {
  switch (action.type) {
    case USER_SENT:
      return Object.assign({}, state, {
        error: action.error,
      })
    case WRONG_FIELD: {
      return Object.assign({}, state, {
        error: action.field,
      })
    }
    case FIELD_CHANGED: {
      return Object.assign({}, state, {
        credentials: credentials(state.credentials, action),
        error: '',
      })
    }
    case USER_RECEIVED: {
      return Object.assign({}, state, {
        credentials: action.data,
      })
    }
    case DELETE_HOLIDAY:
    case ADD_HOLIDAY: {
      return Object.assign({}, state, {
        credentials: credentials(state.credentials, action),
      })
    }
    case RESET:
      return initialState
    default:
      return state
  }
}
