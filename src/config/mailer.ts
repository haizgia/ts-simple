/**
 * Created by trungquandev.com's author on 05/16/2022
 * NodeJS send email by OAuth2 and Nodemailer
 * Tutorial here: https://trungquandev.com/nodejs-viet-api-gui-email-voi-oauth2-va-nodemailer
 */

// Import 3 thư viện cần thiết
import { Response } from 'express';
import nodemailer from 'nodemailer'
import { OAuth2Client } from 'google-auth-library'
import Mail = require('nodemailer/lib/mailer')
import SMTPTransport = require('nodemailer/lib/smtp-transport');
import { info } from 'console';
require('dotenv').config()

const clientId = process.env.GOOGLE_MAILER_CLIENT_ID
const clientSecret = process.env.GOOGLE_MAILER_CLIENT_SECRET
const refreshToken = process.env.GOOGLE_MAILER_REFRESH_TOKEN
const adminEmail = process.env.ADMIN_EMAIL_ADDRESS

interface MailtrapTransporter {
  service: string;
}
// Khởi tạo OAuth2Client với Client ID và Client Secret 
const myOAuth2Client = new OAuth2Client(
  clientId,
  clientSecret
)
// Set Refresh Token vào OAuth2Client Credentials
myOAuth2Client.setCredentials({
  refresh_token: refreshToken
})
// Tạo một biến Transport từ Nodemailer với đầy đủ cấu hình, dùng để gọi hành động gửi mail
export const transport = async (res: Response, mailOptions: Mail.Options) => {
    /**
     * Lấy AccessToken từ RefreshToken (bởi vì Access Token cứ một khoảng thời gian ngắn sẽ bị hết hạn)
     * Vì vậy mỗi lần sử dụng Access Token, chúng ta sẽ generate ra một thằng mới là chắc chắn nhất.
     */
    const myAccessTokenObject = await myOAuth2Client.getAccessToken()
    // Access Token sẽ nằm trong property 'token' trong Object mà chúng ta vừa get được ở trên
    const myAccessToken = myAccessTokenObject?.token
    
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          type: 'OAuth2',
          user: adminEmail,
          clientId: clientId,
          clientSecret: clientSecret,
          refresh_token: refreshToken,
          accessToken: myAccessToken
        }
    } as MailtrapTransporter)

    transporter.sendMail(mailOptions)
      .then(info => {
        return res.status(201).json({
          statusCode: 201,
          message: "Send email successfully",
          info
        })
      }) 
      .catch((err) => {
        return res.status(500).json(err)
      })
}