var chalk = require('chalk');
var fs = require('fs');
var path = require('path');
var SSH = require('simple-ssh');
var config = require('./config.json')


const TAIL_CMD = 'tail -f ';
const TAIL_CMD_SUDO = 'sudo tail -f ';
const PIPE_OPER = '|'
const GREP_CMD = 'grep '
const HOST_CLR = chalk.blue
const log = console.log;

//Load configuration
log(config.app_title + ' starting...')

//Log to console and file.
function handle_event(event) {
  log(event)
  if(config.write_log == true){
    fs.appendFile(config.log_file, event , function (err, data) {
      if (err != null) {
        log(err)
        log(data)
      }
    });
  }
}


//Initialize ssh
var ssh_conns = [];
for (i=0; i< config.nodes.length; i++) {
  node = config.nodes[i]
  for( j =0; j < node.files.length; j++) {
    var ssh = new SSH({
        host: node.hostname,
        user: node.username,
        pass: node.password
    });
    cmd = TAIL_CMD
    if(node.sudo == true) {
      cmd = TAIL_CMD_SUDO
    }
    file = node.files[j]
    cmd += node.files[j].file_path
    if(typeof node.files[j].filter != 'undefined' && node.files[j].filter) {
      cmd += PIPE_OPER + GREP_CMD + node.files[j].filter
    } 
    log('Tailing file: ' + node.files[j].disp_name + ' from :' + node.hostname + ' with filter: ' + node.files[j].filter)
    ssh.exec(cmd, {
        pty: true,
        out: function(stdout) {
            handle_event(stdout);
        }
    }).start()
    ssh_conns.push(ssh)
  }
}

