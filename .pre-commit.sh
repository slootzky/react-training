git diff — name-only HEAD | grep ".*\.js" | xargs prettier — write -single-quote -trailing-comma es5 -print-width 120
