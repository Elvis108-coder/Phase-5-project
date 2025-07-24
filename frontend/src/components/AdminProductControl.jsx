// AdminProductControl.jsx

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

const AdminProductControl = () => {
  const [products, setProducts] = useState([]) // All products from backend
  const [search, setSearch] = useState('')     // Search input state

  // Fetch products on component mount
  useEffect(() => {
    axios.get('/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err))
  }, [])

  // Handle delete request for a product
  const handleDelete = (id) => {
    axios.delete(`/api/products/${id}`)
      .then(() => {
        // Remove deleted product from state
        setProducts(products.filter(p => p.id !== id))
      })
      .catch(err => console.error(err))
  }

  // Filter products by search input
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Product Control</h2>

      {/* Search Input */}
      <Input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4"
      />

      {/* Display Product Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        {filteredProducts.map(product => (
          <Card key={product.id}>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-600">{product.description}</p>
              <p className="text-sm text-gray-800 mt-2 font-medium">Price: ${product.price}</p>
              
              {/* Delete Button */}
              <Button
                variant="destructive"
                className="mt-3"
                onClick={() => handleDelete(product.id)}
              >
                Delete Product
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default AdminProductControl
