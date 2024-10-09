$(document).ready(function () {

  /**********************
    **********************
      MENU
    **********************
    **********************/
  $('.burger__btn').click(function () {
    $('html').addClass('open');

    $('.menu__list').addClass('active');
  });

  $('.close').click(() => {
    $('html').removeClass('open');

    $('.menu__list').removeClass('active');
  });

  let main = document.querySelector('.main');
  let modal = document.querySelector('.menu__list');

  main.onclick = function closeOnClick(event) {
    if (event.target == modal) {
      modal.removeClass('active');
    }
  };

  let lan = document.querySelector('.lan');

  lan.addEventListener('click', () => {
    lan.classList.toggle('active');
  })

  /**********************
     **********************
        LINKS ONCLICK SCROLLING
     **********************
     **********************/
  let links = document.querySelectorAll('a[href="#"]');

  links.forEach((link) => {
    link.addEventListener('click', function (event) {
      event.preventDefault();
    });
  });

  /**********************
    **********************
      ON SCROLL ANIMATION
    **********************
    **********************/
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry => {
      console.log(entry)
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      } else {
        entry.target.classList.remove('show');
      }
    }))
  })

  const hiddenElements = document.querySelectorAll('.hidden');
  hiddenElements.forEach((el) => observer.observe(el));

  /**********************
    **********************
      ON MOUSMOVE ANIMATION
    **********************
    **********************/
  const hero = document.querySelector('.hero');



  /*     function mouseMoveEvent(e) {
         heroAfter = hero.querySelector('::before');
         x = e.offsetX;
         y = e.offsetY;
     
         heroAfter.style.marginTop = `${y} + 'px'`
       }
     
       hero.addEventListener('mousemove', mouseMoveEvent); */

  if (hero) {
    hero.addEventListener('mousemove', function (ev) {
      /* document.documentElement.style.setProperty('--heroBefore', `calc(${ev.clientX + `rem`} - ${ev.clientY + `rem)`}`); */
      /* document.getElementById('acab').style.transform += 'translateX(' + (ev.clientX - 100) + 'px)'; */

      document.documentElement.style.setProperty('--X', `${ev.clientX / 15 + `px`}`);
      document.documentElement.style.setProperty('--Y', `${ev.clientY / 15 + `px`}`);


      document.documentElement.style.setProperty('--X', `${ev.clientX / 15 + `px`}`);
      document.documentElement.style.setProperty('--Y', `${ev.clientY / 15 + `px`}`);
    }, false);
  }

  /**********************
  **********************
    ABOUT UZBEKISTAN
  **********************
  **********************/

  // Get the SVG map element and the list of regions
  const svgMap = document.getElementById('uzbekistan-map');
  const regionListItems = document.querySelectorAll('.region__list-item');
  const uzbekistanInfo = document.getElementById('uzbekistan-info');
  const investmentStatistics = document.getElementById('investment-statistics');

  // Add click event listeners to each SVG region
  if (svgMap) {
    svgMap.querySelectorAll('path').forEach(function (region) {
      region.addEventListener('click', function () {
        // Reset the style of all list items and SVG regions
        regionListItems.forEach(function (item) {
          item.classList.remove('active');
        });
        svgMap.querySelectorAll('path').forEach(function (region) {
          region.removeAttribute('style');
        });

        // Get the region name from the data-region attribute
        const regionName = region.getAttribute('data-region');

        // Add active class to the corresponding list item
        const clickedListItem = document.querySelector(
          `.region__list-item[data-region='${regionName}']`
        );
        clickedListItem.classList.add('active');

        // Change the fill color of the clicked SVG region
        region.style.fill = '#ffffff'; // Change to your desired color
        region.style.fillOpacity = '1';

        if (uzbekistanInfo) {
          region.style.fill = 'oklch(67.88% 0.117 248.92)';
        } else if (investmentStatistics) {
          region.style.fill = 'oklch(67.88% 0.117 248.92)';
        }

        // Scroll to the clicked list item
        clickedListItem.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
      });
    });
  }

  // Add click event listeners to each list item
  if (regionListItems) {
    regionListItems.forEach(function (item) {
      item.addEventListener('click', function () {
        // Reset the style of all list items and SVG regions
        regionListItems.forEach(function (item) {
          item.classList.remove('active');
        });
        svgMap.querySelectorAll('path').forEach((region) => {
          region.removeAttribute('style');
        });

        // Get the region name from the data-region attribute
        const regionName = item.getAttribute('data-region');

        // Add active class to the corresponding list item
        const clickedRegion = svgMap.querySelector(
          `path[data-region='${regionName}']`
        );
        clickedRegion.style.fill = '#fff'; // Change to your desired color
        clickedRegion.style.fillOpacity = '1';

        if (uzbekistanInfo) {
          clickedRegion.style.fill = 'oklch(67.88% 0.117 248.92)';
        } else if (investmentStatistics) {
          clickedRegion.style.fill = 'oklch(67.88% 0.117 248.92)';
        }

        item.classList.add('active');

        // Scroll to the clicked list item
        item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });
    });
  }

  /* ACCORDION */

  let about_uzb_btns = document.querySelectorAll('.uzbekistan__about-btn');
  let about_uzb_content = document.querySelectorAll('.uzbekistan__about-accardion > p');

  console.log(about_uzb_content);

  about_uzb_btns.forEach((btn, index) => {

    const heightArr = about_uzb_content[index].offsetHeight;
    console.log(heightArr);
    about_uzb_content[index].style.maxHeight = '9.625rem';

    btn.addEventListener('click', () => {

      /* GET HTML FONT SIZE */
      const htm = document.querySelector('html');
      const style = window.getComputedStyle(htm, null).getPropertyValue('font-size');
      const fontSize = parseFloat(style);
      console.log(fontSize);

      if (btn.classList.contains('active')) {
        /* REMOVE ACTIVES IF IT CONTAINS */
        btn.classList.remove('active');
        about_uzb_content[index].classList.remove('active');
        about_uzb_content[index].style.maxHeight = '9.625rem';
      } else {
        /* REMOVE ALL ACTIVES IF IT CONTAINS */
        const btnActive = document.querySelectorAll('.uzbekistan__about-btn.active');
        btnActive.forEach((btnActive, btnActiveIndex) => {
          btnActive.classList.remove('active');

          about_uzb_content.forEach(item => {
            if (item.offsetHeight > 154) {
              item.style.maxHeight = '9.625rem';
            }
          })

        })

        /* ADD ACTIVE */
        btn.classList.add('active');
        about_uzb_content[index].style.maxHeight = (heightArr / fontSize) + 'rem';


      }
    })

  })


  /**********************
   **********************
     ACCORDION
   **********************
   **********************/

  const accordionBtns = document.querySelectorAll('.accordion__btn');
  const accordionInfos = document.querySelectorAll('.accordion__info');

  accordionBtns.forEach((accordionBtn, index) => {

    accordionBtn.addEventListener('click', () => {
      if (accordionBtn.classList.contains('accordion-active')) {
        accordionBtn.classList.remove('accordion-active');
        accordionInfos[index].classList.remove('accordion-active');
      } else {

        const accordionTitlesWithIsOpen =
          document.querySelectorAll('.accordion-active');

        accordionTitlesWithIsOpen.forEach((accordionTitleWithIsOpen) => {
          accordionTitleWithIsOpen.classList.remove('accordion-active');
          if (accordionInfos[index].classList.contains('accordion-active')) {
          }
        });

        accordionBtn.classList.add('accordion-active');
        accordionInfos[index].classList.add('accordion-active');
      }
    });
  });


  /**********************
   **********************
     TABS
   **********************
   **********************/
  const tabs = document.querySelectorAll('.tab-link');
  const all_list = document.querySelectorAll('.tab-content');

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', function () {

      tabs.forEach((tab) => {
        tab.classList.remove('active');
      });
      tab.classList.add('active');

      all_list.forEach((list) => {
        list.classList.remove('active');
      });
      all_list[index].classList.add('active');

      console.log(index);

    });
  });


  /**********************
    **********************
      VIDEO
    **********************
    **********************/
  $('.interview__item').magnificPopup({
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,
  });

  /* Video Preview */
  var Youtube = (function () {
    var video, results;

    var getThumb = function (url, size) {
      if (url === null) {
        return '';
      }
      size = (size === null) ? 'big' : size;
      results = url.match('[\\?&]v=([^&#]*)');
      video = (results === null) ? url : results[1];


      if (size === 'small') {
        return 'https://img.youtube.com/vi/' + video + '/2.jpg';
      }
      return 'https://img.youtube.com/vi/' + video + '/0.jpg';
    };

    return {
      thumb: getThumb
    };
  }());

  //Implementing
  let popupVideo = document.querySelectorAll('.interview__item');
  let galleryVideoItems = document.querySelectorAll('.interview__item');

  popupVideo.forEach((video, index) => {
    let link = video.href;

    let clearLink = link.replace('https://www.youtube.com/watch?v=', '')

    let thumb = Youtube.thumb(clearLink, 'big');
    let thumbImg = document.createElement('img');
    thumbImg.src = thumb;

    galleryVideoItems[index].append(thumbImg);
  })

  /**********************
    **********************
      GRADIENT
    **********************
    **********************/
  const MIN_SPEED = 2
  const MAX_SPEED = 3

  function randomNumber(min, max) {
    return Math.random() * (max - min) + min
  }

  class Blob {
    constructor(el) {
      this.el = el
      const boundingRect = this.el.getBoundingClientRect()
      this.size = boundingRect.width
      this.initialX = randomNumber(0, window.innerWidth - this.size)
      this.initialY = randomNumber(0, window.innerHeight - this.size)
      this.el.style.top = `${this.initialY}px`
      this.el.style.left = `${this.initialX}px`
      this.vx =
        randomNumber(MIN_SPEED, MAX_SPEED) * (Math.random() > 0.5 ? 1 : -1)
      this.vy =
        randomNumber(MIN_SPEED, MAX_SPEED) * (Math.random() > 0.5 ? 1 : -1)
      this.x = this.initialX
      this.y = this.initialY
    }

    update() {
      this.x += this.vx
      this.y += this.vy
      if (this.x >= window.innerWidth - this.size) {
        this.x = window.innerWidth - this.size
        this.vx *= -1
      }
      if (this.y >= window.innerHeight - this.size) {
        this.y = window.innerHeight - this.size
        this.vy *= -1
      }
      if (this.x <= 0) {
        this.x = 0
        this.vx *= -1
      }
      if (this.y <= 0) {
        this.y = 0
        this.vy *= -1
      }
    }

    move() {
      this.el.style.transform = `translate(${this.x - this.initialX}px, ${this.y - this.initialY
        }px)`
    }
  }

  function initBlobs() {
    const blobEls = document.querySelectorAll('.bouncing-blob')
    const blobs = Array.from(blobEls).map((blobEl) => new Blob(blobEl))

    function update() {
      requestAnimationFrame(update)
      blobs.forEach((blob) => {
        blob.update()
        blob.move()
      })
    }

    requestAnimationFrame(update)
  }

  initBlobs()


  /***************************
  **************************
  ***********************
  *************
  
  HERO BTN
  
  *************
  ***********************
  **************************
  **************************/

  $(document).on('mousemove', function (c) {

    $('.circle__btn').each(function () {
      var t = $(this).offset(), e = $(this).find('.circle__inner'), r = $(this).find('.circle__mask'), i = c.pageX,
        a = c.pageY, n = t.left, o = t.top, s = (i - n) / 5, h = (a - o) / 5;
      TweenMax.to(e, 1, {
        x: s,
        y: h
      }), TweenMax.to(r, 1, { webkitClipPath: 'circle(40px at ' + (s + 16) + 'px calc(50% + ' + h + 'px))' }), 300 < n - i && (TweenMax.to(e, 1.5, {
        x: 0,
        y: 0
      }), TweenMax.to(r, 1.5, { webkitClipPath: 'circle(40px at 16px calc(50% + 0px))' })), 450 < i - n && (TweenMax.to(e, 1.5, {
        x: 0,
        y: 0
      }), TweenMax.to(r, 1.5, { webkitClipPath: 'circle(40px at 16px calc(50% + 0px))' })), 280 < o - a && (TweenMax.to(e, 1.5, {
        x: 0,
        y: 0
      }), TweenMax.to(r, 1.5, { webkitClipPath: 'circle(40px at 16px calc(50% + 0px))' })), 300 < a - o && (TweenMax.to(e, 1.5, {
        x: 0,
        y: 0
      }), TweenMax.to(r, 1.5, { webkitClipPath: 'circle(40px at 16px calc(50% + 0px))' }))
    })

  })


}); /* End of jquery */


/***************************
**************************
***********************
*************

  ANIMATE BTN

*************
***********************
**************************
**************************/

let button = document.querySelectorAll(".primary-button");
let item = document.querySelectorAll(".primary-button .round");

button.forEach((btn, index) => {
  btn.addEventListener("mouseenter", function (event) {
    this.classList += " animate";

    let buttonX = event.offsetX;
    let buttonY = event.offsetY;

    if (buttonY < 24) {
      item[index].style.top = 0 + "px";
    } else if (buttonY > 30) {
      item[index].style.top = 48 + "px";
    }

    item[index].style.left = buttonX + "px";
    item[index].style.width = "1px";
    item[index].style.height = "1px";
  });

  btn.addEventListener("mouseleave", function () {
    this.classList.remove("animate");

    let buttonX = event.offsetX;
    let buttonY = event.offsetY;

    if (buttonY < 24) {
      item[index].style.top = 0 + "px";
    } else if (buttonY > 30) {
      item[index].style.top = 48 + "px";
    }
    item[index].style.left = buttonX + "px";
  });
})

const user = {}

user.name = 'John'
user.surname = 'Smith'
user.name = 'Pete'
delete user.name;

console.log(user);