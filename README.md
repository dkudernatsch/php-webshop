## PHP - Webshop

### General
Written as a University - Project. The complete Setup was realized wit Docker. 
A Reverse-Proxy was used for https. The backend is written in PHP with Slim. 
Frontend is written with Angular6. Authentication works via JWTs.

### Usage
You already need to have Docker installed on your machine. But that is it for requirements. 
Everything else will be installed inside the containers.
1. pull the whole project
2. `./rev-proxy/certs/make_certs.sh` to generate certificates for https
3. navigate back to the root directory and execute `docker-compose-up` to bring the servers up
4. connect to the database(MariaDB) via
    * Host: localhost
    * database name: webshop
    * user: api
    * password: api
5. execute the database setup script located at database/create_db.sql
    * here you can also take a look ate the database architecture -- DB_Architecture.png
6. An admin account has to be made manually to unlock the admin area as well otherwise you want get to see the admin area
7. Navigate to `api.webshop.at` and accept the certificate
8. Now you can navigate to `localhost:4200` to use the application