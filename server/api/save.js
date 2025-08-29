const formidable = require('formidable')
const fs = require('fs')
const { createClient } = require('@supabase/supabase-js')
const path = require('path')
const dotenv = require('dotenv')

// Load environment variables
dotenv.config()

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' })
  }

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
    const uploadedFile = files.file[0]
    console.log('Uploaded file:', uploadedFile)

    // Handle your file processing (save, convert, etc.) and save details to Supabase
    // For now, mock the response
    res.json({ success: true, message: 'File uploaded and processed!' })
  })
}
