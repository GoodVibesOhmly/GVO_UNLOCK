import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'

import {
  Input,
  Label,
  LoadingButton,
  NeutralButton,
  Button,
} from '../checkout/FormStyles'

interface SignupFormInterface {
  email: string
  password: string
}

interface SignUpProps {
  onCancel?: () => any
  createAccount: (email: string, password: string) => any
  showLogin: () => any
}

export const SignUp = ({ onCancel, createAccount, showLogin }: SignUpProps) => {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit } = useForm()

  const onSubmit = async ({ email, password }: SignupFormInterface) => {
    setLoading(true)
    try {
      await createAccount(email, password)
    } catch (error: any) {
      setError(error)
    }
    setLoading(false)
  }

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <Label>Email</Label>
      <Input
        autoComplete="username"
        {...register('email', { required: true })}
      />
      <Label>Set a password</Label>
      <Input
        autoComplete="new-password"
        type="password"
        {...register('password', { required: true })}
      />
      {loading && <LoadingButton>Saving</LoadingButton>}
      {!loading && <Button type="submit">Save</Button>}
      {onCancel && <NeutralButton onClick={onCancel}>Cancel</NeutralButton>}
      {error && (
        <>
          An account with this email already exists,{' '}
          <LinkButton onClick={() => showLogin()}>please login</LinkButton>.
        </>
      )}
    </StyledForm>
  )
}

SignUp.defaultProps = {
  onCancel: null,
}

const StyledForm = styled.form``

const LinkButton = styled.a`
  cursor: pointer;
`
