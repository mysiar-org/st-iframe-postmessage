venv::
	python -m venv venv
	. venv/bin/activate && pip install -U pip

install::
	. venv/bin/activate && pip install streamlit setuptools twine wheel
	. venv/bin/activate && pip install -e .
	cd st_iframe_postmessage/frontend && npm install

run::
	cd st_iframe_postmessage/frontend && npm start &
	. venv/bin/activate && _ST_IFRAME_POSTMESSAGE_NOT_RELEASE_=1 streamlit run st_iframe_postmessage/example.py

run-front::
	cd st_pagination_buttons/frontend && npm start &

run-st::
	. venv/bin/activate && _ST_IFRAME_POSTMESSAGE_NOT_RELEASE_=1 streamlit run st_iframe_postmessage/example.py


build::
	rm -rf build dist
	rm -rf st_iframe_postmessage/frontend/build
	mkdir -p st_iframe_postmessage/frontend/build
	cd st_iframe_postmessage/frontend && npm run build
	. venv/bin/activate && python setup.py sdist bdist_wheel

test::
	cd tests && make test

upload-test::
	$(MAKE) build
	. venv/bin/activate && python -m twine upload -u $${PYPI_USER} -p $${PYPI_PASS_TEST} --verbose --repository testpypi dist/*

upload::
	$(MAKE) build
	. venv/bin/activate && python -m twine upload -u $${PYPI_USER} -p $${PYPI_PASS} --verbose dist/*

