

export function sidebar(){

  const sidebar = document.querySelector(".sidebar");
  const burger = document.querySelector(".burger");
  const sidebarContent = document.querySelectorAll(".sidebar-nav")

//sidebar toggle
  burger.addEventListener('click',(e)=>{
    e.stopPropagation();
    sidebar.classList.toggle("revertSidebar");
    burger.classList.toggle("animateBurger");
  
        sidebarContent.forEach((item,index)=>{
          
          item.style.transitionDelay=`${index * 0.1}s`;
        
          item.addEventListener('transitionend',()=>{
              item.style.transitionDelay='0s';
              item.classList.add("sidebar-nav-trans")
          },{once:true})
      })
  });

//when the anywhere in the page i clicked the siddebar closes (on mobile)
  document.addEventListener('click',e=>{
    const isOpen = sidebar.classList.contains("revertSidebar");

    if(isOpen){
      sidebar.classList.remove("revertSidebar");
      burger.classList.remove("animateBurger");
    }
  })


  //notify section
  const notify1 = document.querySelector('.notify');
  const message = document.querySelector('.notifyMessage');



function notify(){
  setTimeout(()=>{
    notify1.style.display='block';
    notify1.innerHTML='1';
    message.classList.add('toggleMessage');
  },12000)

  setTimeout(()=>{
  message.classList.remove('toggleMessage');
  },25000)
}


document.addEventListener('DOMContentLoaded',()=>{

  notify1.style.display='block';
  notify1.innerHTML='1';
  notify();
});

const bell = document.querySelector('.bell');

let setTimeoutId;

bell.addEventListener('click',()=>{
  const isActive = message.classList.contains('toggleMessage');
  
  if(isActive){
    message.classList.remove('toggleMessage');
  }else{
    if(setTimeoutId){
        clearTimeout(setTimeoutId);
    }
    message.classList.add('toggleMessage');
    setTimeoutId = setTimeout(()=>{
  message.classList.remove('toggleMessage');
      setTimeoutId=null;
    },11000);
   
  }
})



}


