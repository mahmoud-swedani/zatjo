import data from '@/lib/data'
import { connectToDatabase } from '.'
import Product from './models/product.model'
import { cwd } from 'process'
import { loadEnvConfig } from '@next/env'

loadEnvConfig(cwd())

const main = async () => {
  try {
    const { products } = data
    await connectToDatabase(
      'mongodb+srv://zatjo:admin@cluster0.zrhyz16.mongodb.net/zatjo?retryWrites=true&w=majority&appName=Cluster0'
    )

    await Product.deleteMany()
    const createdProducts = await Product.insertMany(products)

    console.log({
      createdProducts,
      message: 'Seeded database successfully',
    })
    process.exit(0)
  } catch (error) {
    console.error(error)
    throw new Error('Failed to seed database')
  }
}

main()
