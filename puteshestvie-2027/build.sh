#!/bin/sh
# Собирает index.html из исходников в src/
node make-photos.js || exit 1
{ cat src/p1.html; echo "<script>"; cat src/p2.js src/p2b.js src/p3.js src/p3b.js src/p5.js src/p6.js src/p6b.js src/p7.js src/p4.js; echo "</script>"; } > index.html
