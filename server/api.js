const Api = new Restivus({
  useDefaultAuth: true,
  apiPath: 'api/lg/',
  prettyJson: true,
  enableCors: false,
})

function errorResponse(error, statusCode = 500) {
  return {
    statusCode,
    body: {
      status: 'fail',
      message: `${error.name}::${error.message}`
    },
  }
}

function successResponse(data, statusCode = 200) {
  return {
    statusCode,
    body: Object.assign({}, {
      status: 'success',
    }, data)
  }
}

Api.addRoute('rooms/:name/send', {authRequired: true}, {
  post() {
    try {
      const {
        userId,
        bodyParams: {msg},
        urlParams: {name},
      } = this

      /* eslint-disable prefer-arrow-callback */
      const result = Meteor.runAsUser(userId, function () {
        const room = RocketChat.models.Rooms.findOneByName(name)
        return Meteor.call('sendMessage', {msg, rid: room._id})
      })
      return successResponse({result})
    } catch (error) {
      console.error(error.stack)
      RavenLogger.log(error)
      return errorResponse(error)
    }
  }
})

Api.addRoute('rooms/:name', {authRequired: true}, {
  delete() {
    try {
      const {
        userId,
        urlParams: {name},
      } = this

      const result = Meteor.runAsUser(userId, function () {
        const room = RocketChat.models.Rooms.findOneByName(name)
        return Meteor.call('eraseRoom', room._id)
      })
      return successResponse({result})
    } catch (error) {
      console.error(error.stack)
      RavenLogger.log(error)
      return errorResponse(error)
    }
  }
})
