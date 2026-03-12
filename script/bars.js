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
    const isOpen = sidebar.classList.contains("revertSidebar");

    if(isOpen){
      sidebar.classList.remove("revertSidebar");
      burger.classList.remove("animateBurger");
    }
  })

}


