"use client"
import React from 'react'
import { FormProvider } from './form-provider'

type Props = {
    children: React.ReactNode
}

const ClientLayout = (props: Props) => {
  return (
    <FormProvider>
        <div>{props.children}</div>
    </FormProvider>
  )
}

export default ClientLayout