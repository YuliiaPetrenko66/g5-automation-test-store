
export function proceedToCheckout(user, productName) {
    cy.get('.col-md-3.col-sm-6.col-xs-12')
        .each(($product) => {
            const title = $product.text();
            if (title.includes(productName)) {
                cy.wrap($product)
                    .find('.fa.fa-cart-plus.fa-fw')
                    .click({ multiply: true });
                return false;
            }
        });

    cy.log("**Title product verifying**");
    cy.get('.bgnone').should('contain', productName);
    cy.get('.fa.fa-cart-plus.fa-fw').click();
    cy.get('.container-fluid.cart-info.product-list').should('contain', productName);

    cy.log('**Checkout data verifying**');
    cy.get('.registerbox.form-horizontal')
        .should('contain', user.country)
        .and('contain', user.city);

    cy.log('**Order confirmation verifying**');
    cy.get('#cart_checkout1').click();

    cy.log('**Thank you page verifying**');
    cy.get('button#checkout_btn.btn.btn-orange.pull-right.lock-on-click').click();
    cy.get(".maintext").should('contain', 'Your Order Has Been Processed!');
    cy.get("a[title='Continue']").click();
    cy.get('input#filter_keyword').type('c{enter}');
}

export function findProductByName(productList, user) {
    let currentPageIndex = 0;
    let foundProducts = [];

    const searchProductOnPage = () => {
        cy.get('.thumbnails.grid.row.list-inline .prdocutname').each(($product) => {
            const title = $product.text();
            cy.log(title);
            const foundProduct = productList.find((product) => product.title === title);
            if (foundProduct && !foundProducts.some((p) => p.title === foundProduct.title)) {
                cy.log('**Product found:**', foundProduct.title);
                foundProducts.push(foundProduct);
                proceedToCheckout(user, foundProduct.title);
            }
        });
        cy.log(`**Found ${foundProducts.length} out of ${productList.length} products**`);
        if (foundProducts.length >= productList.length) {
            cy.log('**All products found**');
            cy.log('**Found products:**', foundProducts.map((product) => product.title).join(', '));
            return;
        }
        if (foundProducts.length < productList.length) {
            const nextPageLink = cy.get('.pagination a:not(.disabled)').eq(currentPageIndex);
            if (nextPageLink.length === 0 || currentPageIndex === 4) {
                cy.log('**The last page is reached or the next page link is not presented**');
                cy.log('**Found products:**', foundProducts.map((product) => product.title).join(', '));
                return;
            }
            currentPageIndex++;
            nextPageLink.click().then(() => {
                cy.log(`Navigated to the next page ${currentPageIndex + 2}`);
                searchProductOnPage();
            });
        } else {
            cy.log('**All products are found**');
        }
    };
    searchProductOnPage();
}


///Dmytro solution
export function findProductByName1(productName) {
    cy.get('.pagination a').then(pages => {
        return pages.length
    }).then(pageCount => {
        for (let i = 0; i < pageCount; i++) {
            cy.location().then(location => {
                if(!location.search.includes('product/product')){
                    cy.get('body').then(body => {
                        if (body.find(`.prdocutname[title="${productName}"]`).length > 0) {
                            cy.get(`.prdocutname[title="${productName}"]`).click();
                        } else {
                            cy.get('.sorting.well').last().then( bottomSortingPanel => {
                                let paginationArrow = bottomSortingPanel.find('.pagination a:contains(">")');
                                if(paginationArrow.length > 0){
                                    cy.wrap(paginationArrow).first().click();
                                }else{
                                    throw new Error("Product not found")
                                }
                            })
                        }
                    })
                }
            })
        }
    })
}

export function findProductByName2(productName) {
    cy.get('body').then(body => {
        if (body.find(`.prdocutname[title="${productName}"]`).length > 0) {
            cy.get(`.prdocutname[title="${productName}"]`).click();
        } else {
            cy.contains('.pagination a', '>').click();
            findProductByName(productName);
        }
})

}