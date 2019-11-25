export default store => next => action => {
  if (action.hasError) {
    if (action.payload && action.payload.response && action.payload.response.data) {
      console.log(`
      ${action.type} - has error
      `,
        action.payload.response.data, ' - payload')
    } else {
      console.log(`
      ${action.type} - has error
      `,
        action.payload, ' - payload')
    }
  }
  next(action)
}
