//Add dark gradient to navbar on smaller screens when scrolled
if ($(window).width() < 1600) {
  $(window).on('scroll', function() {
    if ($(window).scrollTop() > 150) {
      $('.nav').css('background', 'linear-gradient(0deg, rgba(51,51,51,0) 0%, rgba(51,51,51,0.75) 50%)')
    } else {
      $('.nav').css('background', 'transparent')
    }
  })
}

// Switch project descriptions, image and link on project name click
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
    $('#project-link').attr('href', '#')
  } else if (project === 'liquid-barn') {
    $('#project-link').attr('href', 'https://www.liquidbarn.com/')
  } else if (project === 'diy-calculator') {
    $('#project-link').attr('href', 'https://www.liquidbarn.com/pages/eliquid-calculator')
  } else if (project === 'simon-game') {
    $('#project-link').attr('href', '#')
  }
}

//Skills Animation
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
  //.addIndicators()
  .addTo(controller)


//Form Validation
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
