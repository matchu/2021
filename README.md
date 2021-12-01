# Matchu's Advent of Code 2021 Solutions

Publishing just in case they're useful, or helpful as a foundation!

I'm writing my solutions in Javascript, and using the Jest test framework both
for tests _and_ for puzzle output!

So, in this environment, the only thing you need to do is `npm test -- --watch`
to get the Jest runner watching your code!

Check out day 1 for an example! My process is to:

1. Write a test for the small provided example.
2. Write code to pass the test. (This is the biggest step, it will hopefully
   solve the puzzle too!)
3. Write code read the puzzle input file.
4. Write a puzzle-solver test, using all the code so far. It will edit itself to
   include the solution, via Jest's "inline snapshots".

## Secrets to the setup

If you want to use this setup for your own Advent of Code repo, here's what you
need to know:

I'm using Node's ES modules support, by adding `type: "module"` to
`package.json`. This also requires some extra tricks to get Jest to run, which
you can see in our `test` script in `package.json`.

This also means we need to use URLs for relative file loading, because in ES
modules, the current module's path is defined by the URL `import.meta.url`. To
load an input file, you'll use: `new URL("../input/day1.txt", import.meta.url)`.

I also personally use the VS Code Jest extension, which requires setting the
`"jest.jestCommandLine": "npm test --"` setting in your VS Code workspace to get
it to use `npm test` and include our custom settings! This also lets you debug
your tests in VS Code, which can be really nice for figuring out what's wrong!

The decision to split into `src` and `input` directories at the top level was
arbitrary! Splitting into directories like `days/1/` would make sense to me too!
