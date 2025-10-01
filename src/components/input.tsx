import React, { useState } from 'react'
import './input.scss'

interface InputProps {
  bootstrap?: string
  label?: string
  type?: string
  title?: string
  name?: string
  register: any // Replace 'any' with the correct type for your register function
  placeholder?: string
  options?: any[] // Replace 'any' with the correct type for your options
  errors?: string
  data?: any // Replace 'any' with the correct type for your data
  subLabel?: string
  control?: any // Replace 'any' with the correct type for your control
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
  min?: number
  max?: number
  minDate?: Date
  maxDate?: Date
  capitalizeOff?: boolean
  width?: string
  hidden?: boolean
  noBlankOption?: boolean
  style?: React.CSSProperties
  centeredLabel?: boolean
}

export const Input: React.FC<InputProps> = (props) => {
  const {
    bootstrap,
    label,
    type,
    title,
    name,
    register,
    placeholder,
    options,
    errors,
    data,
    subLabel,
    control,
    onChange,
    disabled,
    min,
    max,
    minDate,
    maxDate,
    capitalizeOff,
    width,
    hidden,
    noBlankOption,
    style,
    centeredLabel,
  } = props

  const [inputType, setInputType] = useState<string | undefined>(type)

  let errorInput = 'i'
  if (errors) {
    errorInput = 'error-input'
  }

  if (title) {
    return (
      <>
        <div
          style={{ marginTop: '30px' }}
          className="filter-button-container"
        ></div>
        <h5 className="form-input-title">{title}</h5>
      </>
    )
  }

  if (type === 'select') {
    return (
      <SelectInput
        noBlankOption={noBlankOption}
        width={width}
        options={data?.options || options}
        bootstrap={bootstrap}
        label={label}
        type={type}
        name={name}
        register={register}
        placeholder={placeholder}
        errors={errors}
        disabled={disabled || data?.disabled}
        onChange={onChange || data?.onChange}
        capitalizeOff={capitalizeOff}
        errorInput={errorInput}
        centeredLabel={centeredLabel}
      />
    )
  }

  if (name) {
    return (
      <div
        className={`input-component-container ${bootstrap}`}
        style={{ visibility: hidden ? 'hidden' : 'visible' }}
      >
        {data?.subLabel && !label ? (
          ''
        ) : (
          <label
            style={{ textAlign: centeredLabel ? 'center' : 'left' }}
            htmlFor={name}
          >
            {label}
          </label>
        )}

        <div
          style={{ width: width, visibility: hidden ? 'hidden' : 'visible' }}
        >
          <div className="input-sublabel-container">
            {subLabel && <h6 style={{ marginRight: '1rem' }}>{subLabel}</h6>}
            <input
              id={name}
              style={style}
              className={`${errorInput}`}
              type={inputType}
              name={name}
              onChange={onChange}
              {...register(name, {
                onChange: onChange,
              })}
              placeholder={placeholder}
              autoComplete="off"
              disabled={disabled || data?.disabled}
              min={min || data?.min}
              max={max || data?.max}
              onWheel={
                inputType === 'number' ? (e) => e.target.blur() : undefined
              }
              onKeyDown={
                inputType === 'number'
                  ? (e) => {
                      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                        e.preventDefault()
                      }
                    }
                  : undefined
              }
            />
          </div>
        </div>

        <p>{errors}</p>
      </div>
    )
  } else {
    return <div className={`input-component-container ${bootstrap}`}></div>
  }
}

interface SelectInputProps {
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
  bootstrap?: string
  label?: string
  name?: string
  register: any // Replace 'any' with the correct type for your register function
  options?: any[] // Replace 'any' with the correct type for your options
  errors?: string
  disabled?: boolean
  capitalizeOff?: boolean
  errorInput?: string
  width?: string
  noBlankOption?: boolean
  centeredLabel?: boolean
}

const SelectInput: React.FC<SelectInputProps> = (props) => {
  const {
    onChange,
    bootstrap,
    label,
    name,
    register,
    options,
    errors,
    disabled,
    capitalizeOff,
    errorInput,
    width,
    noBlankOption,
    centeredLabel,
  } = props

  const { ref } = register(name)

  return (
    <div className={`input-component-container ${bootstrap}`}>
      <label
        htmlFor={name}
        style={{ textAlign: centeredLabel ? 'center' : 'left' }}
      >
        {label}
      </label>
      <div>
        <select
          style={{ width: width }}
          className={`input-select ${errorInput}`}
          onChange={onChange}
          {...register(name, {
            onChange: onChange,
          })}
          name={name}
          disabled={disabled}
        >
          {!noBlankOption && <option value=""></option>}
          {options?.map((o, i) => (
            <option key={o?._id} value={o?._id}>
              {capitalizeOff ? o?.name : capitalize(o?.name?.toLowerCase())}
            </option>
          ))}
        </select>
      </div>

      <p>{errors}</p>
    </div>
  )
}

// You might need to define these components or functions

const capitalize = (str: string | undefined) => {
  if (!str) {
    return ''
  }
  return str.charAt(0).toUpperCase() + str.slice(1)
}
