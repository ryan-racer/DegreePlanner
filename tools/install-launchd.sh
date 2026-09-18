#!/bin/bash
# Installs a macOS launchd user agent that keeps `python3 serve.py 8080 --lan` running for this checkout,
# so the LAN link survives closing this terminal or the Claude session. Re-run after moving the folder.
# Usage: tools/install-launchd.sh [port]      Remove with: tools/install-launchd.sh --remove
set -euo pipefail
ROOT=$(cd "$(dirname "$0")/.." && pwd)
LABEL=com.degreeplanner.serve
PLIST="$HOME/Library/LaunchAgents/$LABEL.plist"
if [ "${1:-}" = "--remove" ]; then
  launchctl bootout "gui/$(id -u)/$LABEL" 2>/dev/null || true
  rm -f "$PLIST"; echo "Removed $LABEL"; exit 0
fi
PORT=${1:-8080}
PY=$(command -v python3)
mkdir -p "$HOME/Library/LaunchAgents" "$HOME/Library/Logs"
cat > "$PLIST" <<PLIST
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0"><dict>
  <key>Label</key><string>$LABEL</string>
  <key>ProgramArguments</key><array><string>$PY</string><string>$ROOT/serve.py</string><string>$PORT</string><string>--lan</string></array>
  <key>WorkingDirectory</key><string>$ROOT</string>
  <key>RunAtLoad</key><true/>
  <key>KeepAlive</key><true/>
  <key>StandardOutPath</key><string>$HOME/Library/Logs/degreeplanner.log</string>
  <key>StandardErrorPath</key><string>$HOME/Library/Logs/degreeplanner.log</string>
</dict></plist>
PLIST
launchctl bootout "gui/$(id -u)/$LABEL" 2>/dev/null || true
launchctl bootstrap "gui/$(id -u)" "$PLIST"
IP=$(ipconfig getifaddr en0 2>/dev/null || ipconfig getifaddr en1 2>/dev/null || echo "<your-ip>")
echo "Installed $LABEL: http://localhost:$PORT/ and http://$IP:$PORT/ on your network. Logs: ~/Library/Logs/degreeplanner.log"
