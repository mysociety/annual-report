cd "$(dirname $BASH_SOURCE)"/..

# If 1.9.1 is present, we're on wheezy with 1.8 + 1.9.1 installed, so want to
# use 1.9.1. If it's not, we'll be on stretch with 2.3 and can call bundle
# directly.
RUBY=$(which ruby1.9.1)
$RUBY /usr/bin/bundle install --deployment --binstubs ../gem-bin
cd $1
../../gem-bin/sass --update assets/sass:assets/css --style compressed
../../gem-bin/jekyll build
