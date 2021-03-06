# 阪元さん（Sakamoto-san）

Slack bot powered by node.js and Botkit.

## Dependency

* node
* yarn

## Hot to use

* Get Slack token: http://www.utakata.work/entry/2017/11/18/100000

```
cp .env.sample .env
# edit .env

cp config/RandomText.sample.js config/RandomText.js
# edit config/RandomText.js

yarn install
yarn run start
```

## About Trello API

* http://www.utakata.work/entry/20180725/1532479672

## systemd

* First, install nodejs as root user.

```
sudo cp ./systemd/sakamotosan.service /etc/systemd/system/sakamotosan.service

# edit /etc/systemd/system/sakamotosan.service
# change `WorkingDirectory` as sakamotosan repository root
# and change `ExecStart` command into absolute path to sakamotosan's yarn
```

* start

```
sudo systemctl start sakamotosan
```


## Example for Upstart

How to execute Sakamotosan on Upstart.

1. Create `/etc/init/sakamotosan.conf`

```
description "sakamotosan"
author  "yoshikyoto"

start on runlevel [2345]
stop on runlevel [016]

chdir /home/sakamotosan/sakamotosan
exec yarn run start > /var/log/sakamotosan.log
respawn
```

2. Start sakamotosan

```
sudo initictl start sakamotosan
```

Restart

```
sudo initctl restart sakamotosan
```
