# Use the official HAProxy image as the base image
FROM haproxy:2.6.12
# Copy your custom HAProxy configuration file to the container
COPY haproxy.cfg /usr/local/etc/haproxy/haproxy.cfg
RUN touch /tmp/admin.sock
# Expose port 80
EXPOSE 80

# Start HAProxy with the custom configuration
CMD ["haproxy", "-f", "/usr/local/etc/haproxy/haproxy.cfg"]
