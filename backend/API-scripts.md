# API for scripts

Scripts can be used to add targets or services via the API.
The authentication works with a static secret key.
**Obviously not very secure, but ok for now, because the system and the scripts
should be deployed on localhost.**

You can find (and recreate) the api key in the settings section in the frontend.

* Use ```POST /api/v1/users/:user_id/api_key``` to create a new api key.
  The created key is returned in the response.

* Use ```GET /api/v1/users/:user_id/api_key``` to read the user's current key.

With the api key, the following endpoints can be used:

### Add target

The ```add_target.sh``` script can be used to add a new target.
The script also sets environment variable in the current and all new shells to quickly
access the target's IP. These variables can be used in other scripts as well.

[api_scripts/add_target.sh](api_scripts/add_target.sh)

### Add services

The ```add_services.sh``` script allows to add new services to a target.
It runs multiple nmap scans, let nmap write the result in a XML file and uploads
this XML file to an endpoint which parses it and creates service objects for
the current target.

[api_scripts/add_services.sh](api_scripts/add_services.sh)
