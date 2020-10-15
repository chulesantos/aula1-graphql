#!/bin/bash

docker run -d -it --name mysql -v dados-mysql:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=92529887 --network rede-local mysql

docker run -d -it -v $(pwd):/var/www --name agenda --network rede-local -p 12345:4000 -w /var/www node
