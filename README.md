# mySociety Annual Report

mySociety in numbers, for 2014–2016.

### How it works

There’s a separate directory for each year. They all use the Sass command line tool to compile the CSS, and then Jekyll to generate the static site.

We create pretty URLs using the `permalink:` feature in the YAML frontmatter of each page.

Each page represents a chapter of the report, and contains a handful of “sections” stacked vertically in the browser.

The height of these “sections”, and the width and height of the nav bar elements, is dependent on the height and width of the browser window.

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
