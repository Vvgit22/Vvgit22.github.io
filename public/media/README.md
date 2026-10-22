# Media slots

Files dropped in this folder are detected automatically at build time — no
code changes needed. Everything here should be safe to publish publicly.

| Slot | Filenames | Appears on | Max size |
|---|---|---|---|
| Job OS walkthrough | `job-os-demo.mp4` + `job-os-demo-poster.webp` | `/projects/job-os/` under "Recording" | 12 MB / 150 KB |
| Polaron pitch | `polaron-pitch.mp4` + `polaron-pitch-poster.webp` | `/polaron/` under "Video" | 25 MB / 150 KB |
| ReQuest game video | `request-game.mp4` (+ optional `request-game-poster.webp`) | `/projects/request/` under "The game" | 25 MB / 150 KB |
| ReQuest hardware photos | `request-photo-1.jpg|webp`, `request-photo-2.*`, `request-photo-3.*` | `/projects/request/` under "Hardware" | 1 MB each |
| Home portrait | `portrait.jpg|webp` | `/` header (96px round) | 500 KB |
| Polaron extra figures | `polaron-extra-*.{png,jpg,webp}` | `/polaron/` "More figures" strip | 500 KB each |

To encode a `.mov` for the video slots:

```sh
ffmpeg -i in.mov -vf scale=1280:-2 -c:v libx264 -crf 26 -preset slow \
  -c:a aac -b:a 96k -movflags +faststart out.mp4
```

Check what is present: `npm run media:check` (also runs in the deploy
workflow; any file over 25 MB fails the build loudly).
