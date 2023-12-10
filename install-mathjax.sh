#!/bin/bash
sudo runuser -u www-data -- git clone https://github.com/mathjax/MathJax.git mathjax_tmp
sudo runuser -u www-data -- mkdir mathjax
sudo runuser -u www-data -- mv mathjax_tmp/es5/* mathjax/
sudo runuser -u www-data -- rm -rf mathjax_tmp
sudo runuser -u www-data -- cp mathjax_config.js mathjax/config.js
