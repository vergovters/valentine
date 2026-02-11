import React, { useEffect } from "react";
import "./file/default.css";
import jqueryUrl from "./file/jquery.min.js?url";
import jscexUrl from "./file/jscex.min.js?url";
import jscexParserUrl from "./file/jscex-parser.js?url";
import jscexJitUrl from "./file/jscex-jit.js?url";
import jscexBuilderBaseUrl from "./file/jscex-builderbase.min.js?url";
import jscexAsyncUrl from "./file/jscex-async.min.js?url";
import jscexAsyncPowerpackUrl from "./file/jscex-async-powerpack.min.js?url";
import functionJsUrl from "./file/function.js?url";
import loveJsUrl from "./file/love.js?url";

const BirthdayIntro: React.FC = () => {
  useEffect(() => {
    let cancelled = false;

    const loadScript = (src: string) =>
      new Promise<void>((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.async = false;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load ${src}`));
        document.body.appendChild(script);
      });

    const init = async () => {
      try {
        // Load libraries in the same order as original HTML
        await loadScript(jqueryUrl);
        await loadScript(jscexUrl);
        await loadScript(jscexParserUrl);
        await loadScript(jscexJitUrl);
        await loadScript(jscexBuilderBaseUrl);
        await loadScript(jscexAsyncUrl);
        await loadScript(jscexAsyncPowerpackUrl);
        await loadScript(functionJsUrl);
        await loadScript(loveJsUrl);

        if (cancelled) return;

        // Використовуємо той самий код, що й у src/her-birthday-main/index.html
        const bootstrapCode = `
        (function() {
          var canvas = $('#canvas');
      
          if (!canvas[0].getContext) {
              $("#error").show();
              return false;
          }
      
          var width = canvas.width();
          var height = canvas.height();        
          canvas.attr("width", width);
          canvas.attr("height", height);
      
          var opts = {
              seed: {
                  x: width / 2 - 20,
                  color: "rgb(190, 26, 37)",
                  scale: 2
              },
              branch: [
                  [535, 680, 570, 250, 500, 200, 30, 100, [
                      [540, 500, 455, 417, 340, 400, 13, 100, [
                          [450, 435, 434, 430, 394, 395, 2, 40]
                      ]],
                      [550, 445, 600, 356, 680, 345, 12, 100, [
                          [578, 400, 648, 409, 661, 426, 3, 80]
                      ]],
                      [539, 281, 537, 248, 534, 217, 3, 40],
                      [546, 397, 413, 247, 328, 244, 9, 80, [
                          [427, 286, 383, 253, 371, 205, 2, 40],
                          [498, 345, 435, 315, 395, 330, 4, 60]
                      ]],
                      [546, 357, 608, 252, 678, 221, 6, 100, [
                          [590, 293, 646, 277, 648, 271, 2, 80]
                      ]]
                  ]] 
              ],
              bloom: {
                  num: 700,
                  width: 1080,
                  height: 650,
              },
              footer: {
                  width: 1200,
                  height: 5,
                  speed: 10,
              }
          }
      
          var tree = new Tree(canvas[0], width, height, opts);
          var seed = tree.seed;
          var foot = tree.footer;
          var hold = 1;
      
          canvas.click(function(e) {
              var offset = canvas.offset(), x, y;
              x = e.pageX - offset.left;
              y = e.pageY - offset.top;
              if (seed.hover(x, y)) {
                  hold = 0; 
                  canvas.unbind("click");
                  canvas.unbind("mousemove");
                  canvas.removeClass('hand');
              }
          }).mousemove(function(e) {
              var offset = canvas.offset(), x, y;
              x = e.pageX - offset.left;
              y = e.pageY - offset.top;
              canvas.toggleClass('hand', seed.hover(x, y));
          });
      
          var seedAnimate = eval(Jscex.compile("async", function () {
              seed.draw();
              while (hold) {
                  $await(Jscex.Async.sleep(10));
              }
              while (seed.canScale()) {
                  seed.scale(0.95);
                  $await(Jscex.Async.sleep(10));
              }
              while (seed.canMove()) {
                  seed.move(0, 2);
                  foot.draw();
                  $await(Jscex.Async.sleep(10));
              }
          }));
      
          var growAnimate = eval(Jscex.compile("async", function () {
              do {
                  tree.grow();
                  $await(Jscex.Async.sleep(10));
              } while (tree.canGrow());
          }));
      
          var flowAnimate = eval(Jscex.compile("async", function () {
              do {
                  tree.flower(2);
                  $await(Jscex.Async.sleep(10));
              } while (tree.canFlower());
          }));
      
          var moveAnimate = eval(Jscex.compile("async", function () {
              tree.snapshot("p1", 240, 0, 610, 680);
              while (tree.move("p1", 500, 0)) {
                  foot.draw();
                  $await(Jscex.Async.sleep(10));
              }
              foot.draw();
              tree.snapshot("p2", 500, 0, 610, 680);
      
              canvas.parent().css("background", "url(" + tree.toDataURL('image/png') + ")");
              canvas.css("background", "#ffe");
              $await(Jscex.Async.sleep(300));
              canvas.css("background", "none");
          }));
      
          var textAnimate = eval(Jscex.compile("async", function () {
              $("#code").show().typewriter();
          }));
          
          var runAsync = eval(Jscex.compile("async", function () {
              $await(seedAnimate());
              $await(growAnimate());
              $await(flowAnimate());
              $await(moveAnimate());
              textAnimate().start();
          }));
      
          runAsync().start();
        })();`;

        // Виконуємо оригінальний bootstrap-код після завантаження всіх скриптів
        // eslint-disable-next-line no-eval
        (0, eval)(bootstrapCode);
      } catch {
        // ignore errors – краще показати решту застосунку, ніж падати
      }
    };

    init();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div id="main">
      <div id="error">
        <a href="https://www.google.com/chrome/">Chrome</a> (
        <a href="https://www.mozilla.org/firefox/">Firefox</a>)
      </div>
      <div id="wrap">
        <div id="text">
          <div id="code">
            <span className="say" style={{ color: "black" }}>Привіт, моя люба 💞</span>
            <br />
            <span className="say" style={{ color: "black" }}>День Святого Валентина 💕</span>
            <br />
            <span className="say" style={{ color: "black" }}>Ти найсвітліша в моєму житті 🌟</span>
            <br />
            <span className="say" style={{ color: "black" }}>
              Хочу дарувати тобі все своє кохання 💗
            </span>
            <br />
            <span className="say" style={{ color: "black" }}>Ти так прекрасна 😍</span>
            <br />
            <span className="say" style={{ color: "black" }}>Люблю тебе від всього серця 💕</span>
            <br />
            <span className="say" style={{ color: "black" }}>Будь моєю валентинкою... назавжди? 💍</span>
            <br />
          </div>
        </div>
        <canvas id="canvas" width={1100} height={680}></canvas>
      </div>
    </div>
  );
};

export default BirthdayIntro;

