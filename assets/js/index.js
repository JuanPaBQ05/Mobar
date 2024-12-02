window.onload = loadPagina;

document.getElementById("catalog-container-index").addEventListener("click", function (event) {
  const target = event.target;

  function getProductNameFromCard(element) {
    const card = element.closest(".card"); 
    if (card) {
      const descriptionElement = card.querySelector(".card-description");
      return descriptionElement ? descriptionElement.textContent.trim() : null;
    }
    return null;
  }

  if (target.classList.contains("card-description")) {
    const productName = getProductNameFromCard(target);
    if (productName) {
      console.log(`Redirigiendo al producto: ${productName}`);
      window.location.href = `shop-single.html?product=${encodeURIComponent(productName)}`;
    } else {
      console.error("No se pudo obtener el nombre");
    }
  }

  if (target.classList.contains("bi-eye")) {
    const productName = getProductNameFromCard(target);
    if (productName) {
      console.log(`Redirigiendo desde el ícono del ojo: ${productName}`);
      window.location.href = `shop-single.html?product=${encodeURIComponent(productName)}`;
    } else {
      console.error("No se pudo obtener el nombre del producto desde el ícono del ojo.");
    }
  }
});




function loadPagina() {
  CallServiceMenuInicio();
}

