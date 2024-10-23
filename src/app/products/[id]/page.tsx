export async function generateStaticParams() {
    // Fetch product IDs from the API route
    const res = await fetch(`${process.env.DOMAIN}api/products/ids`);
    const ids = await res.json();
  
    // Return the product IDs as static params
    return ids.map((id: string) => ({
      id,
    }));
  }
  
  export default async function ProductPage({ params }: { params: { id: string } }) {

    // Fetch product data from the API route using the product ID

    const res = await fetch(`${process.env.DOMAIN}api/products/${params.id}`);
    const product = await res.json();
  
    if (!product || product.error) {
      return <div>Product not found</div>;
    }
  
    return (
      <div>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p>Price: ${product.price}</p>
      </div>
    );
  }
  