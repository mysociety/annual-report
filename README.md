# mySociety Annual Report

mySociety in numbers, for 2014–2016.

### How it works

There’s a separate directory for each year. They all use the Sass command line
tool to compile the CSS, and then Jekyll to generate the static site.

We create pretty URLs using the `permalink:` feature in the YAML frontmatter of
each page.

Each page represents a chapter of the report, and contains a handful of
“sections” stacked vertically in the browser.

The height of these “sections”, and the width and height of the nav bar
elements, is dependent on the height and width of the browser window.

### To run locally

Initial set-up (assuming you have [Bundler](http://bundler.io/) installed):

```
bundle install --path vendor/bundle --binstubs vendor/bin
```

Then `cd` into the year you want to serve, and:

```
../vendor/bin/sass --watch assets/sass:assets/css
../vendor/bin/jekyll serve --baseurl ''
```

The site will be available at http://0.0.0.0:4000

### Generating annual commit statistics

Make sure `GITHUB_API_KEY` contains your key, either directly in your
environment, or in a .env file. Run the script to kick off the stats,
wait a while, run it again.

### Generating annual 'issues closed' statistic

Go to a URL such as:
https://github.com/issues?q=is%3Aclosed+is%3Aissue+user%3Amysociety+closed%3A%3E2016-12-14
