# P5RayCaster make file
# Andor Salga
#

build: minify

minify:
	cat P5RayCaster.pde Keyboard.pde Debugger.pde > P5RayCaster-min.js
	rm -fr tools-bin
	mkdir tools-bin/
	cc -o tools-bin/minifier tools/jsmin.c
	#./tools-bin/minifier < Tetrissing.js > Tetrissing-min.js
	#rm Tetrissing.js
	rm -fr tools-bin

# 
publish: minify
	#git checkout gh-pages
	#git merge master
	#minify
	git add P5RayCaster-min.js
	git commit -m"publishing"
	git push

