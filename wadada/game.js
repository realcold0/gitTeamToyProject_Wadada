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
World.add(world, [leftWall, rightWall, ground]);

Render.run(render);
Runner.run(engine);

let currentBody = null;
let currentImage = null;

/** 이미지를 생성하는 함수 */
function addImage(){
  let result = getChecked();
  console.log(result);

  let index;
  let image;
  
  if(result.length==0){
    index = Math.floor(Math.random() * IMAGES.length);
    image = IMAGES[index];
  }else{
    index = Math.floor(Math.random() * result.length);
    image = IMAGES.find(image => image.label === result[index]);
    console.log(image);
  }


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


// imgSrc: 이미지 파일 정보 담은 배열
/* ex. 
[
  {
    label: "차은우",
    radius: 120 / 2,
  },
]
*/
let makeCheckGroup = function(imgSrc){
    let cbDiv = $("#checkBoxDiv");
    let result="";
    let index=0;

    result += `<div class="p-4" >`;
    imgSrc.forEach(i => {
      result += 
      `<input type="checkbox" id="cb${index}" value="${i.label}" class="form-check-input">
      <label class="form-check-label text-white"> ${i.label}</label>
      </input><span style="margin-right:15px;"></span>`;
      index++;
    });
    result += `</div>`;

    cbDiv.html(result);

}

// 체크된 요소를 label로 리턴하기
// ex. ['차은우', '정해인']
let getChecked = function(){
    let result = $("#checkBoxDiv").find('input:checked').map(function(index){
        if($(this).is(":checked")==true){
            return $(this).val();
        }
    });
    return result;
}

// 체크박스의 변화가 일어났을 때 addImage() 호출하여 이미지 변경
function setCheckBoxClickListener(){
  $("#checkBoxDiv").change(function(){
    // 기존 이미지 지운다. 
    World.remove(world, currentBody);
    // 새로운 이미지를 추가한다. 
    addImage();
  });  
}

// 체크박스 생성
makeCheckGroup(IMAGES);
// 체크박스의 변화를 감지하는 함수를 추가한다. 
setCheckBoxClickListener();
addImage();