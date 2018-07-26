# Upstart config for sakamotosan

## Dependency

* CentOS 6

## Usage Example

```
ln -s /etc/init/sakamotosan.conf /home/sakamotosan/sakamotosan/upstart/sakamotosan.conf
initctl reload-configuration
initctl start sakamotosan
```
