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

const validRoomName = new RegExp('^[0-9a-zA-Z-_.]+$', 'i')

Api.addRoute('rooms', {authRequired: true}, {
  post() {
    try {
      const {
        userId,
        bodyParams: {
          name,
          topic,
          members,
        },
      } = this
      if (!RocketChat.authz.hasPermission(userId, 'create-c')) {
        throw new Meteor.Error('insufficient-permissions', 'you do not have permission to do this')
      }
      if (!validRoomName.test(name)) {
        throw new Meteor.Error('invalid-room-name', `${name} is not a valid room name`)
      }
      /* eslint-disable prefer-arrow-callback */
      const result = Meteor.runAsUser(userId, function () {
        const {rid} = Meteor.call('createChannel', name, members)
        RocketChat.saveRoomTopic(rid, topic)
        return {
          status: 'success',
          room: {
            rid,
            name,
            topic,
            members,
          },
        }
      })
      return successResponse({result})
    } catch (err) {
      console.error(err.stack)
      RavenLogger.log(err)
      return errorResponse(err)
    }
  },
})

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
    } catch (err) {
      console.error(err.stack)
      RavenLogger.log(err)
      return errorResponse(err)
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
    } catch (err) {
      console.error(err.stack)
      RavenLogger.log(err)
      return errorResponse(err)
    }
  }
})
