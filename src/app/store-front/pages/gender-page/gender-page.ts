import { Component, computed, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductsService } from '@products/services/products.service';
import { ProductCard } from '@products/components/product-card/product-card';
import { PaginationService } from '@shared/components/pagination/pagination.service';
import { Pagination } from '@shared/components/pagination/pagination';

const genders: Record<string, string> = {
  men: 'Hombres',
  women: 'Mujeres',
  kid: 'Niños',
};

@Component({
  selector: 'app-gender-page',
  imports: [ProductCard, Pagination],
  templateUrl: './gender-page.html',
})
export class GenderPage {
  productService = inject(ProductsService);
  paginationService = inject(PaginationService);

  gender = input.required<string>();
  genderTitle = computed(() => {
    return genders[this.gender()] ?? 'Todos';
  });

  productsResource = rxResource({
    params: () => ({ gender: this.gender(), page: this.paginationService.currentPage() - 1 }),
    stream: ({ params }) => {
      return this.productService.getProducts({
        gender: params.gender,
        offset: params.page * 9,
      });
    },
  });
}
