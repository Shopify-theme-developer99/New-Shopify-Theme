window.addEventListener("DOMContentLoaded", function(){

    let card_product = document.querySelectorAll(".card-product-wrapper");

card_product.forEach((main_product) => {
    
    let product_variant_option = main_product.querySelector("#variant_select");
  if(product_variant_option) {
    product_variant_option.addEventListener("change", function(){

        let selectedOption = this.options[this.selectedIndex]
        let optionid = selectedOption.getAttribute("data-variant-id");
        let option_original_price = selectedOption.getAttribute("data-price");
        let option_compared_price = parseInt(selectedOption.getAttribute("data-compared-price"));
       
        let top_parent = main_product.id;

        let product_form = main_product.querySelector(".product_form");
        let changed_variant_form_id = product_form.querySelector("#variant_form_id");

        changed_variant_form_id.value = `${optionid}`

        let product_price = main_product.querySelector(".product_price_wrapper > span:not(.card_compared_price)");
        let compared_price = main_product.querySelector(".product_price_wrapper > span.card_compared_price");

            
        product_price.innerHTML = option_original_price; //change product price

        if(option_compared_price != 0) {
            compared_price.innerHTML = option_compared_price;
            compared_price.classList.add("present_rupee");
        }else {
            compared_price.classList.remove("present_rupee");
            compared_price.innerHTML = ""
        }


    })
  }
    
    
})

})

