# rkick

    npm install -g rkick

rkick is a helper to solve a common problem with remote development workflows (especially with vim).  Your
development environment works great on your local machine, but when you need to work off a remote host, it falls apart.
SSHFS can be frustratingly slow.  rkick is essentially a wrapper around rsync.

You can do two things with rkick:  `--push <dest>` and `--pull <dest>`.  *Both work with your current directory.*

To start syncing your current directory with your remote host: `rkick --push dev:~/path/to/dir/`.  `rkick` will watch everything
and rsync when files change.

To update your current working directory from your remote host: `rkick --pull dev:~/path/to/dir/`.  Like rsync, if you want the
contents only, don't forget your trailing slash.

### License

MIT.
