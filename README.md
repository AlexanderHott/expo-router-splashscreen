# `react-native-bootsplash` src bug

```bash
bun i

bunx react-native generate-bootsplash src/assets/images/icon-round.png --background 151719 --logo-width 150 --assets-output src/assets/bootsplash

bunx expo prebuild --clean -p ios
```

Error

```terminal
$ bunx expo prebuild --clean -p ios

✔ Created native directory | reusing /ios
✔ Updated package.json | no changes
❌  "assets/bootsplash/ios" doesn't exist. Did you ran the asset generation command?
⠋ Running prebuild%
```
