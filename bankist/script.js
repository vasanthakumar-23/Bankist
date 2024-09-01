'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'King vasanth',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Alpha chad',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Thunder Chad',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Romeo chad',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts=[account1,account2,account3,account4];
//dom
const movements=document.querySelector('.movements');
const In=document.querySelector(".in");
const Out=document.querySelector('.out');
const Interest=document.querySelector('.interest');
const Balance=document.getElementById("balance");
const welcome=document.getElementById('welcome');
const loginbtn=document.getElementById('btnh');
const user=document.getElementById('user')
const pin=document.getElementById('pin');
const Main=document.querySelector('.Main');

const BtnLoan=document.querySelector('.btnloan');
const BtnClose=document.querySelector('.btnclose');
const BtnRight=document.querySelector('.btn');
const caution1=document.getElementById('caution-1');
const caution2=document.getElementById('caution-2');
const caution3=document.getElementById('caution-3');
const caution4=document.getElementById('caution-4');
const caution5=document.getElementById('caution-5');



let currentAccount;
let currentValue;
//Login
btnh.addEventListener("click",(e)=>{
  e.preventDefault();
  movements.innerHTML='';
  const Login=function(account){
    const visibility=Main.style.opacity=100;
    const welcomeVisibility=welcome.style.opacity=100;
    
    currentAccount=account.find(acc=>acc.username===user.value&&acc.pin==pin.value);
    currentAccount&&visibility;
    currentAccount&&welcomeVisibility;
    if(currentAccount===undefined){
      const caution=caution1.style.display="block";
      setTimeout(() => {
        location.reload(true)
       }, 3000);
      return caution
     
    }
    user.value='';
    pin.value='';
    console.log(currentAccount);
    currentValue=currentAccount.movements.reduce((acc,curr)=>{
      return acc+curr;
    })
    console.log(currentValue)

  }
  const UpdateUI=function(){
    displayMoments(currentAccount.movements);
    displaySummary(currentAccount.movements);
    displayBalance(currentAccount.movements);
    welcomeMsg(currentAccount.owner);
  }
  Login(accounts)
  UpdateUI();
})
// 


function displayMoments(movement){
  movement.forEach((mov,i)=>{
    const type=mov>0?"deposit":"withdraw";
    const html=`<div class="${type}"><p>${i+1} ${type}</p><p>${mov}$</p></div>`

    movements.insertAdjacentHTML('afterbegin',html)

  })
}


//summary

function displaySummary(movements){
 const Invalue= movements.filter((mov,i)=>{
    if (mov>0){
      return mov;
      console.log(mov)
    }
  }).reduce((acc,cur)=>{
    return acc+cur;
  })
  const Outvalue= movements.filter((mov,i)=>{
    if (mov<0){
      return mov;
      console.log(mov)
    }
  }).reduce((acc,cur)=>{
    return acc+cur;
  })
  Out.textContent=`${Math.abs(Outvalue)}$`
  In.textContent=`${Invalue}$`;
}



function displayBalance(movement){
   
const BalanceValue=  movement.reduce((acc,curr)=>{
    return acc+curr;
  })

  Balance.textContent=`${BalanceValue}$`

}



function welcomeMsg(owner){
  welcome.textContent=`welcome,${owner}`
}


//Creating username


// const createUsernames = function (accs) {
//   accs.forEach(function (acc) {
//     acc.username = acc.owner
//       .toLowerCase()
//       .split(' ')
//       .map(name => name[0])
//       .join('');
//   });
// };
// createUsernames(accounts);
function CreatingUsername(account){
  account.forEach((acc,i)=>{
   acc.username=acc.owner.toLowerCase().split(' ').map((name)=>
    name[0]).join('')});
}
CreatingUsername(accounts)


BtnRight.addEventListener('click',(e)=>{
e.preventDefault();


  const Transfer=function (acc){
    
const Transfer=document.getElementById('transfer');
const Transfer_Amount=document.getElementById('transferAmount');

      if(acc.owner!==Transfer.value){
        // console.log("valid",Transfer.value);
       const Receiver= accounts.find(acc=>{return acc.username===Transfer.value});
       console.log(Receiver);
      
       if(currentValue>Number(Transfer_Amount.value)){
        console.log('transaction successful')
        Receiver.movements.push(Number(Transfer_Amount.value));
       console.log(Receiver.movements)
       currentAccount.movements.push(Number(Transfer_Amount.value)*-1);
       console.log(currentAccount.movements);
       caution3.style.display="block";
       setTimeout(()=>{
        caution3.style.display="none";
       },5000)
       
       } 
       
       Transfer_Amount.value=" ";
       
      }
  }
  
  Transfer(currentAccount);

})

BtnLoan.addEventListener('click',(e)=>{

   e.preventDefault();
  const GetLoan=function(account){
    const Loan=document.getElementById('loan').value;
    console.log(Loan)
      account.balance=account.movements.reduce((acc,curr)=>{
        return acc+curr;
      })
      console.log(account.balance);
      if(account.balance>1000 && account.balance<8000){
           account.movements.push(Number(Loan));
           console.log('loan credited');
           caution4.style.display="block"
           setTimeout(() => {
            caution4.style.display="none"
           }, 3000);
      }else{
        setTimeout(() => {
          caution2.style.display="block"
         }, 3000);
        console.log('You have enough money ,youre not under eligible loan criteria')
      }
  }
  GetLoan(currentAccount)
})

BtnClose.addEventListener('click',(e)=>{
  e.preventDefault();
  const Close=document.getElementById('close');
  const Close_pin=document.getElementById('close-pin');
  console.log(Close.value)

   const CloseAccount= function(currentaccount){
    // console.log(accounts)
       if(currentaccount.username===Close.value && currentaccount.pin===Number(Close_pin.value)){
        const index = accounts.findIndex(acc=>acc.username===Close.value && acc.pin===Number(Close_pin.value));
        console.log(index)
        accounts.splice(index,1);
        caution5.style.display='block';
        setTimeout(()=>{
          caution5.style.display="none";
        },4000)
        Main.style.opacity=0;
        welcome.style.opacity=0;
   }}
   
   CloseAccount(currentAccount)


})


