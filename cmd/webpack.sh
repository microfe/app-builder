#!/bin/sh
basedir=$(dirname "$(echo "$0" | sed -e 's,\\,/,g')")

case `uname` in
    *CYGWIN*|*MINGW*|*MSYS*) basedir=`cygpath -w "$basedir"`;;
esac

if [ -x "$basedir/node" ]; then
  "$basedir/node"  "$basedir/webpack/cli/run.js" "$@"
  ret=$?
else 
  node "$basedir/webpack/cli/run.js" "$@"
  ret=$?
fi
exit $ret
