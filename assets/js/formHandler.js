(($) => {
  const form = document.querySelector('#contact-form');
  const formResponse = document.querySelector('#js-form-response');
  const loadingIndicator = document.querySelector('.loading');

  form.onsubmit = e => {
    e.preventDefault();

    // Prepare data to send
    const data = {};
    const formElements = Array.from(form);
    formElements.map(input => (data[input.name] = input.value));

    // Log what our lambda function will receive
    // console.log(JSON.stringify(data));

    // Construct an HTTP request
    let xhr = new XMLHttpRequest();
    xhr.open(form.method, form.action, true);
    xhr.setRequestHeader('Accept', 'application/json; charset=utf-8');
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF=8');

    // Send the collected data as JSON
    xhr.send(JSON.stringify(data));

    // Callback function
    xhr.onloadend = response => {
      if (response.target.status === 200) {
        // The form submission was successful
        form.reset();
        formResponse.innerHTML = 'Thanks for the message. We will be in touch shortly.';
        loadingIndicator.style.transition = "all 0.5s ease-in-out";
        formResponse.className = "sent-message";
        formResponse.style.transition = "all 0.5s ease-in-out";
      } else {
        // The form submission failed
        formResponse.innerHTML = 'Failed to send a message.';
        loadingIndicator.style.transition = "all 0.5s ease-in-out";
        formResponse.className = "error-message";
        formResponse.style.transition = "all 0.5s ease-in-out";
        console.error(JSON.parse(response.target.response).message);
      }
    };
  };
})(jQuery);
