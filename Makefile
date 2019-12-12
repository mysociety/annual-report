.PHONY: 2014 2014-jekyll 2014-sass
2014:
	make -j 2 2014-jekyll 2014-sass
2014-jekyll:
	vendor/bin/jekyll serve --source 2014 --destination 2014/_site --baseurl ''
2014-sass:
	vendor/bin/sass --watch 2014/assets/sass:2014/assets/css

.PHONY: 2015 2015-jekyll 2015-sass
2015:
	make -j 2 2015-jekyll 2015-sass
2015-jekyll:
	vendor/bin/jekyll serve --source 2015 --destination 2015/_site --baseurl ''
2015-sass:
	vendor/bin/sass --watch 2015/assets/sass:2015/assets/css

.PHONY: 2016 2016-jekyll 2016-sass
2016:
	make -j 2 2016-jekyll 2016-sass
2016-jekyll:
	vendor/bin/jekyll serve --source 2016 --destination 2016/_site --baseurl ''
2016-sass:
	vendor/bin/sass --watch 2016/assets/sass:2016/assets/css

.PHONY: 2017 2017-jekyll 2017-sass
2017:
	make -j 2 2017-jekyll 2017-sass
2017-jekyll:
	vendor/bin/jekyll serve --source 2017 --destination 2017/_site --baseurl ''
2017-sass:
	vendor/bin/sass --watch 2017/assets/sass:2017/assets/css

.PHONY: 2018 2018-jekyll 2018-sass
2018:
	make -j 2 2018-jekyll 2018-sass
2018-jekyll:
	vendor/bin/jekyll serve --source 2018 --destination 2018/_site --baseurl ''
2018-sass:
	vendor/bin/sass --watch 2018/assets/sass:2018/assets/css

.PHONY: 2019 2019-jekyll 2019-sass
2019:
	make -j 2 2019-jekyll 2019-sass
2019-jekyll:
	vendor/bin/jekyll serve --source 2019 --destination 2019/_site --baseurl ''
2019-sass:
	vendor/bin/sass --watch 2019/assets/sass:2019/assets/css