#!/usr/bin/env bash
# Public-safety gate: everything in this repo is public. Fails on images that carry
# EXIF/GPS metadata and on text that looks like personal identifiers.
# Needs exiftool (apt: libimage-exiftool-perl). Run: npm run check:public
set -euo pipefail

fail=0
dirs=(content public src)

# 1. Images: no GPS and no camera metadata. Re-encode or strip before committing
#    (exiftool -all= -overwrite_original <file>).
mapfile -t images < <(find "${dirs[@]}" -type f \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' \
  -o -iname '*.webp' -o -iname '*.heic' -o -iname '*.tif' -o -iname '*.tiff' \) 2>/dev/null)
if ((${#images[@]})); then
  if ! command -v exiftool >/dev/null; then
    echo "exiftool not installed; cannot check images" >&2
    exit 2
  fi
  for f in "${images[@]}"; do
    if exiftool -q -q -if '$GPSLatitude or $GPSLongitude or $GPSPosition' -p '$FileName' "$f" | grep -q .; then
      echo "GPS data in image: $f"; fail=1
    fi
    if exiftool -q -q -if '$Make or $Model or $SerialNumber or $DateTimeOriginal' -p '$FileName' "$f" | grep -q .; then
      echo "Camera metadata in image: $f"; fail=1
    fi
  done
fi

# 2. Text: identifiers that never belong on a public page.
#    Email addresses (except obvious placeholders), Indian mobile numbers, passport-style numbers.
patterns=(
  '[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}'
  '(\+91[ -]?)?[6-9][0-9]{4}[ -]?[0-9]{5}'
  '\b[A-PR-WY][1-9][0-9]{6}\b'
)
for p in "${patterns[@]}"; do
  if hits=$(grep -rEn --include='*.md' --include='*.mdx' --include='*.astro' --include='*.html' \
      --include='*.json' --include='*.yml' --include='*.ts' "$p" "${dirs[@]}" 2>/dev/null \
      | grep -vE 'example\.(com|org)|noreply@'); then
    echo "Looks like a personal identifier (pattern: $p):"; echo "$hits"; fail=1
  fi
done

if ((fail)); then
  echo "Public-safety check failed. Remove the data above; everything merged here is public." >&2
  exit 1
fi
echo "Public-safety check passed."
