cd "$(dirname $BASH_SOURCE)"/..

bundle config set --local deployment 'true'
bundle install --binstubs ../gem-bin
cd $1
../../gem-bin/sass --update assets/sass:assets/css --style compressed
../../gem-bin/jekyll build
