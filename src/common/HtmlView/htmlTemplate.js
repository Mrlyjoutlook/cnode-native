export default (htmlContent) => (
  `<!DOCTYPE html>
  <html>
  <head>
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <style>
          * { padding: 0; margin: 0; }

          .markdown-text {
              margin: 0 .2rem;
          }

          p {
              margin: .2rem 0;
              line-height: .7rem;
              text-indent: 2em;
          }

          ul {
              margin: .2rem 0;
              padding-left: .6rem;
          }

          li {
              list-style-type: none;
          }

          table {
              border: 1px solid #ccc;
              padding: .1rem;
          }

          tr {
              border-bottom: 1px solid #ccc;
          }

          a {
              text-decoration: none;
              color: #4078c0;
          }

          code {
              padding: 0;
              padding-top: .2em;
              padding-bottom: .2em;
              margin: 0;
              font-size: 85%;
              background-color: rgba(0,0,0,.04);
              border-radius: 3px;
          }

          img {
            width: 100%;
            margin-left: -2em;
          }

          [data-dpr='2'] p {
              font-size: 20px;
          }

          [data-dpr='2'] li {
              font-size: 18px
          }

          [data-dpr='3'] p {
              font-size: 30px;
          }

          [data-dpr='3'] li {
              font-size: 27px
          }
      </style>
      <script>
          ; (function (win, lib) {
              var doc = win.document;
              var docEl = doc.documentElement;
              var metaEl = doc.querySelector('meta[name="viewport"]');
              var flexibleEl = doc.querySelector('meta[name="flexible"]');
              var dpr = 0;
              var scale = 0;
              var tid;
              var flexible = lib.flexible || (lib.flexible = {});

              if (metaEl) {
                  console.warn('将根据已有的meta标签来设置缩放比例');
                  var match = metaEl.getAttribute('content').match(/initial\-scale=([\d\.]+)/);
                  if (match) {
                      scale = parseFloat(match[1]);
                      dpr = parseInt(1 / scale);
                  }
              } else if (flexibleEl) {
                  var content = flexibleEl.getAttribute('content');
                  if (content) {
                      var initialDpr = content.match(/initial\-dpr=([\d\.]+)/);
                      var maximumDpr = content.match(/maximum\-dpr=([\d\.]+)/);
                      if (initialDpr) {
                          dpr = parseFloat(initialDpr[1]);
                          scale = parseFloat((1 / dpr).toFixed(2));
                      }
                      if (maximumDpr) {
                          dpr = parseFloat(maximumDpr[1]);
                          scale = parseFloat((1 / dpr).toFixed(2));
                      }
                  }
              }

              if (!dpr && !scale) {
                  var isAndroid = win.navigator.appVersion.match(/android/gi);
                  var isIPhone = win.navigator.appVersion.match(/iphone/gi);
                  var devicePixelRatio = win.devicePixelRatio;
                  if (isIPhone) {
                      // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
                      if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
                          dpr = 3;
                      } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)) {
                          dpr = 2;
                      } else {
                          dpr = 1;
                      }
                  } else {
                      // 其他设备下，仍旧使用1倍的方案
                      dpr = 1;
                  }
                  scale = 1 / dpr;
              }

              docEl.setAttribute('data-dpr', dpr);
              if (!metaEl) {
                  metaEl = doc.createElement('meta');
                  metaEl.setAttribute('name', 'viewport');
                  metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
                  if (docEl.firstElementChild) {
                      docEl.firstElementChild.appendChild(metaEl);
                  } else {
                      var wrap = doc.createElement('div');
                      wrap.appendChild(metaEl);
                      doc.write(wrap.innerHTML);
                  }
              }

              function refreshRem() {
                  var width = docEl.getBoundingClientRect().width;
                  if (width / dpr > 540) {
                      width = 540 * dpr;
                  }
                  var rem = width / 10;
                  docEl.style.fontSize = rem + 'px';
                  flexible.rem = win.rem = rem;
              }

              win.addEventListener('resize', function () {
                  clearTimeout(tid);
                  tid = setTimeout(refreshRem, 300);
              }, false);
              win.addEventListener('pageshow', function (e) {
                  if (e.persisted) {
                      clearTimeout(tid);
                      tid = setTimeout(refreshRem, 300);
                  }
              }, false);

              if (doc.readyState === 'complete') {
                  doc.body.style.fontSize = 12 * dpr + 'px';
              } else {
                  doc.addEventListener('DOMContentLoaded', function (e) {
                      doc.body.style.fontSize = 12 * dpr + 'px';
                  }, false);
              }


              refreshRem();

              flexible.dpr = win.dpr = dpr;
              flexible.refreshRem = refreshRem;
              flexible.rem2px = function (d) {
                  var val = parseFloat(d) * this.rem;
                  if (typeof d === 'string' && d.match(/rem$/)) {
                      val += 'px';
                  }
                  return val;
              }
              flexible.px2rem = function (d) {
                  var val = parseFloat(d) / this.rem;
                  if (typeof d === 'string' && d.match(/px$/)) {
                      val += 'rem';
                  }
                  return val;
              }

          })(window, window['lib'] || (window['lib'] = {}));
      </script>
  </head>

  <body>
      ${htmlContent}

  </body>
  <script>
      window.onload = function () {
          window.location.hash = 1;
          document.title = document.body.clientHeight + '/' + window.devicePixelRatio;
      }

  </script>

  </html>`
);
