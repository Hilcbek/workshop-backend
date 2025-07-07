import { ApiError } from "../error/apierror";
import {render} from '@react-email/components'
import React from 'react'
import { emailTemplate } from "./constant";
import { transporter } from "../config/email";
import httpStatus from 'http-status'
const sendEmail = async function ({
    from,
    to,
    subject,
    text,
    html,
    componentProps,
  }) {
    try {
      const Component = emailTemplate[html]
  
      if (!Component) {
        throw new ApiError('Template not found', httpStatus.NOT_FOUND, false)
      }
      const Template = await render(
        React.createElement(Component, componentProps),
      )
      const options = {
        from,
        to,
        subject,
        text,
        html: Template,
      }
      const response = await transporter.sendMail(options)
      return response
    } catch (error) {
      throw new ApiError(error.message, httpStatus.INTERNAL_SERVER_ERROR)
    }
  }
  export {sendEmail}