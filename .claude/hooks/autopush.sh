#!/bin/sh
# Автопуш: собирает index.html, коммитит все изменения и пушит в main.
# Вызывается хуками PostToolUse (Edit/Write) и Stop из .claude/settings.json.
cd "${CLAUDE_PROJECT_DIR:-$(git rev-parse --show-toplevel)}" || exit 0

# Пушим только из main, чтобы не затронуть другие ветки
[ "$(git rev-parse --abbrev-ref HEAD)" = "main" ] || exit 0

# index.html руками не правится, пересобираем из src/
if [ -f puteshestvie-2027/build.sh ]; then
  (cd puteshestvie-2027 && sh build.sh) || exit 0
fi

git add -A
git diff --cached --quiet && exit 0

files=$(git diff --cached --name-only | head -5 | tr '\n' ' ')
git commit -q -m "Автокоммит: ${files}" || exit 0

delay=2
for i in 1 2 3 4; do
  if git push -q origin HEAD:main 2>/dev/null; then exit 0; fi
  git pull -q --rebase origin main 2>/dev/null
  sleep "$delay"; delay=$((delay * 2))
done
echo "autopush: не удалось запушить в main" >&2
exit 0
