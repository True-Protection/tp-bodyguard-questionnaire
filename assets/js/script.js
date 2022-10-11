
    
 $(".owl-carousel").owlCarousel({
    autoply: true,
    autoplyhoverpause: true,
    autoplytiomeout: 100,
    items: 4,
    nav: true,
    loop: true,
    
    preponsive: {
      0:{
         items:2
         
      },
      575:{
         items:3
         
      },
      960:{
         items:4,
         dots: true
      }
      
    }
 });    
       
   