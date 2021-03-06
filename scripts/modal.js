$(document).ready(function(){

  // MODAL
  var modalText = {
    roambi: {
      title: 'PT Bumi Pasiran Teduh',
      tag: 'COMPANY PROFILE.',
      detail: 'About us, News, blogs, article, slide show banner, contact us',
      link: 'http://www.bpt.co.id'
    },
    walker: {
      title: 'Signal Buddy',
      tag: 'ONLINE TRADING',
      detail: 'Signals buddy adalah aplikasi sinyal trading yang mudah, cepat, akurat, dan gratis, dalam mengembangkan investasi online trading anda',
    },
    powur: {
      title: 'klik4it.com',
      tag: 'ECOMMERCE',
      detail: 'Install and configure, Add and Update Content Management System. magento',
      link: 'http://www.klik4it.com'
    },
    mystand: {
      title: 'E-Leave',
      tag: 'E-LEAVE SYSTEM.',
      detail: 'E-leave is a web-based application to manage employees and time management employee. First Level & Second Level Approving Officers can Approve / Reject their employees leave application. HR can view details & summary of leave taken reports for all the employees.'
    },
//    never: {
//      title: 'NeverSurrender',
//      tag: 'ALS AWARENESS.',
//      detail: 'NeverSurrender is a platform for the new ALS foundation mobile app in hopes to raise awareness and research funding to fight ALS. Pure JavaScript marketing site to promote the new ALS NeverSurrender app.',
//      link: ''
//    },
    themall: {
      title: 'E-Pro Project',
      tag: 'PROJECT FIELD TRACKING.',
      detail: 'E-Pro is a field service solution that provides mobile applications to track and monitor projects activities. It enables clients to have better control on the status and progress of projects. Clients can also have visibility on project costing versus budget to enhance the overall risk management on projects.',
    },
    theomah: {
      title: 'Point of Sale',
      tag: 'RETAIL POS Omah Herborist',
      detail: 'Web Based POS System is a retail management system for small to mid-sized businesses. In addition to its Point of Sale module, the solution also offers integrated Inventory Management, Customer Management and module includes Receiving god, barcode scanners, opname, and the ability to discount items or void transactions. The inventory application helps keep track of purchase orders, inventory reports, the supplier database, and more.',
    }
  };
  
  $('#gallery .button').on('click', function(){
    fillModal(this.id);
    $('.modal-wrap').addClass('visible');
  });

  $('.close').on('click', function(){
    $('.modal-wrap, #modal .button').removeClass('visible');
  });

  $('.mask').on('click', function(){
    $('.modal-wrap, #modal .button').removeClass('visible');
  });

  var carousel = $('#carousel'),
      slideWidth = 700,
      threshold = slideWidth/3,
      dragStart, 
      dragEnd;

  setDimensions();

  $('#next').click(function(){ shiftSlide(-1) })
  $('#prev').click(function(){ shiftSlide(1) })

  carousel.on('mousedown', function(){
    if (carousel.hasClass('transition')) return;
    dragStart = event.pageX;
    $(this).on('mousemove', function(){
      dragEnd = event.pageX;
      $(this).css('transform','translateX('+ dragPos() +'px)');
    });
    $(document).on('mouseup', function(){
      if (dragPos() > threshold) { return shiftSlide(1) }
      if (dragPos() < -threshold) { return shiftSlide(-1) }
      shiftSlide(0);
    });
  });

  function setDimensions() {
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
     slideWidth = $(window).innerWidth();
    }
    $('.carousel-wrap, .slide').css('width', slideWidth);
    $('.modal').css('max-width', slideWidth);
    $('#carousel').css('left', slideWidth * -1)
  }

  function dragPos() {
    return dragEnd - dragStart;
  }

  function shiftSlide(direction) {
    if (carousel.hasClass('transition')) return;
    dragEnd = dragStart;
    $(document).off('mouseup')
    carousel.off('mousemove')
            .addClass('transition')
            .css('transform','translateX(' + (direction * slideWidth) + 'px)'); 
    setTimeout(function(){
      if (direction === 1) {
        $('.slide:first').before($('.slide:last'));
      } else if (direction === -1) {
        $('.slide:last').after($('.slide:first'));
      }
      carousel.removeClass('transition')
      carousel.css('transform','translateX(0px)'); 
    },700)
  }

  function fillModal(id) {
    $('#modal .title').text(modalText[id].title);
    $('#modal .detail').text(modalText[id].detail);
    $('#modal .tag').text(modalText[id].tag);
    if (modalText[id].link) $('#modal .button').addClass('visible')
                                               .parent()
                                               .attr('href', modalText[id].link)

    $.each($('#modal li'), function(index, value ) {
      $(this).text(modalText[id].bullets[index]);
    });
    $.each($('#modal .slide'), function(index, value) {
      $(this).css({
        background: "url('img/slides/" + id + '-' + index + ".jpg') center center/cover",
        backgroundSize: 'cover'
      });
      $(this).click(function(){
          window.open("img/slides/" + id + '-' + index + ".jpg","clearcache=yes");  
     });
     
    }); 
  }
})
