#!/bin/sh
if [ ! -f "server.key" ] && [ ! -f "server.csr" ] && [ ! -f "server.crt" ]; then
    echo "certs missing generating new ones"
    openssl genrsa -des3 -passout pass:xxxx -out server.pass.key 2048
    openssl rsa -passin pass:xxxx -in server.pass.key -out server.key
    rm server.pass.key
    openssl req -new -key server.key -out server.csr \
        -subj "/C=AT/ST=LowerAustria/L=Something/O=theOrg/OU=IT Department/CN=webshop.com"
    openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt
else
    echo "All certs already there!"
fi