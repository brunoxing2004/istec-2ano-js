function attachBuyEvents() {
  const buttons = document.querySelectorAll('#products button');

  for (const button of buttons) {
    button.addEventListener('click', function (e) {
      const parentArticle = e.currentTarget.parentElement;
      parentArticle.classList.toggle('sale');

      const productId = parentArticle.getAttribute('data-id');
      const productName = parentArticle.querySelector('.product-name').textContent;
      const productPrice = parseFloat(parentArticle.querySelector('.product-price').textContent.replace('€', ''));
      const quantity = parseInt(parentArticle.querySelector('.quantity').value);

      const cartTable = document.getElementById('cart-table');
      let existingRow = cartTable.querySelector(`tr[data-id="${productId}"]`);

      if (!existingRow) {
        const newRow = cartTable.insertRow();
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
        existingRow.cells[4].textContent = (productPrice * quantity).toFixed(2) + '€';
      }

      updateCartTotal();
    });
  }
}

function updateCartTotal() {
  const cartTable = document.getElementById('cart-table');
  const totalCells = cartTable.querySelectorAll('.total');
  let cartTotal = 0;

  totalCells.forEach(cell => {
    cartTotal += parseFloat(cell.textContent.replace('€', ''));
  });

  document.getElementById('cart-total').textContent = 'Total: ' + cartTotal.toFixed(2) + '€';
}

attachBuyEvents();
