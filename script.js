function attachBuyEvents() {
    const buttons = document.querySelectorAll('#products button');
  
    for (const button of buttons) {
      button.addEventListener('click', function () {
        console.log('BUY!');
        console.log(currentTarget);
      });
    }
    }
  
attachBuyEvents();  