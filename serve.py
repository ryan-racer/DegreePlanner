#!/usr/bin/env python3
"""Static dev server that disables browser caching so edits show up on plain reload.

Usage: python3 serve.py [port] [--lan]
  --lan   listen on all interfaces so other devices on your network can connect
"""
import os
import sys
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer


class Handler(SimpleHTTPRequestHandler):
    extensions_map = {**SimpleHTTPRequestHandler.extensions_map, '.js': 'text/javascript', '.mjs': 'text/javascript', '.md': 'text/markdown', '.webmanifest': 'application/manifest+json'}

    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, must-revalidate')
        super().end_headers()

    def log_message(self, fmt, *args):
        if '" 200 ' not in (fmt % args) and '" 304 ' not in (fmt % args):
            super().log_message(fmt, *args)


args = [a for a in sys.argv[1:] if not a.startswith('--')]
port = int(args[0]) if args else int(os.environ.get('PORT', 8080))
host = '0.0.0.0' if '--lan' in sys.argv else '127.0.0.1'
print(f'DegreePlanner at http://{"localhost" if host == "127.0.0.1" else host}:{port}/  (Ctrl+C to stop)')
ThreadingHTTPServer((host, port), Handler).serve_forever()
