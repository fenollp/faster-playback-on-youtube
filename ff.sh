#!/bin/bash -eu

set -o pipefail

for f in chrome/*; do
	[[ "$f" = chrome/manifest.json ]] && continue
	cp -pr "$f" firefox/
done

cat chrome/manifest.json \
	| sed 's%"manifest_version": 3,%"manifest_version": 2,%' \
	>firefox/manifest.json
