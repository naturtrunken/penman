# API

This page describes the API for the frontend.

## Network

A network describes a network of a target organization or from a course.

### #index: GET /api/v1/users/:user_id/networks

Lists all networks from the given user.

URL parameter:
* ```user_id``` User id
* ```name``` Name of the network

Response:
* ```200``` JSON with the created object.
* ```401``` Unauthorized, user has to login first and present the token in the HTTP header.
* ```403``` Forbidden, user tried to access another users networks without permission.
* ```404``` User not found.


### #show: GET /api/v1/users/:user_id/networks/:network_id

Returns the given network.

URL parameter:
* ```user_id``` User id
* ```network_id``` Id of the network

Response:
* ```200``` JSON with the object.
* ```401``` Unauthorized, user has to login first and present the token in the HTTP header.
* ```403``` Forbidden, user tried to access another users networks without permission.
* ```404``` User not found.

### #create: POST /api/v1/users/:user_id/networks

Creates a new network.

URL parameter:
* ```user_id``` User id

Body parameter:
```json
{
  "name":  "PWK 2.0"
}
```

Response:
* ```200``` JSON with the created object.
* ```401``` Unauthorized, user has to login first and present the token in the HTTP header.
* ```404``` User not found.

### #update: PUT /api/v1/users/:user_id/networks/:network_id

Updates the given network.

URL parameter:
* ```user_id``` User id
* ```network_id``` Id of the network

Body parameter:
```json
{
  "name":  "PWK 2.0"
}
```
Response:
* ```200``` JSON with the object.
* ```401``` Unauthorized, user has to login first and present the token in the HTTP header.
* ```403``` Forbidden, user tried to access another users networks without permission.
* ```404``` User not found.

### #destroy: DELETE /api/v1/users/:user_id/networks/:network_id

Removes the given network.

URL parameter:
* ```user_id``` User id
* ```network_id``` Id of the network

Response:
* ```200``` Empty response.
* ```401``` Unauthorized, user has to login first and present the token in the HTTP header.
* ```403``` Forbidden, user tried to destroy another users networks without permission.
* ```404``` User not found.


## Target

A target describes a system within a network.

### #index: GET /api/v1/users/:user_id/networks/:network_id/targets

Lists all targets from the given user in the given network.

URL parameter:
* ```user_id``` User id
* ```network_id``` Id of the network

Response:
* ```200``` JSON with the list of targets.
* ```401``` Unauthorized, user has to login first and present the token in the HTTP header.
* ```403``` Forbidden, user tried to access another users target without permission.
* ```404``` User or network not found.


### #show: GET /api/v1/users/:user_id/networks/:network_id/targets/:id

Returns a target.

URL parameter:
* ```user_id``` User id
* ```network_id``` Id of the network
* ```id``` Id of the target

Response:
* ```200``` JSON with the object.
* ```401``` Unauthorized, user has to login first and present the token in the HTTP header.
* ```404``` User not found.

### #create: POST /api/v1/users/:user_id/networks/:network_id/targets

Creates a new target.

URL parameter:
* ```user_id``` User id
* ```network_id``` Id of the network

Body parameter:
```json
{
  "name":  "Pain"
}
```

Response:
* ```200``` JSON with the created object.
* ```401``` Unauthorized, user has to login first and present the token in the HTTP header.
* ```404``` User or network not found.

### #update: PUT /api/v1/users/:user_id/networks/:network_id/targets/:id

Updates the given target.

URL parameter:
* ```user_id``` User id
* ```network_id``` Id of the network
* ```id``` Id of the target

Body parameter:
```json
{
  "name":  "Humble"
}
```
Response:
* ```200``` JSON with the object.
* ```401``` Unauthorized, user has to login first and present the token in the HTTP header.
* ```403``` Forbidden, user tried to access another users networks without permission.
* ```404``` User or network or target not found.

### #destroy: DELETE /api/v1/users/:user_id/networks/:network_id/targets/:id

Removes the given target.

URL parameter:
* ```user_id``` User id
* ```network_id``` Id of the network
* ```id``` Id of the target to delete

Response:
* ```200``` Empty response.
* ```401``` Unauthorized, user has to login first and present the token in the HTTP header.
* ```403``` Forbidden, user tried to destroy another users networks without permission.
* ```404``` User or network or target not found.

### #timeline: GET /api/v1/users/:user_id/networks/:network_id/targets/:id/timeline

Returns a timeline of all blocks for the given target.

URL parameter:
* ```user_id``` User id
* ```network_id``` Id of the network
* ```target_id``` Id of the target

Response:
* ```200``` Empty response.
* ```401``` Unauthorized, user has to login first and present the token in the HTTP header.
* ```404``` User or network or target not found.

Response:
```json
{
  "timeline": [
    {
      "block": {
        ...
      },
      "service": {
        ...
      }
    }
  ],
  ...
}
```


## Block

A block describes content like a note or a checklist within a phase of a target.

### #index: GET /api/v1/users/:user_id/networks/:network_id/targets/:target_id/blocks?[phase=n&][service_id=m]

Returns all blocks from a target, optionally scoped by the given phase inclusive-or service.

URL parameter:
* ```user_id``` User id
* ```network_id``` Id of the network
* ```target_id``` Id of the target
* ```phase``` Id of the phase to scope the results (optional)
* ```service_id``` Id of the service to scope the results (optional)

Response:
* ```200``` JSON with the list of blocks.
* ```401``` Unauthorized, user has to login first and present the token in the HTTP header.
* ```403``` Forbidden, user tried to access another users block without permission.
* ```404``` User or network or target or block not found.

### #create: POST /api/v1/users/:user_id/networks/:network_id/targets/:target_id/blocks

Creates a new block.

URL parameter:
* ```user_id``` User id
* ```network_id``` Id of the network
* ```target_id``` Id of the target
*
Body parameter:
```json
{
  "text":  "Detected /console!",
  "output": "$ ls /",
  "checklist_elements": [
    "Test /cmd later",
    "Check this on the other host."
  ],
  "phase": 2
}
```

Response:
* ```200``` JSON with the created object.
* ```401``` Unauthorized, user has to login first and present the token in the HTTP header.
* ```404``` User or network or target not found.


### #update: PUT /api/v1/users/:user_id/networks/:network_id/targets/:target_id/blocks/:id

Updates the given block.

URL parameter:
* ```user_id``` User id
* ```network_id``` Id of the network
* ```target_id``` Id of the target
* ```id``` Id of the block

Body parameter:
```json
{
  "text":  "Found loot",
  "phase": 4
}
```
Response:
* ```200``` JSON with the object.
* ```401``` Unauthorized, user has to login first and present the token in the HTTP header.
* ```403``` Forbidden, user tried to access another users networks without permission.
* ```404``` User or network or target or block not found.


### #destroy: DELETE /api/v1/users/:user_id/networks/:network_id/targets/:target_id/blocks/:id

Deletes a block.

URL parameter:
* ```user_id``` User id
* ```network_id``` Id of the network
* ```target_id``` Id of the target
* ```id``` Id of the block


Response:
* ```200``` Empty response.
* ```401``` Unauthorized, user has to login first and present the token in the HTTP header.
* ```404``` User or network or target or block not found.


## Service

A service describes a network service of a target.

### #index: GET /api/v1/users/:user_id/networks/:network_id/targets/:target_id/services

Returns all services from a target.

URL parameter:
* ```user_id``` User id
* ```network_id``` Id of the network
* ```target_id``` Id of the target

Response:
* ```200``` JSON with the list of services.
* ```401``` Unauthorized, user has to login first and present the token in the HTTP header.
* ```403``` Forbidden, user tried to access another users service without permission.
* ```404``` User or network or target not found.


### #create: POST /api/v1/users/:user_id/networks/:network_id/targets/:target_id/services

Creates a new service.

URL parameter:
* ```user_id``` User id
* ```network_id``` Id of the network
* ```target_id``` Id of the target
*
Body parameter:
```json
{
  "name":  "HTTP",
  "protocol": "tcp",
  "port": 8080
}
```

Response:
* ```200``` JSON with the created object.
* ```401``` Unauthorized, user has to login first and present the token in the HTTP header.
* ```404``` User or network or target not found.

### #destroy: DELETE /api/v1/users/:user_id/networks/:network_id/targets/:target_id/services/:id

Deletes a service. **Caution**, side effect: If a service is deleted, the connected blocks are deleted as well!

URL parameter:
* ```user_id``` User id
* ```network_id``` Id of the network
* ```target_id``` Id of the target
* ```id``` Id of the service


Response:
* ```200``` Empty response.
* ```401``` Unauthorized, user has to login first and present the token in the HTTP header.
* ```404``` User or network or target or service not found.


## AttackVectors

An attack vector describes a possible entry point into a system.

### #index: GET /api/v1/users/:user_id/networks/:network_id/targets/:target_id/attack_vectors

Returns all attack_vectors from a target.

URL parameter:
* ```user_id``` User id
* ```network_id``` Id of the network
* ```target_id``` Id of the target

Response:
* ```200``` JSON with the list of services.
* ```401``` Unauthorized, user has to login first and present the token in the HTTP header.
* ```403``` Forbidden, user tried to access another users service without permission.
* ```404``` User or network or target not found.

### #create: POST /api/v1/users/:user_id/networks/:network_id/targets/:target_id/attack_vectors

Creates a new attack vector.

URL parameter:
* ```user_id``` User id
* ```network_id``` Id of the network
* ```target_id``` Id of the target
*
Body parameter:
```json
{
  "text":  "Apache 2.x",
  "service_id": "..." // optional
}
```

Response:
* ```200``` JSON with the created object.
* ```401``` Unauthorized, user has to login first and present the token in the HTTP header.
* ```404``` User or network or target not found.


### #update: PUT /api/v1/users/:user_id/networks/:network_id/targets/:target_id/attack_vectors/:id

Updates an attack vector.

URL parameter:
* ```user_id``` User id
* ```network_id``` Id of the network
* ```target_id``` Id of the target
* ```id``` Id of the attack vector

Body parameter:
```json
{
  "tried": "false"
}
```

Response:
* ```200``` JSON with the created object.
* ```401``` Unauthorized, user has to login first and present the token in the HTTP header.
* ```404``` User or network or target not found.

### #destroy: DELETE /api/v1/users/:user_id/networks/:network_id/targets/:target_id/attack_vectors/:id

Deletes an attack vector.

URL parameter:
* ```user_id``` User id
* ```network_id``` Id of the network
* ```target_id``` Id of the target
* ```id``` Id of the attack vector.


Response:
* ```200``` Empty response.
* ```401``` Unauthorized, user has to login first and present the token in the HTTP header.
* ```404``` User or network or target or attack vector not found.


## Idea

Describes an idea to check out later.

### #index: GET /api/v1/users/:user_id/networks/:network_id/targets/:target_id/ideas

Returns all ideas from a target.

URL parameter:
* ```user_id``` User id
* ```network_id``` Id of the network
* ```target_id``` Id of the target

Response:
* ```200``` JSON with the list of services.
* ```401``` Unauthorized, user has to login first and present the token in the HTTP header.
* ```403``` Forbidden, user tried to access another users service without permission.
* ```404``` User or network or target not found.

### #create: POST /api/v1/users/:user_id/networks/:network_id/targets/:target_id/ideas

Creates a new idea.

URL parameter:
* ```user_id``` User id
* ```network_id``` Id of the network
* ```target_id``` Id of the target

Body parameter:
```json
{
  "text":  "Brute force login on 1337",
  "service_id": "..." // optional
}
```

Response:
* ```200``` JSON with the created object.
* ```401``` Unauthorized, user has to login first and present the token in the HTTP header.
* ```404``` User or network or target not found.

### #update: PUT /api/v1/users/:user_id/networks/:network_id/targets/:target_id/ideas/:id

Creates a new idea.

URL parameter:
* ```user_id``` User id
* ```network_id``` Id of the network
* ```target_id``` Id of the target
* ```id``` Id of the idea

Body parameter:
```json
{
  "tried": "false"
}
```

Response:
* ```200``` JSON with the created object.
* ```401``` Unauthorized, user has to login first and present the token in the HTTP header.
* ```404``` User or network or target not found.


### #destroy: DELETE /api/v1/users/:user_id/networks/:network_id/targets/:target_id/ideas/:id

Deletes an idea.

URL parameter:
* ```user_id``` User id
* ```network_id``` Id of the network
* ```target_id``` Id of the target
* ```id``` Id of the idea.


Response:
* ```200``` Empty response.
* ```401``` Unauthorized, user has to login first and present the token in the HTTP header.
* ```404``` User or network or target or idea not found.

