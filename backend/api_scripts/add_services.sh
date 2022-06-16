#!/bin/bash

# Load the configuration
source ./api_vars

if [[ -z "${target_id}" ]]; then
    printf "Performs an nmap scan and load the results into PenMan. Make sure that valid variables are set in the script.\n"
    printf "Usage:"
    printf "1) Run the add_target.sh script. This sets environment variables."
    printf "2) Run this script again (no parameters needed)."
else

    # Perform three nmap scans. Feel free to tweak inclusive-or add more scans.
    for i in {0..1}; do

      case $i in
        0)
          printf "\n===================================================================\n"
          printf " Short TCP scan\n"
          printf "===================================================================\n"
          nmap --reason -oA /tmp/nmap-scan-result ${target}
          ;;
        1)
          printf "\n===================================================================\n"
          printf " Long TCP scan\n"
          printf "===================================================================\n"
          nmap --reason -p- -oA /tmp/nmap-scan-result ${target}
          ;;
        2)
          printf "\n===================================================================\n"
          printf " Long UDP scan\n"
          printf "===================================================================\n"
          nmap --reason -sU -oA /tmp/nmap-scan-result ${target}
          ;;
      esac

      # Upload the results.
      CURL_RESULT=$(curl --request POST \
        -F "nmap_xml=@/tmp/nmap-scan-result.xml" \
        $SERVER/api/v1/users/$USER_ID/networks/$NETWORK_ID/targets/${target_id}/services/create_with_nmap?api_key=${API_KEY})

      # Check curl's return code and print success/error message.
      if [[ $? == 0 ]]; then
        printf "\n[%i] New services added.\n\n" $i
      else
        printf "\n[%i] Could not add the services. Check the variables and the backend server.\n\n" $i
      fi
    done

fi