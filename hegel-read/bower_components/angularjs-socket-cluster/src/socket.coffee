# @author    Ryan Page <ryanpager@gmail.com>
# @see       https://github.com/ryanpager/angularjs-socket-cluster

###
>> Class Declaration
###
class Socket
  $inject: []
  constructor: ->

  # @type {boolean}
  # @description
  # This variable determines whether or not debugging will be thrown through
  #  the console for every socket event that comes through.
  debuggingEnabled = false

  # @type {socketCluster}
  # @description
  # This variable represents the current instance of the socket and all
  #  functionality within it.
  instance = null

  # @type {object}
  # @description
  # This variable represents the default settings for the socket connection
  #  capability.
  connectionOptions =
    autoReconnect: true
    protocol: 'http'
    hostname: '127.0.0.1'
    port: 8000

  # @type {boolean}
  # @description
  # This variable is used to determine if a socket connect event was the result
  #  of a connect() call or an auto reconnect.
  isAutoReconnecting = no

  # @type {boolean}
  # @description
  # This variable is used to determine if a socket disconnect event was the
  #  result of a disconnect() call or a connectection drop.
  intentionalDisconnect = no

  # @name $get
  # @type {function}
  # @description
  # This is a magic method which will allow the service to be returned while
  #  injected with the correct configuration variables.
  # @return {object}
  $get: [
    'socketCluster'
    '$q'
    '$rootScope'
    '$log'
    '$timeout'
    (socketCluster, $q, $rootScope, $log, $timeout) ->
      return service =
        # @name connect
        # @type {function}
        # @description
        # This function will connect a socket server given the explicit default
        #  connection options and the overriden connection options supplied.
        # @param {object} opts
        # @return {Promise.<object>}
        connect: (opts = {}) ->
          return $q (resolve, reject) ->
            # Merge in options with the defaults
            angular.merge connectionOptions, opts

            if debuggingEnabled
              $log.info('Socket :: Attempting connection...')

            # Create the connection
            instance = socketCluster.connect connectionOptions

            # Generic events to listen for
            instance.on 'error', (err) ->
              return if err?.name is 'SilentMiddlewareBlockedError'
              $log.error("Socket :: Error >> #{err}")

            instance.on 'subscribeFail', (err) ->
              $log.error("Socket :: Channel subscription error >> #{err}")

            instance.on 'disconnect', (err) ->
              unless intentionalDisconnect
                isAutoReconnecting = yes
                $rootScope.$broadcast 'socket:connection:dropped'

              if debuggingEnabled
                $log.info('Socket :: Disconnection successful')
                $log.warn('Socket :: Connection dropped') unless intentionalDisconnect

              intentionalDisconnect = no

            # Failed connection events
            instance.on 'connectAbort', (err) ->
              err = "Socket :: Connection aborted >> #{err}"
              $log.error(err)
              reject(err)

            # Successful connection events
            instance.on 'connect', ->
              if isAutoReconnecting
                isAutoReconnecting = no
                $rootScope.$broadcast 'socket:connection:auto-reconnected'
                $log.info('Socket :: Connection auto-reconnected') if debuggingEnabled

              if debuggingEnabled
                $log.info('Socket :: Connection successful')

              resolve(true)

        # @name disconnect
        # @type {function}
        # @description
        # This function will disconnect the socket from the server so that
        #  no more events or watchers are bound and emitted.
        # @return {Promise.<object>}
        disconnect: ->
          return $q (resolve, reject) ->
            if debuggingEnabled
              $log.info('Socket :: Attempting disconnect...')

            # Make sure we have a socket connection
            unless instance?
              err = 'Socket :: Error >> no socket connection established.'
              $log.error(err)
              return reject(err)

            intentionalDisconnect = yes

            instance.disconnect()
            resolve(true)

        # @name subscribe
        # @type {function}
        # @description
        # This function will subscribe to a specific channel on the socket server
        #  so that events can be broadcasted down the scope.
        # @param {string} channel
        # @return {Promise.<object>}
        subscribe: (channel = null) ->
          return $q (resolve, reject) ->
            # Make sure that we have a channel provided before we subscribe
            #  to any events that are going on.
            unless channel?
              err = 'Socket :: Error >> no socket channel specified.'
              $log.error(err)
              return reject(err)

            # Make sure we have a socket connection
            unless instance?
              err = 'Socket :: Error >> no socket connection established.'
              $log.error(err)
              return reject(err)

            # Debugging
            if debuggingEnabled
              $log.info("Socket :: Subscribe to channel #{channel}")

            # Setup event handling function
            handleEvent = (eventData) ->
              # Error handling
              if eventData.$error?
                if debuggingEnabled
                  $log.error('Socket :: Event error >>', eventData)

              # Debugging
              if debuggingEnabled
                $log.info('Socket :: Event received >>', eventData)

              $rootScope.$apply ->
                if debuggingEnabled
                  $log.info("Socket :: Rebroadcast event >> #{eventData.$event}")

                $rootScope.$broadcast "socket:#{eventData.$event}", eventData

            # Subscribe to the channel and bind the event watcher so that we can
            #  rebroadcast any information coming through the channel
            instance.watch channel, handleEvent
            instance.on 'single.publish', handleEvent

            instance.subscribe channel

            $rootScope.$broadcast 'socket:channel:subscribed', channel

            resolve(true)

        # @name unsubscribe
        # @type {function}
        # @description
        # This function will unsubscribe to a specific channel on the socket server
        #  so that no more channel events are broadcasted.
        # @param {string} channel
        # @return {Promise.<object>}
        unsubscribe: (channel = null) ->
          return $q (resolve, reject) ->
            # Make sure that we have a channel provided before we unsubscribe
            #  to any events that are going on.
            unless channel?
              err = 'Socket :: Error >> no socket channel specified.'
              $log.error(err)
              return reject(err)

            # Make sure we have a socket connection
            unless instance?
              err = 'Socket :: Error >> no socket connection established.'
              $log.error(err)
              return reject(err)

            # Debugging
            if debuggingEnabled
              $log.info("Socket :: Unsubscribe to channel #{channel}")

            instance.unsubscribe channel
            instance.unwatch channel

            resolve(true)

        # @name public
        # @type {function}
        # @description
        # This function will publish data to a specific channel so that all
        #  subscribers get notified of its information.
        # @param {string} channel
        # @param {object} eventdata
        # @return {Promise.<object>}
        publish: (channel = null, eventData = {}) ->
          return $q (resolve, reject) ->
            # Make sure that we have a channel provided before we publish
            #  to any channel specified.
            unless channel?
              err = 'Socket :: Error >> no socket channel specified.'
              $log.error(err)
              return reject(err)

            # Make sure we have a socket connection
            unless instance?
              err = 'Socket :: Error >> no socket connection established.'
              $log.error(err)
              return reject(err)

            # Debugging
            if debuggingEnabled
              $log.info("Socket :: Publish to channel #{channel} >>", eventData)

            instance.publish channel, eventData, (err) ->
              if err?.name? and err.name isnt 'SilentMiddlewareBlockedError'
                reject(err)
              else
                resolve(true)

        # @name toggleDebugging
        # @type {function}
        # @description
        # Toggle the debugging state for the socket connection.
        # @param {boolean} enabled
        toggleDebugging: (enabled = false) ->
          debuggingEnabled = enabled

        # @name subscriptions
        # @type {function}
        # @description
        # This function will return an array of active channel subscriptions
        #  in array format.
        subscriptions: ->
          # Make sure we have a socket connection
          unless instance?
            $log.error('Socket :: Error >> no socket connection established.')
            return

          return instance.subscriptions()

        # @name isSubscribed
        # @type {function}
        # @description
        # This function will return a boolean indicator as to whether or not this
        #  socket instance is subscribed to the supplied channel name.
        # @param {string} channel
        isSubscribed: (channel) ->
          # Make sure we have a socket connection
          unless instance?
            $log.error('Socket :: Error >> no socket connection established.')
            return

          return instance.isSubscribed(channel)
  ]

###
>> Module Declaration
###
angular
  .module 'sbb.components', []
  .constant 'socketCluster', socketCluster
  .provider 'sbb.components.socket', Socket
