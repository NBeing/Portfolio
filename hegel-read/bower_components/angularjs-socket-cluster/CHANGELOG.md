<a name="1.2.0"></a>
### 1.2.0 (2015-12-22)

* Adds auto reconnect events.

<a name="1.1.9"></a>
### 1.1.9 (2015-11-02)

* Upgrade socketcluster-client to latest patch version.

<a name="1.1.8"></a>
### 1.1.8 (2015-11-02)

* Let events with $error objects pass through.

<a name="1.1.7"></a>
### 1.1.7 (2015-11-02)

* Replace "ignore" handling with check for "Action was silently blocked by publishIn middleware" error now that socketcluster fixed ignore bug.

<a name="1.1.6"></a>
### 1.1.6 (2015-10-30)

* Adds "ignore" handling for publish events.

<a name="1.1.5"></a>
### 1.1.5 (2015-10-23)

* Change "ignore" handling for socketcluster bug.

<a name="1.1.4"></a>
### 1.1.4 (2015-10-23)

* Improve rejected promise handling.

<a name="1.1.3"></a>
### 1.1.3 (2015-10-20)

* Squelch "true" errors that come back from single.publish events.

<a name="1.1.2"></a>
### 1.1.2 (2015-10-20)

* Add in listening for individual socket events rather than just events on the
channel. This will allow servers to broadcast individually.

<a name="1.1.1"></a>
### 1.1.1 (2015-10-20)

* Fix the resolution of promises. They were blindly resolving rather than
making sure the proper events fired.

<a name="1.1.0"></a>
### 1.1.0 (2015-10-06)

* Made all of the public api promisified for easier use and better control
over the flow of the application
* Fixed numerous bugs with the socket interface (broadcasting events, etc)

<a name="1.0.0"></a>
### 1.0.0  (2015-10-05)

#### Features

* Added initial commit files to the repository which sets up the interface
functionality, error handling, etc etc.
* Added initial documentation (api and usage) to the repository
