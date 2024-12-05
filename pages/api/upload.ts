import fs from 'fs'

import { NextApiRequest, NextApiResponse } from 'next'
import * as formidable from 'formidable'
import FormData from 'form-data'
import axios from 'axios'

export const config = {
  api: {
    bodyParser: false,
  },
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  try {
    if (req.method === 'POST') {
      const data = await new Promise((resolve, reject) => {
        const form = new (formidable as any).IncomingForm({
          maxFiles: 5 * 1024 * 1024,
          keepExtension: true,
        })

        form.parse(req, (error: any, fields: any, files: any) => {
          if (error) {
            return reject(error)
          }
          return resolve({
            fileData: files,
            fields: fields,
          })
        })
      })

      const formData = new FormData()
      const file = (data as any).fileData?.file?.[0] as formidable.File
      const readStream = fs.createReadStream(file.filepath)
      formData.append('file', readStream)
      for (const key in (data as any).fields) {
        formData.append(key, (data as any).fields[key][0])
      }

      const request = await axios('https://pump.fun/api/ipfs', {
        headers: formData.getHeaders(),
        data: formData,
        method: 'POST',
      })

      res.json({
        success: true,
        data: request.data,
      })
    } else {
      res.json({
        success: false,
        error: 'Method not allowed',
      })
    }
  } catch (e) {
    res.json({
      success: false,
      error: (e as any).message,
    })
  }
}
