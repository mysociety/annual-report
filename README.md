# mySociety Annual Report

mySociety in numbers, for 2014–2019.

### How it works

There’s a separate directory for each year. They all use the Sass command line
tool to compile the CSS, and then Jekyll to generate the static site.

### To run locally

This repo includes submodules, so you’ll either want to start with a recursive
clone:

```
git clone --recursive git@github.com:mysociety/annual-report.git
```

Or, if you’ve already cloned the project, you’ll want to update the submodules:

```
cd annual-report
git submodule update --init --recursive
```

Once you’ve got the code and the submodules downloaded, it’s time to get Jekyll
and Sass working.

You’ll ideally want [Bundler](http://bundler.io/) installed. Then:

```
cd annual-report
bundle install --path vendor/bundle --binstubs vendor/bin
make 2019
```

The `Makefile` handles concurrently generating the Jekyll site and CSS files
for the given year. Output from both commands will be written to the terminal.
You can stop it by pressing `ctrl-C`.

The site will be available at http://0.0.0.0:4000

### Generating annual commit statistics

Make sure `GITHUB_API_KEY` contains your key, either directly in your
environment, or in a .env file. Run the script to kick off the stats,
wait a while, run it again.

### Generating annual 'issues closed' statistic

Go to a URL such as:
https://github.com/issues?q=is%3Aclosed+is%3Aissue+user%3Amysociety+closed%3A%3E2016-12-14
