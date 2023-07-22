import BasePage from "./BasePage";

class ProductPage extends BasePage {
    
    visit(productId) {
        cy.visit(`/index.php?rt=product/product&product_id=${productId}`);
    }
    getAddToCartButton() {
        return cy.get('.fa.fa-cart-plus.fa-fw');
    }

}
export default new ProductPage();