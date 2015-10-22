cd "$(dirname $BASH_SOURCE)"/..

ruby1.9.1 /usr/bin/bundle install --deployment --binstubs ../gem-bin
cd $1
../../gem-bin/sass --update assets/sass:assets/css
../../gem-bin/jekyll build
