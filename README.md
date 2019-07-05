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
yarn install
yarn run start
```

## About Trello API

* http://www.utakata.work/entry/20180725/1532479672

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
