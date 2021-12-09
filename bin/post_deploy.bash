cd "$(dirname $BASH_SOURCE)"/..

bundle install --deployment --binstubs ../gem-bin
cd $1
../../gem-bin/sass --update assets/sass:assets/css --style compressed
../../gem-bin/jekyll build
