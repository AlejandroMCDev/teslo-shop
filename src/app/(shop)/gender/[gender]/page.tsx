export const revalidate = 60

import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { Gender } from "@prisma/client";
import { notFound } from "next/navigation";

interface Props {
  params: {
    gender: string,
  },
  searchParams: {
    page?: string
  }
}

const labels:Record<string,string> = {
  men:'hombres',
  women:'mujeres',
  kid: 'niños',
  unisex: 'unisex'
}

const genders = Object.keys(labels)

export default async function GenderByPage({ params,searchParams }: Props) {

  const { gender } = params
  const page = searchParams.page ? parseInt( searchParams.page ) : 1
  
  const { products,currentPage,totalPages } = await getPaginatedProductsWithImages( {gender: gender as Gender, page} )

  if ( !genders.includes(params.gender)) {
    notFound()
  }

  return (
    <>
      <Title
        title={`Articulos de ${ labels[params.gender] }`}
        subtitle={ `Todos los productos de ${ params.gender }` }
        className="mb-2"
      />

      <ProductGrid
        products={products}
      />

      <Pagination totalPages={totalPages}/>
    </>
  );
}