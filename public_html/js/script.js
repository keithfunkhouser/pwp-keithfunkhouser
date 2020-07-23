/**
 * If screen size is smaller than 1600px, this function adds a dark gradient background to the navbar if the page is
 * scrolled 100px from the top, otherwise it sets the navbar background to transparent.
 **/
if ($(window).width() < 1600) {
  $(window).on('scroll', function() {
    if ($(window).scrollTop() > 100) {
      $('.nav').css('background', 'linear-gradient(0deg, rgba(51,51,51,0) 0%, rgba(51,51,51,0.75) 50%)')
    } else {
      $('.nav').css('background', 'transparent')
    }
  })
}

/**
 * On page load, The following Lottie library methods load and play the background svg animations on the intro section
 **/
lottie.loadAnimation({
  container: document.getElementById('animation'),
  renderer: 'svg',
  loop: false,
  autoplay: true,
  path: 'animation/intro-design.json'
})

lottie.loadAnimation({
  container: document.getElementById('mobile-animation'),
  renderer: 'svg',
  loop: false,
  autoplay: true,
  path: 'animation/intro-mobile-design.json'
})

/**
 * This function switches which project is displayed on the DOM
 *
 * On click for a specific project name, this function animates the selector divs associated with the previously selected
 * project and newly selected project, sets selectedProject to newly selected project, hides all project descriptions,
 * shows the description of the selected project, sets opacity to 0 for all project images, sets opacity to 1 for the
 * selected project, and sets the project link href attribute to the url of the selected project.
 *
 * @param string $project is the project name matching the id and class names within the DOM
 **/
let selectedProject = 'historic-sites'

function switchProject (project) {
  gsap.to(`#${selectedProject} .selector`, {duration: 0.1 , width: 0})
  gsap.to(`#${project} .selector`, {duration: 0.25, width: '100%'})
  selectedProject = project

  $('.projects p').hide()
  $(`.${project}`).show()

  $('.project-image').css('opacity', 0)
  $(`.${project}.project-image`).css('opacity', 1)

  if (project === 'historic-sites') {
    $('#project-link').attr('href', 'http://historicsites.us/')
  } else if (project === 'liquid-barn') {
    $('#project-link').attr('href', 'https://www.liquidbarn.com/')
  } else if (project === 'diy-calculator') {
    $('#project-link').attr('href', 'https://www.liquidbarn.com/pages/eliquid-calculator')
  } else if (project === 'simon-game') {
    $('#project-link').attr('href', 'https://keithfunkhouser.github.io/simon-game/')
  }
}

/**
 * The following animates my skills to appear when scroll position reaches the skills section.
 **/
let controller = new ScrollMagic.Controller()

let skills = gsap.from('.skill', {
  duration: 0.8,
  opacity: 0,
  ease: 'back.out(1)',
  scale: 0.9,
  stagger: 0.2
})

new ScrollMagic.Scene ({
  triggerElement: '.skills',
  triggerHook: 0.75,
  reverse: false
})
  .setTween(skills)
  .addTo(controller)


/**
 * This function provides front-end validation for the contact form.
 * If all tests set up here pass, the form data is AJAX submitted to the apis/ backend
 **/
$(document).ready(function () {

  $('#contact-form').validate({
    debug: true,
    errorClass: 'error',
    errorElement: 'div',
    rules: {
      name: {
        required: true
      },
      email: {
        email: true,
        required: true
      },
      message: {
        required: true,
        maxlength: 2000
      }
    },
    messages: {
      name: {
        required: 'Please enter your name'
      },
      email: {
        email: 'Please enter a valid email address',
        required: 'Please enter your email address'
      },
      message: {
        required: 'Please include a message',
        maxlength: 'Message must be under 2000 characters'
      }
    },
    submitHandler: function (form) {
      $('#contact-form').ajaxSubmit({
        type: 'POST',
        url: $('#contact-form').attr('action'),
        success: function (ajaxOutput) {
          $('#output-area').css('display', '')
          $('#output-area').html(ajaxOutput)
          if ($('.success').length >= 1) {
            $('#contact-form')[0].reset()
          }
        }
      })
    }
  })
})
