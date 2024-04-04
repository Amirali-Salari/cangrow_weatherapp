#!/bin/bash

# Define an array of local IP addresses
local_ips=("172.30.0.2" "172.30.0.3" "172.30.0.4" "172.30.0.5" "172.30.0.6")

Check_Connection=true

# Loop through each local IP address
for ip in "${local_ips[@]}"; do
    # Ping the local IP address and suppress output
    if ! ping -c 1 "$ip" &> Log; then
        # If ping fails, set flag to false and break out of loop
        Check_Connection=false
        break
    fi
done

# Check the flag to determine if all IPs are available
if $Check_Connection; then
    echo "Connection with the application is established."
else
    echo "There is no connection with the application."
    echo "See more details in the Log file."
fi