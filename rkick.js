#!/usr/bin/env node

var gaze  = require('gaze');
var Rsync = require('rsync');
var _     = require('lodash');
var cli   = require('commander');

var dir = process.cwd() + '/';
var form = '[server:/path/to/destination]';

cli
.version('0.0.1')
.option('--pull <path>', 'update this directory from remote path ' + form)
.option('--push <path>', 'update the remote destination ' + form)
.parse(process.argv);

if ((!cli.push && !cli.pull) || (cli.push && cli.pull)) {
  console.log('You must either push or pull.');
  cli.help();
  process.exit(1);
}

if (cli.pull) {
  rsync(cli.pull, dir)();
}

if (cli.push) {
  var dest = cli.push;
  var sync = rsync(dir, dest);

  sync();

  gaze('**/*', function(err, watcher) {
    if (err) throw err;

    watcher.on('all', _.debounce(function() {
      console.log('Change detected!');
      sync();
    }, 200));

  });
}

function rsync(src, dest) {
  var rsync = new Rsync()
    .flags('az')
    .set('delete')
    .source(src)
    .destination(dest);

  return function() {
    console.log('\n' + src + ' => ' + dest);
    console.log('Syncing...');
    rsync.execute(function(err) {
      if (err) throw err;

      console.log('Sync complete!');
    });
  };
}
