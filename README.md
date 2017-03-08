# dtail
A simple nodejs based tool to tail logs over ssh from multiple files from multiple nodes in a cluster.

#### Install
Install the npm dependencies locally to the project

```
npm install
```

#### Configure 
Configure your cluster and its ssh access credentials via the config.json file.
*Note*: The *filter* param takes the regex accepted by unix *grep*


#### Run
```
node dtail.js
```


#### Sample config.json
```
{
  "app_title" : "dtail",
  "nodes": [
    {
      "hostname": "mservices.example.com",
      "username": "user",
      "password": "12345",
      "sudo": true,
      "files": [
        {
          "disp_name" : "mService1",
          "file_path" : "/opt/mservice1/logs/server.log",
          "filter" : "com.example.some.utils"
        },
        {
          "disp_name" : "mService2",
          "file_path" : "/opt/mservice2/logs/server.log"
        }
      ]
    }, 
    {
      "hostname": "proxy.example.com",
      "username": "user",
      "password": "1234567",
      "sudo": false,
      "files": [
        {
          "disp_name" : "AccessLog",
          "file_path" : "/var/log/apache2/access.log",
          "filter" : "/mservice"
        }
      ]
    }
  ],
  "write_log": true,
  "log_file": "/tmp/dtail.log"
}
```
