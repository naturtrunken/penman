#!/bin/bash

# Load the configuration
source ./api_vars

# This file will be overwritten each time!
# To include the variables from this file in each new shell, add
#   source ~/.penman_profile
# to ~/.bash_profile (Bash) or ~/.zshrc, depending on your shell.
SHELL_PROFILE_FILE="/Users/andreas/.penman_profile"

if [[ -z "$2" ]]; then
    echo "Adds a new target to PenMan. Make sure that valid variables are set in the script."
    echo "Usage: \$IP \$NAME"
else
    IP=$1
    NAME=$2
    TARGET_ID=""

    TARGET_ID=$(curl --request POST \
      --header "Content-Type: application/json" \
      --data "{\"api_key\":\"${API_KEY}\",\"name\":\"${NAME}\",\"ip\":\"${IP}\"}" \
      $SERVER/api/v1/users/$USER_ID/networks/$NETWORK_ID/targets | \
      python3 -c "import sys, json; print(json.load(sys.stdin)['id'])")

    # Check curl's return code and print success/error message.
    if [[ TARGET_ID != "" ]]; then
      printf "\nNew target created and set for this and new shells.\n\n"
    else
      printf "\nCould not create the target. Check the variables and the backend server.\n\n"
    fi

    # Add the environment variable to new shells.
    touch ${SHELL_PROFILE_FILE}
    printf "export target=%s\nexport target_id=%s\n" "${IP}" "${TARGET_ID}" > ${SHELL_PROFILE_FILE}

    # And parse it here for the current shell session.
    source ${SHELL_PROFILE_FILE}
fi