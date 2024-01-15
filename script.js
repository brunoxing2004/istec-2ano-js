function attachBuyEvents() {
  const buttons = document.querySelectorAll('#products button');

  for (const button of buttons) {
    button.addEventListener('click', function (e) {
      const parentArticle = e.currentTarget.parentElement;
      parentArticle.classList.toggle('sale');

      const productId = parentArticle.getAttribute('data-id');
      const productName = parentArticle.querySelector('.product-name').textContent;
      const productPrice = parentArticle.querySelector('.product-price').textContent;
      const quantity = parentArticle.querySelector('.quantity').value;

      console.log('ID:', productId);
      console.log('Name:', productName);
      console.log('Price:', productPrice);
      console.log('Quantity:', quantity);
    });
  }
}

attachBuyEvents();