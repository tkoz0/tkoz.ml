
// table of contents generator
function maketoc() {
    let all = document.getElementsByTagName('*');
    let titles = [];
    let id = 0; // counter to make ids for in page links
    let htags = ['H2','H3','H4','H5','H6'];
    let baselevel = 1;
    for (let i = 0; i < all.length; ++i) {
        let tn = all[i].tagName;
        if (htags.includes(tn)) {
            let tnn = Number(tn.substring(1));
            let text = all[i].innerHTML;
            let idtext = '_toc' + String(++id);
            all[i].id = idtext;
            titles.push([tnn,text,idtext]);
        }
    }
    let retstr = '';
    let level = baselevel;
    // iterate through header tags to generate nested lists
    for (let i = 0; i < titles.length; ++i) {
        let tnn = titles[i][0];
        let text = titles[i][1];
        let idtext = titles[i][2];
        if (tnn > level) {
            while (level < tnn) {
                retstr += '<ol>';
                ++level;
            }
        } else {
            while (level > tnn) {
                retstr += '</ol>';
                --level;
            }
        }
        retstr += '<li><a href="#'+idtext+'">'+text+'</a></li>';
    }
    while (level > baselevel) { // finish closing
        retstr += '</ol>';
        --level;
    }
    return retstr;
    /*
    var retdoc = new DOMParser().parseFromString(retstr,'text/html');
    return retdoc.body.firstChild;
    */
}

var _msg = new Uint8Array([36, 7, 84, 17, 5, 20, 88, 30, 4, 17, 72, 30, 9, 17,
    30, 77, 84, 13, 7, 0, 17, 1, 65, 7, 7, 7, 4, 12, 5, 8, 26, 15, 74, 12, 25,
    25, 9, 89, 26, 15, 13, 25, 25, 4, 16, 72, 30, 14, 88, 7, 18, 25, 1, 30, 9,
    74, 92, 85, 67, 92, 82, 82, 78, 89, 86, 52, 15, 7, 0, 17, 1, 79, 23, 7, 7,
    65, 25, 3, 5, 84, 1, 4, 2, 20, 24, 5, 17, 72, 30, 9, 29, 77, 7, 29, 26, 25,
    21, 88, 91, 88, 84, 12, 3, 6, 17, 25, 18, 84, 7, 12, 65, 8, 4, 79]);
var _key = new TextEncoder().encode('mathjax');

function decryptmsg(msg,key) {
    let ret = [];
    for (let i = 0; i < msg.length; ++i)
        ret.push(msg[i] ^ key[i % key.length]);
    return new TextDecoder().decode(new Uint8Array(ret));
}

document.addEventListener('DOMContentLoaded', () => {
    let toc = document.getElementById('toc');
    if (toc !== null)
        toc.innerHTML += maketoc();
    console.log(decryptmsg(_msg,_key));
});

/*
window.onload = () => {
    let toc = document.getElementById('toc');
    if (toc !== null)
        toc.innerHTML += maketoc();
    console.log(decryptmsg(_msg,_key));
};
*/

// mathjax settings
window.MathJax = {
    ...window.MathJax,
    tex: {
        ...window.MathJax.tex,
        inlineMath: [['\\(','\\)']], // \( inline \)
        displayMath: [['\\[','\\]']], // \[ display \]
        formatError: (jax,err) => {
            console.log(jax,err);
            return jax.formatError(err);
        }
    },
    options: {
        ...window.MathJax.options
    }
};

// load mathjax script
(function() {
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    // expect mathjax installed here
    script.src = '/mathjax/tex-svg-full.js';
    document.head.appendChild(script);
})();
