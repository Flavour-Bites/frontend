import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type Product = {
  id: string | number
  name: string
  description: string
  price: number
  image: string
}

type Props = {
  product: Product
}

export default function ProductCard({ product }: Props) {
  return (
    <Card className="group overflow-hidden transition-all hover:shadow-md hover:-translate-y-0.5">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full overflow-hidden bg-rose-50">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-6 transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
            priority={false}
          />
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <CardTitle className="text-base">{product.name}</CardTitle>
        <CardDescription className="mt-1 text-sm">
          {product.description}
        </CardDescription>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <span className="text-rose-700 font-semibold">KSh {product.price.toFixed(2)}</span>
        <Button asChild className="bg-rose-500 hover:bg-rose-600">
          <Link href="/order">Add to Order</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
