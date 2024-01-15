function attachBuyEvents() {
  const buttons = document.querySelectorAll('#products button');

  for (const button of buttons) {
    button.addEventListener('click', function (e) {
      const parentArticle = e.currentTarget.parentElement;
      parentArticle.classList.toggle('sale');

      const productId = parentArticle.getAttribute('data-id');
      const productNameElement = parentArticle.querySelector('h2');
      const productPriceElement = parentArticle.querySelector('.price');
      const quantityElement = parentArticle.querySelector('.quantity');

      if (productId && productNameElement && productPriceElement && quantityElement) {
        const productName = productNameElement.textContent;
        const productPrice = parseFloat(productPriceElement.textContent);
        const quantity = parseInt(quantityElement.value);

        const cartTable = document.querySelector('#cart table');
        const cartTotalCell = document.querySelector('#cart table tfoot th:last-child');

        let existingRow = cartTable.querySelector(`tr[data-id="${productId}"]`);

        if (!existingRow) {
          const newRow = cartTable.insertRow(-1);
          newRow.setAttribute('data-id', productId);

          const cells = ['id', 'name', 'quantity', 'price', 'total'].map((className, index) => {
            const cell = newRow.insertCell(index);
            cell.textContent = (className === 'name') ? productName : parentArticle.querySelector(`.${className}`).textContent;
            return cell;
          });

          const deleteCell = newRow.insertCell(cells.length);
          const deleteLink = document.createElement('a');
          deleteLink.href = '#';
          deleteLink.textContent = 'Delete';
          deleteLink.addEventListener('click', function (event) {
            event.preventDefault();
            newRow.remove();
            updateCartTotal();
          });

          deleteCell.appendChild(deleteLink);
        } else {
          existingRow.cells[2].textContent = quantity;
          existingRow.cells[4].textContent = (productPrice * quantity).toFixed(2);
        }

        updateCartTotal();
      }
    });
  }
}


function updateCartTotal() {
  const cartTable = document.querySelector('#cart table');
  const totalCells = cartTable.querySelectorAll('.total');
  let cartTotal = 0;

  totalCells.forEach(cell => {
    cartTotal += parseFloat(cell.textContent);
  });

  document.querySelector('#cart table tfoot th:last-child').textContent = cartTotal.toFixed(2);
}

attachBuyEvents();