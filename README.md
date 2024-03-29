# Cangrow Weatherapp

This app was implemented in the last session of the [Cangrow](https://cangrow.part.institute) course of [Part Institute](https://part.institute). You can use this app as an example to develop this one or other apps.

## Senario

 * Get Masshad weather with a node app and save it in a redis database.
  1. Use HAProxy as a load balancer.
  1. Config proxy server as a High Available service.
  1. Do all things with Docker.


## How to run

First of all install the latest Docker on your OS and clone the repository in some directory.

```
git clone https://github.com/amixsty/cangrow_weatherapp.git

```

Go to the cloned directory.

```
cd cangrow_weatherapp
```

Build HAProxy image.

```
docker build -t cangrowha ./haproxy/
```
Build Node app image.
```
docker build -t weather_app ./app/
```
Run docker compose.
```
docker compose up -d
```

Expect to see something like this in the output of the command ‍‍`docker ps`.

```
CONTAINER ID   IMAGE         COMMAND                  CREATED          STATUS          PORTS                               NAMES
639f54d91f4a   weather_app   "docker-entrypoint.s…"   37 minutes ago   Up 37 minutes   3000/tcp                            node3
de2e02409e7e   weather_app   "docker-entrypoint.s…"   37 minutes ago   Up 37 minutes   3000/tcp                            node2
a4184974d195   weather_app   "docker-entrypoint.s…"   37 minutes ago   Up 37 minutes   3000/tcp                            node1
3f72344f002b   redis         "docker-entrypoint.s…"   37 minutes ago   Up 37 minutes   6379/tcp                            redis
81d28967e05e   cangrowha     "docker-entrypoint.s…"   37 minutes ago   Up 37 minutes   0.0.0.0:80->80/tcp, :::80->80/tcp   haproxy
```

* Now open the browser and type `127.0.0.1`. You must see the weather of Masshad.
* When you refresh the page the IP address must change.
* Stop one of the node containers, the program should still work.

Enjoy :)
