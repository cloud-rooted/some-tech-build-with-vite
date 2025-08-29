const { createClient } = require('@supabase/supabase-js')
const { HfInference } = require('@huggingface/inference')
const dotenv = require('dotenv')

// Load environment variables
dotenv.config()

// Initialize Supabase and HuggingFace clients
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)
const hf = new HfInference(process.env.HUGGINGFACE_API_KEY)

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' })
  }

  try {
    // Extract data from the request
    const { question } = req.body
    console.log('Question received:', question)

    // Logic to interact with Supabase and HuggingFace as per your code

    // Here you should include your logic to handle the question and interact with your database and HuggingFace API.
    // For now, returning a mock response
    res.json({
      answer: 'Mock Answer',
      sources: [{ text: 'Mock source text', similarity: 0.9 }]
    })
  } catch (error) {
    console.error('Error in /api/ask:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
