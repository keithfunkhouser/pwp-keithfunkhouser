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