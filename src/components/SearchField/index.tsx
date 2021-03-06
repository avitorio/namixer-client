import { useState, InputHTMLAttributes } from 'react'
import { Search as SearchIcon } from '@styled-icons/material-outlined/Search'

import * as S from './styles'

export type SearchFieldProps = {
  onInput?: (value: string) => void
  label?: string
  initialValue?: string
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  disabled?: boolean
  error?: string
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'onInput'>

const SearchField = ({
  icon = <SearchIcon />,
  iconPosition = 'left',
  label,
  name,
  initialValue = '',
  error,
  disabled = false,
  onInput,
  ...props
}: SearchFieldProps) => {
  const [value, setValue] = useState(initialValue)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value
    setValue(newValue)

    !!onInput && onInput(newValue)
  }

  return (
    <S.Wrapper disabled={disabled} error={!!error}>
      {!!label && <S.Label htmlFor={name}>{label}</S.Label>}
      <S.InputWrapper>
        {!!icon && <S.Icon iconPosition={iconPosition}>{icon}</S.Icon>}
        <S.Input
          type="text"
          onChange={onChange}
          value={value}
          iconPosition={iconPosition}
          disabled={disabled}
          name={name}
          {...(label ? { id: name } : {})}
          {...props}
        />
      </S.InputWrapper>
    </S.Wrapper>
  )
}

export default SearchField
