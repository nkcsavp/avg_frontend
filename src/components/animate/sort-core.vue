<template>
  <button disabled id="test-button" @click="JsonTest">begin</button>
  <div class="display-area">
  </div>
</template>

<script>
export default {
  name: 'sort-core',
  mounted() {
    setTimeout(() => {
      console.log(`from mounted.`);
      init();
      document.getElementById('test-button').disabled = false;
    }, 500);
  },
  methods: {
    JsonTest() {
      let jsonObj = JSON.parse(`{
        "originData":[1,2,3,9,3,4,5],
        "operations":["get(0)","get(1)","get(1)","get(2)","get(2)","get(3)","get(3)","get(4)",
            "swap(3,4)","get(4)","get(5)","swap(4,5)","get(5)","get(6)","swap(5,6)","get(0)","get(1)","get(1)",
            "get(2)","get(2)","get(3)","get(3)","get(4)","get(4)","get(5)","get(0)","get(1)","get(1)","get(2)",
            "get(2)","get(3)","get(3)","get(4)","get(0)","get(1)","get(1)","get(2)","get(2)","get(3)","get(0)",
            "get(1)","get(1)","get(2)","get(0)","get(1)"]
        }`);
      this.beginDisplay(jsonObj);
    },

    beginDisplay(obj){
      document.getElementById('test-button').disabled = true;
      document.getElementById('test-button').innerHTML = 'displaying...'
      console.clear();
      document.getElementsByClassName('display-area')[0].innerHTML = '';
      window.displayArray = obj.originData;
      console.log(`displayOriginData:${window.displayArray}`);
      window.displayOperations = obj.operations;
      console.log(`displayOperations:${window.displayOperations}`);
      window.gottenArray = [];
      window.displayIndex = 0;
      document.getElementsByClassName('display-area')[0].style.width = `${50*window.displayArray.length}px`;
      for(let i = 0 ; i < displayArray.length; ++i){
        const newBlock = document.createElement('div');
        newBlock.id = `block-${i}`;
        newBlock.className = 'display-block';
        newBlock.innerHTML = `${displayArray[i]}`;
        newBlock.style.left = 20 * (i + 1) + 30 * i + 'px';
        document.querySelectorAll('.display-area')[0].appendChild(newBlock);
        const aimBlock = document.querySelector('#'+newBlock.id);
        setTimeout(()=>{displayCreate(aimBlock)},200);
      }
      setTimeout(()=>{
        const aimFrameInfo = getKeyFrame('keyframe_create');
        while(aimFrameInfo.styleSheet.cssRules.length>1){
          aimFrameInfo.styleSheet.deleteRule(aimFrameInfo.styleSheet.cssRules.length-1);
        }
        if(window.displayIndex < window.displayOperations.length){
          this.displayNext()
        }
        else{
          document.getElementById('test-button').disabled = false;
          document.getElementById('test-button').innerHTML = 'retry?';
          console.log(`display end...`);
        }
      },3100)
    },

    displayNext(){
      let re = window.displayOperations[window.displayIndex].match(/([a-z]+)\(([\d]+)\)/);
      let arrayForResetAnimation = [];
      if(re != null){
        console.log(`next operation match result: ${re}`);

        //get操作
        if(re[1] === 'get'){
          window.gottenArray.push(re[2]);
          let aimDivId;
          let aimDiv;

          //若已存在两个高亮显示的元素，则这对元素重置后再高亮新的元素
          if(window.gottenArray.length>2){
            while(window.gottenArray.length>1){
              aimDivId = `#block-${window.gottenArray[0]}`;
              aimDiv = document.querySelector(aimDivId);
              resetAnimation(aimDiv);
              window.gottenArray.shift();
            }
          }

          //启用动画并进行收尾工作
          aimDivId = `#block-${re[2]}`;
          aimDiv = document.querySelector(aimDivId);
          displayGet(aimDiv);
          setTimeout(()=>{
            // resetAnimation(aimDiv);
            window.displayIndex++;
            if(window.displayIndex < window.displayOperations.length){
              this.displayNext();
            }
            else{
              while(window.gottenArray.length>0){
                let tempAimDivId = `#block-${window.gottenArray[0]}`;
                let tempAimDiv = document.querySelector(tempAimDivId);
                resetAnimation(tempAimDiv);
                window.gottenArray.shift();
              }
              document.getElementById('test-button').disabled = false;
              document.getElementById('test-button').innerHTML = 'retry?';
              console.log(`display end...`);
            }
          },720);
        }

        //其余操作后续添加

      }
      else{
        //按2参数规则进行匹配
        re = window.displayOperations[window.displayIndex].match(/([a-z]+)\(([\d]+),([\d]+)\)/);
        if(re != null && re[0]!=null){

          //交换操作
          if(re[1] === 'swap'){
            console.log(`next operation match result: ${re}`);
            const aimBlockId1 = `#block-${re[2]}`;
            const aimBlockId2 = `#block-${re[3]}`;
            const BL = document.querySelector(aimBlockId1);
            const BR = document.querySelector(aimBlockId2);
            arrayForResetAnimation.push(BL);
            arrayForResetAnimation.push(BR);

            //清除之前的高亮效果
            while(window.gottenArray.length>0){
              let tempAimDivId = `#block-${window.gottenArray[0]}`;
              let tempAimDiv = document.querySelector(tempAimDivId);
              resetAnimation(tempAimDiv);
              window.gottenArray.shift();
            }

            //启用动画并进行收尾工作
            displaySwap(BL, BR);
            setTimeout(()=>{
              for(let j = 0 ; j<arrayForResetAnimation.length;++j){
                updateBlockInfo(arrayForResetAnimation[j]);
                resetAnimation(arrayForResetAnimation[j]);
              }
              const tempValue = window.displayArray[re[2]];
              window.displayArray[re[2]] = window.displayArray[re[3]];
              window.displayArray[re[3]] = tempValue;
              window.displayIndex++;
              console.log(`displayArray:${window.displayArray}`);
              const tempId = BL.id;
              BL.id = BR.id;
              BR.id = tempId;
              if(window.displayIndex<window.displayOperations.length){
                this.displayNext();
              }
              else{
                document.getElementById('test-button').disabled = false;
                document.getElementById('test-button').innerHTML = 'retry?';
                console.log(`display end...`);
              }
            },3300);
          }
        }
      }
    },
  },
};

/*动画函数*/
function displayCreate(aimDiv) {
  //获取图形信息
  const currentLeft = aimDiv.offsetLeft;
  const currentWidth = aimDiv.offsetWidth;
  const currentHeight = aimDiv.offsetHeight;
  const currentTop = aimDiv.offsetTop;

  //确保图形样式与动画初始状态一致
  aimDiv.style.left = currentLeft + 'px';
  aimDiv.style.width = currentWidth + 'px';
  aimDiv.style.height = currentHeight + 'px';
  aimDiv.style.top = currentTop + 'px';

  //print log:
  // console.log(`display_create 修改了aimDiv.style.left/width/height/top`);
  // printDivLog(aimDiv);

  //根据图形信息替换关键帧
  const aimFrameInfo = getKeyFrame('keyframe_create');
  console.log(
      `aimFrameInfo.styleSheet.cssRules.length:${aimFrameInfo.styleSheet.cssRules.length}`
  );
  const keyFrameName_1 = `keyframe_create_p1_${aimDiv.id}`;
  const keyFrameName_2 = `keyframe_create_p2_${aimDiv.id}`;

  //  第一阶段关键帧
  const newKeyFrame1 = `@keyframes ${keyFrameName_1} {
        0% {
          width: ${currentWidth}px;
          left: ${currentLeft}px;
          background-color: black;
        }
        100% {
          width: ${currentWidth + 30}px;
          left: ${currentLeft - 15}px;
          background: red;
        }
      }`;
  aimFrameInfo.styleSheet.insertRule(
      newKeyFrame1,
      aimFrameInfo.styleSheet.cssRules.length
  );
  console.log(
      `${
          aimFrameInfo.styleSheet.cssRules[
          aimFrameInfo.styleSheet.cssRules.length - 1
              ].cssText
      }`
  );

  //  第二阶段关键帧
  const newKeyFrame2 = `@keyframes ${keyFrameName_2} {
        0% {
            top: ${currentTop}px;
            height: 2px;
            background: red;
          }
          100% {
            top:${currentTop - 28}px;
            height: 30px;
            background-color: black;
          }
      }`;
  aimFrameInfo.styleSheet.insertRule(
      newKeyFrame2,
      aimFrameInfo.styleSheet.cssRules.length
  );
  console.log(
      `${
          aimFrameInfo.styleSheet.cssRules[
          aimFrameInfo.styleSheet.cssRules.length - 1
              ].cssText
      }`
  );

  //设置目标图形animation特征，激活动画
  aimDiv.style.backgroundColor = 'cadetblue';
  aimDiv.style.animationDelay = '0.5s,0.8s';
  aimDiv.style.animationDuration = '1s,1s';
  aimDiv.style.animationTimingFunction =
      'cubic-bezier(0.19, 1, 0.22, 1),cubic-bezier(0.19, 1, 0.22, 1)';
  aimDiv.style.animationFillMode = 'forwards,forwards';
  aimDiv.style.animationName = 'fakeName,fakeName';
  aimDiv.style.animationName = `${keyFrameName_1},${keyFrameName_2}`;
  setTimeout(() => {
    //print log:
    updateBlockInfo(aimDiv);
    aimDiv.style.animationFillMode = 'none';
  }, 2510);
}

function displaySwap(pL, pR) {
  let aimL,aimR;
  if(pL.offsetLeft>pR.offsetLeft){
    aimL = pR;
    aimR = pL;
  }
  else{
    aimL = pL;
    aimR = pR;
  }

  const startLeftL = aimL.offsetLeft;
  const startLeftR = aimR.offsetLeft;
  const endLeftL = startLeftR;
  const endLeftR = startLeftL;
  const startTopL = aimL.offsetTop;
  const startTopR = aimR.offsetTop;
  const middleTopL = startTopL - 50;
  const middleTopR = startTopR + 50;

  //阶段一
  const swapFrame_L1 = getKeyFrame('keyframe_swap_L1');
  swapFrame_L1.styleSheet.deleteRule(swapFrame_L1.index);
  const newKeyFrameL1 = `@keyframes keyframe_swap_L1{
    0%{
      top: ${startTopL}px;
      background-color:blue;
    }
    100%{
      top: ${middleTopL}px;
      background-color:green;
    }
  }`;
  swapFrame_L1.styleSheet.insertRule(newKeyFrameL1, swapFrame_L1.index);

  const swapFrame_R1 = getKeyFrame('keyframe_swap_R1');
  swapFrame_R1.styleSheet.deleteRule(swapFrame_R1.index);
  const newKeyFrameR1 = `@keyframes keyframe_swap_R1{
    0%{
      top: ${startTopR}px;
      background-color:yellow;
    }
    100%{
      top: ${middleTopR}px;
      background-color:green;
    }
  }`;
  swapFrame_R1.styleSheet.insertRule(newKeyFrameR1, swapFrame_R1.index);

  //阶段二
  const swapFrame_L2 = getKeyFrame('keyframe_swap_L2');
  swapFrame_L2.styleSheet.deleteRule(swapFrame_L2.index);
  const newKeyFrameL2 = `@keyframes keyframe_swap_L2{
    0%{
      left: ${startLeftL}px;
    }
    100%{
      left: ${endLeftL}px;
    }
  }`;
  swapFrame_L2.styleSheet.insertRule(newKeyFrameL2, swapFrame_L2.index);

  const swapFrame_R2 = getKeyFrame('keyframe_swap_R2');
  swapFrame_R2.styleSheet.deleteRule(swapFrame_R2.index);
  const newKeyFrameR2 = `@keyframes keyframe_swap_R2{
    0%{
      left: ${startLeftR}px;
    }
    100%{
      left: ${endLeftR}px;
    }
  }`;
  swapFrame_R2.styleSheet.insertRule(newKeyFrameR2, swapFrame_R2.index);

  //阶段三
  const swapFrame_L3 = getKeyFrame('keyframe_swap_L3');
  swapFrame_L3.styleSheet.deleteRule(swapFrame_L3.index);
  const newKeyFrameL3 = `@keyframes keyframe_swap_L3{
    0%{
      top: ${middleTopL}px;
      background-color:green;
    }
    100%{
      top: ${startTopL}px;
      background-color:aqua;
    }
  }`;
  swapFrame_L3.styleSheet.insertRule(newKeyFrameL3, swapFrame_L3.index);

  const swapFrame_R3 = getKeyFrame('keyframe_swap_R3');
  swapFrame_R3.styleSheet.deleteRule(swapFrame_R3.index);
  const newKeyFrameR3 = `@keyframes keyframe_swap_R3{
    0%{
      top: ${middleTopR}px;
      background-color:green;
    }
    100%{
      top: ${startTopR}px;
      background-color:aqua;
    }
  }`;
  swapFrame_R3.styleSheet.insertRule(newKeyFrameR3, swapFrame_R3.index);

  aimL.style.animationDelay = '0.5s,0.75s,2s';
  aimR.style.animationDelay = '0.5s,0.75s,2s';
  aimL.style.animationDuration = '1s,1.5s,1s';
  aimR.style.animationDuration = '1s,1.5s,1s';
  aimL.style.animationTimingFunction =
      'cubic-bezier(0.19, 1, 0.22, 1),cubic-bezier(0.19, 1, 0.22, 1),cubic-bezier(0.19, 1, 0.22, 1)';
  aimR.style.animationTimingFunction =
      'cubic-bezier(0.19, 1, 0.22, 1),cubic-bezier(0.19, 1, 0.22, 1),cubic-bezier(0.19, 1, 0.22, 1)';
  aimL.style.animationFillMode = 'forwards,forwards,forwards';
  aimR.style.animationFillMode = 'forwards,forwards,forwards';
  aimL.style.animationName = '';
  aimR.style.animationName = '';
  aimL.style.animationName =
      'keyframe_swap_L1,keyframe_swap_L2,keyframe_swap_L3';
  aimR.style.animationName =
      'keyframe_swap_R1,keyframe_swap_R2,keyframe_swap_R3';
  // setTimeout(() => {
  //   updateBlockInfo(aimL);
  //   updateBlockInfo(aimR);
  //   resetAnimation(aimL);
  //   resetAnimation(aimR);
  // }, 3050);
}

function displayGet(aimDiv){
  aimDiv.style.animationDelay = '0s';
  aimDiv.style.animationDuration = '0.6s';
  aimDiv.style.animationTimingFunction = 'cubic-bezier(0.19, 1, 0.22, 1)';
  aimDiv.style.animationFillMode = 'forwards';
  aimDiv.style.animationName = '';
  aimDiv.style.animationName = 'keyframe_get';
}

/*工具函数*/
function getKeyFrame(aimName) {
  let ss = document.styleSheets;
  let result = {};
  for (let i = 0; i < ss.length; ++i) {
    const s = ss[i];
    for (let j = 0; j < s.cssRules.length; ++j) {
      if (
          s.cssRules[j] &&
          s.cssRules[j].name &&
          s.cssRules[j].name === aimName
      ) {
        //返回要查找的keyframe所在的style标签 及 目标keyframe的下标
        result.styleSheet = ss[i];
        result.index = j;
        return result;
      }
    }
  }
}

function updateBlockInfo(aimBlock) {
  aimBlock.style.left = aimBlock.offsetLeft + 'px';
  aimBlock.style.width = aimBlock.offsetWidth + 'px';
  aimBlock.style.top = aimBlock.offsetTop + 'px';
  aimBlock.style.height = aimBlock.offsetHeight + 'px';
  console.log(`block info has been updated`);
  // printDivLog(aimBlock);
}

function init() {
  let initKeyFramesCreate = `@keyframes keyframe_create {
          0% {
          }
          100% {
          }
        }`;
  let sheetForKeyFramesCreate = document.createElement(`style`);
  sheetForKeyFramesCreate.type = 'text/css';
  sheetForKeyFramesCreate.innerHTML = initKeyFramesCreate;
  document
      .getElementsByTagName('head')[0]
      .appendChild(sheetForKeyFramesCreate);

  let initKeyFramesSwap = `@keyframes keyframe_swap_L1{
          0%{
          }
          100%{
          }
        }
        @keyframes keyframe_swap_R1{
          0%{
          }
          100%{
          }
        }
        @keyframes keyframe_swap_L2{
          0%{
          }
          100%{
          }
        }
        @keyframes keyframe_swap_R2{
          0%{
          }
          100%{
          }
        }
        @keyframes keyframe_swap_L3{
          0%{
          }
          100%{
          }
        }
        @keyframes keyframe_swap_R3{
          0%{
          }
          100%{
          }
        }`;
  let sheetForKeyFramesSwap = document.createElement(`style`);
  sheetForKeyFramesSwap.type = 'text/css';
  sheetForKeyFramesSwap.innerHTML = initKeyFramesSwap;
  document.getElementsByTagName('head')[0].appendChild(sheetForKeyFramesSwap);

  let initKeyFramesGet = `@keyframes keyframe_get{
    0%{
    background-color: cadetblue;
    }
    100%{
    background-color: yellow;
    }
  }`;
  let sheetForKeyFramesGet = document.createElement(`style`);
  sheetForKeyFramesGet.type = 'text/css';
  sheetForKeyFramesGet.innerHTML = initKeyFramesGet;
  document.getElementsByTagName('head')[0].appendChild(sheetForKeyFramesGet);

  console.log('keyframes should be inited.');
}

function printDivLog(aimDiv) {
  console.log(`aimDiv position and size info:↓↓↓ ID:${aimDiv.id}`);
  console.log(`left:${aimDiv.style.left} offsetLeft:${aimDiv.offsetLeft}`);
  console.log(`top:${aimDiv.style.top} offsetTop:${aimDiv.offsetTop}`);
  console.log(`width:${aimDiv.style.width} offsetWidth:${aimDiv.offsetWidth}`);
  console.log(
      `height:${aimDiv.style.height} offsetHeight:${aimDiv.offsetHeight}`
  );
  console.log(`。`);
}

function resetAnimation(aim) {
  aim.style.animationDelay = '';
  aim.style.animationDuration = '';
  aim.style.animationFillMode = '';
  aim.style.animationName = '';
  aim.style.animationTimingFunction = '';
}
</script>

<style>
/*CSS样式*/
.display-area {
  height: 350px;
  width: 0px;
  /*background-color: beige;*/
  position: relative;
  top: 75px;
  left: 75px;
  display: flex;
}
.display-block {
  background-color: aqua;
  height: 3px;
  width: 0px;
  position: absolute;
  top: 100px;
}
</style>
