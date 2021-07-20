const express = require('express')
require('dotenv').config({ path: `.env` })
const PORT = process.env.PORT
import express from 'express'

import twilio from 'twilio'
import ngrok from 'ngrok'
const AccessToken = twilio.jwt.AccessToken
const VideoGrant = AccessToken.VideoGrant

const app = express()

app.get('/getToken', (req, res) => {
  if (!req.query || !req.query.userName) {
    return res.status(400).send('Username parameter is required')
  }

  /**
   * Ceate account in https://www.twilio.com/
   * and get:
   * ACCOUNT_SID
   * API_KEY_SID
   * API_KEY_SECRET
   */

  const accessToken = new AccessToken(
    process.env.ACCOUNT_SID,
    process.env.API_KEY_SID,
    process.env.API_KEY_SECRET
  )

  // Set the Identity of this token
  accessToken.identity = req.query.userName

  // Grant access to Video
  var grant = new VideoGrant()
  accessToken.addGrant(grant)

  // Serialize the token as a JWT
  var jwt = accessToken.toJwt()
  return res.send(jwt)
})

app.listen(8086, () => console.log(`Server listening on port ${8086}!`))

ngrok.connect(8086).then((url) => {
  console.log(`Server forwarded to public url ${url}`)
})
