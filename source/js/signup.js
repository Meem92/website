(function() {

  // submits the signup form by doing a CORS request to the manager's signup API
  function submitSignupFormwithCORS(form) {
    removeAllErrorsFromForm(form);

    $.ajax({
      type: 'POST',
      url:  'http://manager.shortcutmedia.com/api/users',
      data: $(form).serializeArray(),
      success: function(data, textStatus, xhr) {
        signInUser(data);
      },
      error: function(xhr, textStatus, errorText) {
        if (xhr.status == 422) {
          var data = $.parseJSON(xhr.responseText);
          addErrorsToForm(form, data['errors']);
        } else {
          notifyUserAboutError(errorText);
        }
      }
    });
  }

  function signInUser(userData) {
    window.location.href = 'http://manager.shortcutmedia.com/?user_email='+userData['email']+'&user_token='+userData['authentication_token'];
  }

  function removeAllErrorsFromForm(form) {
    $(form).find('small.error').remove();
  }

  function addErrorsToForm(form, errors) {
    for(fieldWithError in errors) {
      var errorEl = $('<small class="error">'+errors[fieldWithError]+'</small>');
      form.find('input[name="user['+fieldWithError+']"]').after(errorEl);
    }
  }

  function notifyUserAboutError(errorText) {
    alert('An error occured. Please try again or contact support@shortcutmedia.com if the problem persists.');
    console.log(errorText);
  }


  // Installs a submit handler that connects the signup form to the manager signup API via CORS if CORS is available.
  //
  // If CORS is not available, the signup form is submitted to the normal manager signup action which takes over the
  // rest of the setup process (handling validation errors etc.).
  function initCORSSignupFormHandler() {
    if ($.support.cors) {
      $('form.signup').not('.signup-handler-registered').addClass('signup-handler-registered').submit(function(e) {
        e.preventDefault();
        submitSignupFormwithCORS($(this));
      });
    }
  }

  $(document).ready(initCORSSignupFormHandler);

})();
