# Memory photos

Drop your polaroid photos into this folder. Each memory in `../data.js` points
at a file here by name. Save your image with the matching filename and it shows
up automatically on the map and in the memory card — no code change needed.

If a file is missing, that memory falls back to its emoji (`icon` in
`data.js`), so the app always looks complete while you fill these in.

## Expected filenames

| Order | Memory | File |
|---|---|---|
| 1 | Where It All Began | `meet.JPG` |
| 2 | Our First Movie | `movie.jpg` |
| 3 | The Rainy Walk | `rain.jpg` |
| 4 | The Fair | `fair.jpg` |
| 5 | First 'I Like You' | `stars.jpg` |
| 6 | The Mountain | `mountain.jpg` |
| 7 | The Road Trip | `roadtrip.jpg` |
| 8 | The Beach | `beach.jpg` |
| 9 | Our Song | `song.jpg` |
| 10 | The Stray We Kept | `cat.jpg` |
| 11 | A Place of Our Own | `home.jpg` |
| 12 | The Question | `question.jpg` |
| 13 | The Big Day | `bigday.jpg` |
| 14 | The Honeymoon | `honeymoon.jpg` |
| 15 | And Onward | `onward.jpg` |

## Tips

- **Square looks best.** Polaroids show a square window and center-crop the
  image (`object-fit: cover`), so a roughly square photo won't lose much.
- **Any web image format works.** `.jpg` is the default naming above; to use a
  different name or format (e.g. `meet.png`), just update that memory's `photo`
  value in `../data.js`.
- **Keep them reasonably small** (e.g. ≤ ~1200px) so the page loads quickly.
