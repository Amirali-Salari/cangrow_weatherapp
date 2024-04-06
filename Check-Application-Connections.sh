#!/bin/bash

# Define an array of local IP addresses
local_ips=("172.30.0.2" "172.30.0.3" "172.30.0.4" "172.30.0.5" "172.30.0.6")

Check_Connection=true

# Loop through each local IP address
for ip in "${local_ips[@]}"; do
    # Ping the local IP addresses.
    if ! arping -c 1 "$ip" &>/dev/null; then
        # If ping fails, set flag to false.
        Check_Connection=false
        echo "Service is not available: $ip"
    fi
done

# Check the flag to determine if all IPs are available
if $Check_Connection; then
    echo "Connection with the application is established."
else
    echo "The application is not connected to all external services."
    echo "See more details in the Log file."
fi
