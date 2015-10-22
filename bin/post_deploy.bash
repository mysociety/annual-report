cd "$(dirname $BASH_SOURCE)"/..

ruby1.9.1 /usr/bin/bundle install --deployment --binstubs vendor/bin
cd 2014
../vendor/bin/sass --update assets/sass:assets/css
../vendor/bin/jekyll build
