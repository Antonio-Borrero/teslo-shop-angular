import { Component, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductsService } from '@products/services/products.service';
import { ProductCarousel } from '@products/components/product-carousel/product-carousel';

@Component({
  selector: 'app-product-page',
  imports: [ProductCarousel],
  templateUrl: './product-page.html',
})
export class ProductPage {
  idSlug = input.required<string>();
  productService = inject(ProductsService);

  productResource = rxResource({
    params: () => ({ idSlug: this.idSlug() }),
    stream: ({ params }) => {
      return this.productService.getProductByIdSlug(params.idSlug);
    },
  });
}
