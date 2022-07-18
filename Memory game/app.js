const cardArray = [
  {
    name: "fries",
    img: "./images/fries.PNG",
  },
  {
    name: "icecream",
    img: "./images/icecream.jpg",
  },
  {
    name: "chips",
    img: "./images/chips.PNG",
  },
  {
    name: "burger",
    img: "./images/burger.PNG",
  },
  {
    name: "cake",
    img: "./images/cake.PNG",
  },
  {
    name: "pizza",
    img: "./images/pizza.PNG",
  },
  {
    name: "fries",
    img: "./images/fries.PNG",
  },
  {
    name: "icecream",
    img: "./images/icecream.jpg",
  },
  {
    name: "chips",
    img: "./images/chips.PNG",
  },
  {
    name: "burger",
    img: "./images/burger.PNG",
  },
  {
    name: "cake",
    img: "./images/cake.PNG",
  },
  {
    name: "pizza",
    img: "./images/pizza.PNG",
  }
];

//Inorder to sort an arr in random order
cardArray.sort(()=> 0.5-Math.random())

const flipsound=new Audio('./sounds/flip.mp3');
const oops=new Audio('./sounds/oops.mp3');
const matchsound=new Audio('./sounds/match.mp3');
const congratulations=new Audio('./sounds/congratulations.mp3');

const grid=document.querySelector('#grid');
const resultdisp=document.querySelector('#result');
const commentdisp=document.querySelector('#comment');
let cardschosen=[];
let cardchosenid=[];
const cardswon=[]

// console.log(cardArray)

//Create board for game
function board(){
    for(let i=0;i<12;i++){
        const card=document.createElement('img');

        //used to set attributes like id,class,type etc
        card.setAttribute('src','./images/back.PNG');
        card.setAttribute('data-id',i);
        card.addEventListener('click',flip)
        //console.log(card,i);
        grid.appendChild(card);
    }
}

board()

function checkmatch(){
    //gather all cards
    const cards=document.querySelectorAll('img')

    //fstcard is the card which u click first and sndcard is the card you click next.
    //for this game we click 2 2 cards and compare
    const fstcard = cardchosenid[0];
    const sndcard = cardchosenid[1];

    if(fstcard==sndcard){
        //The case when same card is clicked twice
        oops.play();
        alert("you can't select the same card twice")
        cards[sndcard].setAttribute("src", "images/back.PNG");


    }

    else if(cardschosen[0]==cardschosen[1]){
        matchsound.play();
        // alert('Yay match found!');
        commentdisp.textContent='Yay match found!';
        commentdisp.style.color='orange';
        cards[fstcard].setAttribute('src','./images/done.PNG');
        cards[sndcard].setAttribute("src", "./images/done.PNG");
        cards[fstcard].removeEventListener('click',flip); 
        cards[sndcard].removeEventListener("click", flip); 
        cardswon.push(cardschosen);
        resultdisp.innerHTML = Number(resultdisp.innerHTML) +5;

    }

    else{
        cards[fstcard].setAttribute('src','images/back.PNG');
        cards[sndcard].setAttribute("src", "images/back.PNG");
        oops.play();
        // alert('Sorry, try again?');
        commentdisp.innerHTML='Oops, try again?';
        commentdisp.style.color='red';
        resultdisp.innerHTML =Number(resultdisp.innerHTML)-1;
    }
    //one point for each card

   // resultdisp.innerHTML=cardswon.length
    cardschosen=[]
    cardchosenid=[]

    if(cardswon.length== (cardArray.length)/2){
        commentdisp.innerHTML='Yayyy! you found em all!';
        commentdisp.style.color='green';

        congratulations.play();

    }
}


function flip(){
    
    flipsound.play();
    let cardId=this.getAttribute('data-id');
    let orgcard=cardArray[cardId].name;
    cardschosen.push(orgcard);
    cardchosenid.push(cardId);

    console.log(cardschosen);
    this.setAttribute('src',cardArray[cardId].img)
    if(cardschosen.length===2){
        //This is execute the fn after a given time. more like delay
        setTimeout(checkmatch,500)
    }
}



