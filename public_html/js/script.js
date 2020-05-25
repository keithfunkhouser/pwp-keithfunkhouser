// Switch Project Descriptions and Image on Project link click
function switchProject (project) {
  $('.project-link').css('border-bottom', '2px solid #3a3a3a')
  $(`#${project}`).css('border-bottom', '2px solid #e4d2a1')
  $('.projects p').hide()
  $('.project-image').hide()
  $(`.${project}`).show()
}

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
          if ($('.alert-success').length >= 1) {
            $('#contact-form')[0].reset()
          }
        }
      })
    }
  })
})
