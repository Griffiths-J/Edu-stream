export function sidebar(){

  const sidebar = document.querySelector(".sidebar");
  const burger = document.querySelector(".burger");
  const sidebarContent = document.querySelectorAll(".sidebar-nav")


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


  document.addEventListener('click',e=>{
    const target = document.contains(e.target);
    const isOpen = sidebar.classList.contains("revertSidebar");

    if(isOpen && !target){
      sidebar.classList.remove("revertSidebar");
      burger.classList.remove("animateBurger");
    }
  })

}

export function utils(){

  class Utils{
    constructor(delay , boxNumber){
        this.delay=delay;
        this.boxNumber= boxNumber;
    }

   
  }

}