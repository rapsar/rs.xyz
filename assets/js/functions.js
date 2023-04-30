// @codekit-prepend "/vendor/hammer-2.0.8.js";

$( document ).ready(function() {

  // DOMMouseScroll included for firefox support
  var canScroll = true,
  scrollController = null;
  $(this).on('mousewheel DOMMouseScroll', function(e){

    if (!($('.outer-nav').hasClass('is-vis'))) {

      e.preventDefault();

      var delta = (e.originalEvent.wheelDelta) ? -e.originalEvent.wheelDelta : e.originalEvent.detail * 20;

      if (delta > 50 && canScroll) {
        canScroll = false;
        clearTimeout(scrollController);
        scrollController = setTimeout(function(){
          canScroll = true;
        }, 800);
        updateHelper(1);
      }
      else if (delta < -50 && canScroll) {
        canScroll = false;
        clearTimeout(scrollController);
        scrollController = setTimeout(function(){
          canScroll = true;
        }, 800);
        updateHelper(-1);
      }

    }

  });

  $('.side-nav li, .outer-nav li').click(function(){

    if (!($(this).hasClass('is-active'))) {

      var $this = $(this),
      curActive = $this.parent().find('.is-active'),
      curPos = $this.parent().children().index(curActive),
      nextPos = $this.parent().children().index($this),
      lastItem = $(this).parent().children().length - 1;

      updateNavs(nextPos);
      updateContent(curPos, nextPos, lastItem);

    }

  });

  $('.cta').click(function(){

    var curActive = $('.side-nav').find('.is-active'),
    curPos = $('.side-nav').children().index(curActive),
    lastItem = $('.side-nav').children().length - 1,
    nextPos = lastItem;

    updateNavs(lastItem);
    updateContent(curPos, nextPos, lastItem);

  });

  // swipe support for touch devices
  var targetElement = document.getElementById('viewport'),
  mc = new Hammer(targetElement);
  mc.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
  mc.on('swipeup swipedown', function(e) {

    updateHelper(e);

  });

  $(document).keyup(function(e){

    if (!($('.outer-nav').hasClass('is-vis'))) {
      e.preventDefault();
      updateHelper(e);
    }

  });

  // // determine scroll, swipe, and arrow key direction
  // function updateHelper(param) {
  //
  //   var curActive = $('.side-nav').find('.is-active'),
  //   curPos = $('.side-nav').children().index(curActive),
  //   lastItem = $('.side-nav').children().length - 1,
  //   nextPos = 0;
  //
  //   if (param.type === "swipeup" || param.keyCode === 40 || param > 0) {
  //     if (curPos !== lastItem) {
  //       nextPos = curPos + 1;
  //       updateNavs(nextPos);
  //       updateContent(curPos, nextPos, lastItem);
  //     }
  //     else {
  //       updateNavs(nextPos);
  //       updateContent(curPos, nextPos, lastItem);
  //     }
  //   }
  //   else if (param.type === "swipedown" || param.keyCode === 38 || param < 0){
  //     if (curPos !== 0){
  //       nextPos = curPos - 1;
  //       updateNavs(nextPos);
  //       updateContent(curPos, nextPos, lastItem);
  //     }
  //     else {
  //       nextPos = lastItem;
  //       updateNavs(nextPos);
  //       updateContent(curPos, nextPos, lastItem);
  //     }
  //   }
  //
  // }

  // sync side and outer navigations
  function updateNavs(nextPos) {

    $('.side-nav, .outer-nav').children().removeClass('is-active');
    $('.side-nav').children().eq(nextPos).addClass('is-active');
    $('.outer-nav').children().eq(nextPos).addClass('is-active');

  }

  // update main content area
  function updateContent(curPos, nextPos, lastItem) {

    $('.main-content').children().removeClass('section--is-active');
    $('.main-content').children().eq(nextPos).addClass('section--is-active');
    $('.main-content .section').children().removeClass('section--next section--prev');

    if (curPos === lastItem && nextPos === 0 || curPos === 0 && nextPos === lastItem) {
      $('.main-content .section').children().removeClass('section--next section--prev');
    }
    else if (curPos < nextPos) {
      $('.main-content').children().eq(curPos).children().addClass('section--next');
    }
    else {
      $('.main-content').children().eq(curPos).children().addClass('section--prev');
    }

    if (nextPos !== 0 && nextPos !== lastItem) {
      $('.header--cta').addClass('is-active');
    }
    else {
      $('.header--cta').removeClass('is-active');
    }

  }

  function outerNav() {

    $('.header--nav-toggle').click(function(){

      $('.perspective').addClass('perspective--modalview');
      setTimeout(function(){
        $('.perspective').addClass('effect-rotate-left--animate');
      }, 25);
      $('.outer-nav, .outer-nav li, .outer-nav--return').addClass('is-vis');

    });

    $('.outer-nav--return, .outer-nav li').click(function(){

      $('.perspective').removeClass('effect-rotate-left--animate');
      setTimeout(function(){
        $('.perspective').removeClass('perspective--modalview');
      }, 400);
      $('.outer-nav, .outer-nav li, .outer-nav--return').removeClass('is-vis');

    });

  }

//changed to slider-publi
  function workSliderPubli() {

    $('.slider-publi--prev, .slider-publi--next').click(function() {

      var $this = $(this),
      curLeft = $('.slider-publi').find('.slider-publi--item-left'),
      curLeftPos = $('.slider-publi').children().index(curLeft),
      curCenter = $('.slider-publi').find('.slider-publi--item-center'),
      curCenterPos = $('.slider-publi').children().index(curCenter),
      curRight = $('.slider-publi').find('.slider-publi--item-right'),
      curRightPos = $('.slider-publi').children().index(curRight),
      totalWorks = $('.slider-publi').children().length,
      $left = $('.slider-publi--item-left'),
      $center = $('.slider-publi--item-center'),
      $right = $('.slider-publi--item-right'),
      $item = $('.slider-publi--item');

      $('.slider-publi').animate({ opacity : 0 }, 400);

      setTimeout(function(){

        if ($this.hasClass('slider-publi--next')) {
          if (curLeftPos < totalWorks - 1 && curCenterPos < totalWorks - 1 && curRightPos < totalWorks - 1) {
            $left.removeClass('slider-publi--item-left').next().addClass('slider-publi--item-left');
            $center.removeClass('slider-publi--item-center').next().addClass('slider-publi--item-center');
            $right.removeClass('slider-publi--item-right').next().addClass('slider-publi--item-right');
          }
          else {
            if (curLeftPos === totalWorks - 1) {
              $item.removeClass('slider-publi--item-left').first().addClass('slider-publi--item-left');
              $center.removeClass('slider-publi--item-center').next().addClass('slider-publi--item-center');
              $right.removeClass('slider-publi--item-right').next().addClass('slider-publi--item-right');
            }
            else if (curCenterPos === totalWorks - 1) {
              $left.removeClass('slider-publi--item-left').next().addClass('slider-publi--item-left');
              $item.removeClass('slider-publi--item-center').first().addClass('slider-publi--item-center');
              $right.removeClass('slider-publi--item-right').next().addClass('slider-publi--item-right');
            }
            else {
              $left.removeClass('slider-publi--item-left').next().addClass('slider-publi--item-left');
              $center.removeClass('slider-publi--item-center').next().addClass('slider-publi--item-center');
              $item.removeClass('slider-publi--item-right').first().addClass('slider-publi--item-right');
            }
          }
        }
        else {
          if (curLeftPos !== 0 && curCenterPos !== 0 && curRightPos !== 0) {
            $left.removeClass('slider-publi--item-left').prev().addClass('slider-publi--item-left');
            $center.removeClass('slider-publi--item-center').prev().addClass('slider-publi--item-center');
            $right.removeClass('slider-publi--item-right').prev().addClass('slider-publi--item-right');
          }
          else {
            if (curLeftPos === 0) {
              $item.removeClass('slider-publi--item-left').last().addClass('slider-publi--item-left');
              $center.removeClass('slider-publi--item-center').prev().addClass('slider-publi--item-center');
              $right.removeClass('slider-publi--item-right').prev().addClass('slider-publi--item-right');
            }
            else if (curCenterPos === 0) {
              $left.removeClass('slider-publi--item-left').prev().addClass('slider-publi--item-left');
              $item.removeClass('slider-publi--item-center').last().addClass('slider-publi--item-center');
              $right.removeClass('slider-publi--item-right').prev().addClass('slider-publi--item-right');
            }
            else {
              $left.removeClass('slider-publi--item-left').prev().addClass('slider-publi--item-left');
              $center.removeClass('slider-publi--item-center').prev().addClass('slider-publi--item-center');
              $item.removeClass('slider-publi--item-right').last().addClass('slider-publi--item-right');
            }
          }
        }

      }, 400);

      $('.slider-publi').animate({ opacity : 1 }, 400);

    });

  }

  // function transitionLabels() {
  //
  //   $('.work-request--information input').focusout(function(){
  //
  //     var textVal = $(this).val();
  //
  //     if (textVal === "") {
  //       $(this).removeClass('has-value');
  //     }
  //     else {
  //       $(this).addClass('has-value');
  //     }
  //
  //     // correct mobile device window position
  //     window.scrollTo(0, 0);
  //
  //   });
  //
  // }

  outerNav();
  workSliderPubli();
  // transitionLabels();

  /////////////////////////////////////////////added RS
  $('.intro-1').click(function(event) {
    event.preventDefault(); // Prevent the default link behavior

    var sideNav = $('.side-nav');
    var children = sideNav.children();
    var curActive = sideNav.find('.is-active');
    var curPos = children.index(curActive);
    var nextPos = 1; // Zero-based index for the third child
    var lastItem = children.length - 1;

    if (nextPos < 0 || nextPos > lastItem) {
      console.error('Invalid child index: No child found at the specified index');
      return;
    }

    updateNavs(nextPos);
    updateContent(curPos, nextPos, lastItem);
  });

  $('.intro-2').click(function(event) {
    event.preventDefault(); // Prevent the default link behavior

    var sideNav = $('.side-nav');
    var children = sideNav.children();
    var curActive = sideNav.find('.is-active');
    var curPos = children.index(curActive);
    var nextPos = 2; // Zero-based index for the third child
    var lastItem = children.length - 1;

    if (nextPos < 0 || nextPos > lastItem) {
      console.error('Invalid child index: No child found at the specified index');
      return;
    }

    updateNavs(nextPos);
    updateContent(curPos, nextPos, lastItem);
  });

  $('.intro-3').click(function(event) {
    event.preventDefault(); // Prevent the default link behavior

    var sideNav = $('.side-nav');
    var children = sideNav.children();
    var curActive = sideNav.find('.is-active');
    var curPos = children.index(curActive);
    var nextPos = 3; // Zero-based index for the third child
    var lastItem = children.length - 1;

    if (nextPos < 0 || nextPos > lastItem) {
      console.error('Invalid child index: No child found at the specified index');
      return;
    }

    updateNavs(nextPos);
    updateContent(curPos, nextPos, lastItem);
  });


});

//////////////////////////////////////////
// added by RS

function updateMetaTag() {
  var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  var metaViewport = document.querySelector('meta[name="viewport"]');

  if (screenWidth >= 1200) {
    metaViewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
  } else {
    metaViewport.setAttribute('content',  'width=1200');
  }
}

window.addEventListener('resize', updateMetaTag);
window.addEventListener('DOMContentLoaded', updateMetaTag);
