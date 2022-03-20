# Webbench Editor

## Prepare the project

**1. Setup commitlint with husky**

```sh
npm install husky
npx husky install
npx husky add .husky/commit-msg 'npx commitlint --edit $1'

# Commit and verify the message
git commit -m 'add commitlint' # fail
git commit -m 'feat: add commitlint' # success
```