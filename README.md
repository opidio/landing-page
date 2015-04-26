# Opidio Landing Page
[![Build Status](https://img.shields.io/circleci/project/opidio/landing-page.svg?style=flat-square)](https://circleci.com/gh/opidio/landing-page)
[![Code Coverage](https://img.shields.io/coveralls/opidio/landing-page.svg?style=flat-square)](https://coveralls.io/r/opidio/landing-page)

The Opidio Projects:

[![Hub Server](https://img.shields.io/badge/opidio-hub--server-lightgray.svg?style=flat-square)](https://github.com/opidio/hub-server)
[![Channel Server](https://img.shields.io/badge/opidio-channel--server-lightgray.svg?style=flat-square)](https://github.com/opidio/channel-server)
[![Android Client](https://img.shields.io/badge/opidio-android--client-lightgray.svg?style=flat-square)](https://github.com/opidio/android-client)
[![Landing Page](https://img.shields.io/badge/opidio-landing--page-blue.svg?style=flat-square)](https://github.com/opidio/landing-page)

The landing page frontend. Availiable as a prebuilt docker image at Docker Hub
([opidio/landing-page](https://registry.hub.docker.com/u/opidio/landing-page/))
and hosted at [get.opid.io](http://get.opid.io).

The landing page is built as a container using [Docker](https://www.docker.com/) in order
to support simple builds and development. Therefore, a working `docker` and `docker-compose`
(for development) installation is required. Luckily, both are two very simple installations
detailed below.

The landing page itself is built using `stylus`/`jade`/`coffee` and then built down to a static
website using `gulp`. The static webpage is then served using nginx with the provided `nginx.conf`.
None of these dependencies have to be installed manually if you instead use the docker container
that's built using the provided `Dockerfile`.

## Installing `docker` and `docker-compose`
If you just want to build and run the project without enjoying some development features such
as automatically rebuilding and automatically reloading the browser, the only
thing you need to install is the main `docker` binary.

### Install `docker`
Most Linux distros has prebuilt binaries. Using arch or debian for example:
```bash
pacman -S docker # Arch
sudo apt-get update && sudo apt-get install docker.io # Debian
```
for complete instructions see [docs.docker.com/installation](https://docs.docker.com/installation/).

### Install `docker-compose`
Compose can be either installad as a python package or as a simple downloaded binary. See
[docs.docker.com/compose/install](http://docs.docker.com/compose/install/) for complete instructions.

## Running & Building the Opidio Landing Page
Now that you have `docker` ready, you can choose to either run the landing page in either production
or development mode.

### Production
You can choose to build the docker image yourself, in which case you should run:
```bash
docker build -t landing-page .
```
Which will save your image as `landing-page`. There's a pre-built image that can instead be downloaded
called ([opidio/landing-page](https://registry.hub.docker.com/u/opidio/landing-page/)).

To run the image you can use:
```bash
docker run -d -p 8080:80 landing-page # Run your selfbuilt image
docker run -d -p 8080:80 opidio/landing-page # Automatically download the latest image from Docker Hub before running it
```
The `-d` flag tells docker to run it in detatched in the background. If you just want to run it temporarily you
may want to omit it.

`-p 8080:80` will cause the container to listen on port `8080`. You can instead use `-P` to listen on a random port
choosen by docker. In that case, you can use `docker ps` to see which port it is running on.

### Development
Running using Compose will use the `docker-compose.yml` file which in turn will use the `dev` bash script to start
the `nginx` server and automatically rebuild the project when any changes occur using `gulp`.
```bash
docker-compose build && docker-compose up
```
`docker-compose` will start the server on port `8080` by default, though it can be changed in `docker-compose.yml`.

#### Automatic browser reload
Automatic reload is enabled by default, the only thing you need to do in order to enable is to install the Chrome plugin
[LiveReload](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei).
