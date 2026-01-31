#!/usr/bin/env bash
set -euo pipefail

if ! command -v caddy >/dev/null 2>&1; then
  echo "未检测到 caddy，请先安装：brew install caddy"
  exit 1
fi

project_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
dist_dir="${project_root}/dist"

npm run build

tmp_conf="$(mktemp -t eagleslab-caddyfile.XXXXXX)"
tmp_home="$(mktemp -d -t eagleslab-caddyhome.XXXXXX)"
trap 'rm -f "$tmp_conf"; rm -rf "$tmp_home"' EXIT

cat >"$tmp_conf" <<EOF
:4174
root * ${dist_dir}
file_server

@services path /internship* /skills* /campus-recruit* /postgraduate-interview* /contest* /community*
rewrite @services /services{path}
EOF

echo "Pretty URL 预览："
echo "- http://localhost:4174/skills/"
echo "- http://localhost:4174/internship/"
echo "按 Ctrl+C 退出"

HOME="$tmp_home" caddy run --config "$tmp_conf" --adapter caddyfile
