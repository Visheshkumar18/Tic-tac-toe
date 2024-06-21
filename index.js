const boxes=document.querySelectorAll(".box");
const gameinfo=document.querySelector(".game-info");
const newGamebtn=document.querySelector(".btn");
let currentplayer;
let Gamegrid;
const winningpostion=[
   [0,1,2],
   [3,4,5],
   [6,7,8],
   [0,3,6],
   [1,4,7],
   [2,5,8],
   [0,4,8],
   [2,4,6]
];
// lets create a function that initialise a game 
function intGame(){
    currentplayer="X";
    Gamegrid=["","","","","","","","",""];
    newGamebtn.classList.remove('active');
    gameinfo.innerText=`Current Player - ${currentplayer}`;
   //  ui par empty karna hoga onclick on newgame button
   boxes.forEach((box,index)=>{
      box.innerText="";
      boxes[index].style.pointerEvents="all";
      // to initailse boxes again with same css propert
      // box.classList=`box box${index+1}`;
      // or we can use 
      box.classList.remove("win");
   });
};
intGame();
function swapturn(){
   if(currentplayer==="X"){
      currentplayer="O";   

   }
   else{
      currentplayer="X";
   }
   gameinfo.innerHTML=`CurrentPlayer-${currentplayer}`;
}
function checkgameover(){
   let answer="";
// all 3 boxes are non empty and all boxes have same value
winningpostion.forEach((position)=>{
   if((Gamegrid[position[0]]!=""||Gamegrid[position[1]]!=""||Gamegrid[position[2]]!="")&&(Gamegrid[position[0]]==Gamegrid[position[1]] &&Gamegrid[position[1]]==Gamegrid[position[2]])){
         if(Gamegrid[position[0]]=="X")
            answer="X";
         else
            answer="O";
      // disable pointer event
      boxes.forEach((box)=>{
         box.style.pointerEvents="none";
      });
         
         boxes[position[0]].classList.add("win");
         boxes[position[1]].classList.add("win");
         boxes[position[2]].classList.add("win");

   }
});
if(answer!=""){
 gameinfo.innerText=`WinnerPlayer - ${answer}`;
 newGamebtn.classList.add("active");
 return;
}
  let count=0;
  Gamegrid.forEach((box)=>{
   if(box!=""){
      count++;
   }
  });
  if(count==9){
   gameinfo.innerText=`Game Draw`;
   newGamebtn.classList.add("active");
  }
   

}
function handleclick(index){
   if(Gamegrid[index]===""){
      // boxes ui par update karna
      boxes[index].innerText=currentplayer;
      Gamegrid[index]=currentplayer;
      boxes[index].style.pointerEvents="none";
      swapturn();
      // check koi game jeet tho nahi gaya
      checkgameover();
     
   }

}
boxes.forEach((box,index)=>{
   // for each box we will run this code 
   // index is used on to tell that which box is click
   box.addEventListener('click',()=>{
      handleclick(index);
   });
});
newGamebtn.addEventListener("click",intGame);
