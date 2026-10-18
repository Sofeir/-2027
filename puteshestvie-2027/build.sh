#!/bin/sh
# Собирает index.html из исходников в src/
{ cat src/p1.html; echo "<script>"; cat src/p2.js src/p3.js src/p3b.js src/p4.js; echo "</script>"; } > index.html
