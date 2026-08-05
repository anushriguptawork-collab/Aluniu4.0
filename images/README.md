# Memory photos

Drop your polaroid photos into this folder. Each memory in `../data.js` points
at a file here by name. Save your image with the matching filename and it shows
up automatically on the map and in the memory card — no code change needed.

If a file is missing, that memory falls back to its emoji (`icon` in
`data.js`), so the app always looks complete while you fill these in.

## Expected filenames

| Order | Memory | File |
|---|---|---|
| 1 | Where It All Began | `1.jpg` |
| 2 | Our First Movie | `2.jpg` |
| 3 | The Rainy Walk | `3.jpg` |
| 4 | The Fair | `4.jpg` |
| 5 | First 'I Like You' | `5.jpg` |
| 6 | First 'I Like You' | `6.jpg` |
| 7 | The Mountain | `7.jpg` |
| 8 | The Road Trip | `8.jpg` |
| 9 | The Beach | `9.jpg` |
| 10 | Our Song | `10.jpg` |
| 11 | A Place of Our Own | `11.jpg` |
| 12 | The Question | `12.jpg` |
| 13 | The Big Day | `13.jpg` |
| 14 | The Honeymoon | `14.jpg` |
| 16 | And Onward | `15.jpg` |
| 17 | And Onward | `16.jpg` |
| 18 | And Onward | `17.jpg` |
| 19 | And Onward | `18.jpg` |


## Tips

- **Square looks best.** Polaroids show a square window and center-crop the
  image (`object-fit: cover`), so a roughly square photo won't lose much.
- **Any web image format works.** `.jpg` is the default naming above; to use a
  different name or format (e.g. `meet.png`), just update that memory's `photo`
  value in `../data.js`.
- **Keep them reasonably small** (e.g. ≤ ~1200px) so the page loads quickly.
