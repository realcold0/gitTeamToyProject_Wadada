import { Bodies, Engine, Render, Runner, World, Body } from "matter-js";
import { IMAGES } from "./image";

const engine = Engine.create();
const render = Render.create({
  engine,
  element: document.body,
  options: {
    wireframes : false,
    background: "#FFFFFF", // background color
    width: 620,
    height: 850,
  }
});

const world = engine.world;

/** 왼쪽 벽 */
const leftWall = Bodies.rectangle(15, 395, 30, 790, { // matter js 는 오브젝트의 중앙을 기준으로 물체의 위치를 특정함.
  isStatic: true,
  render: {fillStyle: "#000000"} // 왼쪽벽 색상 설정
});
/** 오른쪽 벽 */
const rightWall = Bodies.rectangle(605, 395, 30, 790, { // x,y,height,width
  isStatic: true,
  render: {fillStyle: "#000000"} // 오른쪽 색상 설정
});
/** 바닥 벽 */
const ground = Bodies.rectangle(310, 820, 620, 60, { // x,y,height,width
  isStatic: true,
  render: {fillStyle: "#000000"} 
});
/** 천장 벽 */
const topLine = Bodies.rectangle(310, 150, 620, 2, { // x,y,height,width
  isStatic: true,
  isSensor: true,
  render: {fillStyle: "#000000"}
});

World.add(world, [leftWall, rightWall, ground, topLine]);

Render.run(render);
Runner.run(engine);

let currentBody = null;
let currentImage = null;

/** 과일을 생성하는 함수 */
function addImage(){
  const index = Math.floor(Math.random() * 3);
  const image = IMAGES[index];

  const body = Bodies.circle(300, 50, image.radius,{
    isSleeping: true, // 이벤트 전까지 더이상 떨어지지 않고 keep 한 상태가 됨.
    render:{
      sprite: { texture: `${image.label}.png` }
    },
    restitution: 0.2 // 과일의 탄성 설정
  });


  currentBody = body;
  currentImage = image;

  World.add(world, body);
}
/** 키보드 입력 구현
 * onkeydown : 자바스크립트의 기본적인 키보드 이벤트 함수 */

window.onkeydown = (event) => {
  switch (event.code) {
    case "KeyA": 
      Body.setPosition(currentBody,{
        x: currentBody.position.x - 10, // A 키를 두를때마다 왼쪽으로 10만큼 이동
        y: currentBody.position.y,
      });
      break;
    case "KeyD": 
      Body.setPosition(currentBody,{
        x: currentBody.position.x + 10, // A 키를 두를때마다 왼쪽으로 10만큼 이동
        y: currentBody.position.y,
      });
      break;
    case "KeyS": 
      currentBody.isSleeping = false;
      addImage();
      break;
  }
}
addImage();