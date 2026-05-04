import { Component, computed, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductsService } from '@products/services/products.service';
import { ProductCard } from '@products/components/product-card/product-card';

const genders: Record<string, string> = {
  men: 'Hombres',
  women: 'Mujeres',
  kid: 'Niños',
};

@Component({
  selector: 'app-gender-page',
  imports: [ProductCard],
  templateUrl: './gender-page.html',
})
export class GenderPage {
  gender = input.required<string>();
  genderTitle = computed(() => {
    return genders[this.gender()] ?? 'Todos';
  });
  productService = inject(ProductsService);

  productsResource = rxResource({
    params: () => ({ gender: this.gender() }),
    stream: ({ params }) => {
      return this.productService.getProducts({
        gender: params.gender,
      });
    },
  });
}
