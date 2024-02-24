import { ProductGrid, Title } from "@/components";
import { Category, Product } from "@/interfaces";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

interface Props {
  params: {
    id: Category
  }
}

const labels:Record<Category,string> = {
  men:'hombres',
  women:'mujeres',
  kid: 'niños',
  unisex: 'unisex'
}

const products = initialData.products

export default function CategoryIdPage({ params }: Props) {

  /* if ( params.id === 'kids') {
    notFound()
  }   */

  const productsByGender = products.filter((product) => product.gender === params.id)

  return (
    <>
      <Title
        title={`Articulos de ${ labels[params.id] }`}
        subtitle={ `Todos los productos de ${ params.id }` }
        className="mb-2"
      />

      <ProductGrid
        products={productsByGender as Product[]}
      />
    </>
  );
}