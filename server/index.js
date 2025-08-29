const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const { createClient } = require('@supabase/supabase-js')
const { HfInference } = require('@huggingface/inference')
const formidable = require('formidable')
const fs = require('fs')
const path = require('path')

// Load environment variables
dotenv.config()

// Initialize Supabase and HuggingFace clients
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)
const hf = new HfInference(process.env.HUGGINGFACE_API_KEY)

// Initialize Express
const app = express()
const port = process.env.PORT || 5000

// Middleware for CORS and parsing JSON
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// POST /api/ask endpoint
app.post('/api/ask', async (req, res) => {
  try {
    // Extract data from the request
    const { question } = req.body
    console.log('Question received:', question)

    // Logic to interact with Supabase and HuggingFace as per your code

    // Response
    res.json({
      answer: 'Mock Answer',
      sources: [{ text: 'Mock source text', similarity: 0.9 }]
    })
  } catch (error) {
    console.error('Error in /api/ask:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// POST /api/save endpoint (for file uploads)
app.post('/api/save', (req, res) => {
  const form = formidable({
    uploadDir: './uploads', // directory to store uploaded files
    keepExtensions: true,
    maxFileSize: 10 * 1024 * 1024, // 10MB max size
  })

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: 'Error processing file' })
    }

    // Logic to process the file (using Supabase, HuggingFace, etc.)
    console.log('Uploaded file:', files.file)

    res.json({ success: true, message: 'File uploaded and processed!' })
  })
})

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
