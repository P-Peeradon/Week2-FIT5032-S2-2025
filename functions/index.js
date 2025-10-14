/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require('firebase-functions/https')
const admin = require('firebase-admin')
const cors = require('cors')({ origin: true })

admin.initializeApp()

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

exports.countBook = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const booksCollection = admin.firestore().collection('books')
      const snapshot = await booksCollection.get()
      const count = snapshot.size

      res.status(200).send({ count })
    } catch (err) {
      console.error('Error counting books:', err.message)
      res.status(500).send('Error counting books')
    }
  })
})

exports.addBook = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const booksCollection = admin.firestore().collection('books')

      await booksCollection.add(req.body)

      res.status(201).send('Add book successful!')
    } catch (err) {
      console.error('Error adding book: ', err)
      res.status(500).send('Error adding book')
    }
  })
})

exports.getAllBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const booksCollection = admin.firestore().collection('books')
      const snapshot = await booksCollection.get()
      const books = []
      snapshot.forEach((doc) => {
        books.push({ id: doc.id, ...doc.data() })
      })

      res.status(200).send(books)
    } catch (err) {
      console.error('Error counting books:', err.message)
      res.status(500).send('Error counting books')
    }
  })
})
