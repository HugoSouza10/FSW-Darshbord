interface params {
    id: string
}

const ProductDetailsPage = ({params: {id}}: {params: params}) => {
    return (
        <div>Product ID: {id}</div>
    )
}

export default ProductDetailsPage;