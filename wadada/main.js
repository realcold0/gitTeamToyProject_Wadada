import './index_style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'
import Matter from 'matter-js'
// document.querySelector('#app').innerHTML = `
//   <div id="wrapper">
//     <button id="startBtn">버튼</button>
//   </div>
// `
/**
 * 화면 구성
 */


/**
 * matterjs 제작
 */

// module aliases
const startLoading = function(){
  const browserWidth = document.querySelector("#container").clientWidth;
  const browserHeight = document.querySelector("#container").clientHeight;
  var Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      Bodies = Matter.Bodies,
      Composite = Matter.Composite,
      Composties = Matter.Composites;


  // create an engine
  var engine = Engine.create();

  // create a renderer
  var render = Render.create({
      element: document.getElementById("container"),
      engine: engine,
      options:{
        width: browserWidth,
        height : browserHeight,
        wireframes: false,
      }
  });

  // create two boxes and a ground
  let startBtn = Bodies.rectangle(browserHeight)
  var ground = Bodies.rectangle(browserWidth/2, browserHeight, browserWidth, 40, { isStatic: true });
  var wallLeft = Bodies.rectangle(0, browserHeight /2, 10, browserHeight, { isStatic: true });
  var wallRight = Bodies.rectangle(browserWidth, browserHeight/2, 10, browserHeight, { isStatic: true });

  let stack1 = Composties.stack(0, -500, 10, 6, 5,  5, function(x, y) {
    return Bodies.rectangle(x, y, 40, 40);
  });
  // add all of the bodies to the world
  Composite.add(engine.world, [
    //wall
    ground,
    wallLeft,
    wallRight
  ]);

  Composite.add(engine.world, [stack1])

  // run the renderer
  Render.run(render);

  // create runner
  var runner = Runner.create();

  // run the engine
  Runner.run(runner, engine);
}

let startBtn = document.getElementById("startBtn");
startBtn.addEventListener("click", ()=>{
  startBtn.style.display = "none"
  startLoading();

  setTimeout(() =>{
    window.location.href = 'app.html'
  } , 3000);
})

setupCounter(document.querySelector('#counter'))
