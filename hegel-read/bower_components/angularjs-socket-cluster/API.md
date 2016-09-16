## AngularJS socketCluster: API

### Service Methods

###### toggleDebugging([boolean] enabled)

Turns on an off the debugging information. See the console for output when
debugging through the socket is enabled.

###### connect([object] opts)

Connects to the socket server given the supplied options overrides. Inside
of the provider, there are defaults set for connections so all options do not
need to be set ahead of time.

###### disconnect

Disconnects the current socket connection instance from the server. All wathchers
and other event bindings are unbound and destroyed so nothing else happens.

###### subscribe([string] channel)

Subscribe and set up the watchers for a specific channel on the socket server.
All events which are published through this channel are then rebroadcasted 
through the $rootScope on the format "socket:<$event>"

###### unsubscribe([string] channel)

Unsubscribe from a channel and remove all watchers associated with that channel
name. This will prevent all events from being broadcasted through the socket.

###### publish([string] channel, [object] eventData)

Publish data to a specific socket channel. The event data must be in a specific
format (see talkfusion-socket repository for structure).

###### subscriptions : Array[string]

Return an array of channel subscriptions that this socket instance is
currently subscribed to.

###### isSubscribed([string] channel) : [boolean]

Return a boolean status as to whether or not this socket instance is
subscribed to the specified socket channel.
