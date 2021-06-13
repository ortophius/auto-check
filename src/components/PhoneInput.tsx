import { reverse } from "dns";
import React, { useState } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import TextInput, { TextInputProps } from "./TextInput";

interface PhoneInputProps {
  onChange?: (phone: string) => void,
}

const PhoneInput = function({ onChange, value = '' }: PhoneInputProps & Pick<TextInputProps, 'value'>) {
  const handlePhoneChange = useCallback((value: string) => {
    if (onChange) onChange(value);
  }, [onChange]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.currentTarget
    const { value, selectionEnd } = input;
    const selectionEndOffset = value.length - (selectionEnd || 0);

    const phoneLength = 10;

    const filteredValue = value
      .replace(/^7/, '')
      .replace(/\+\d/, '')
      .replace(/[^0-9]/g, '')

    const countryCode = '+7';
    const regex = /^(\d{3})(\d{0,3})?(\d{0,2})?(\d{0,2})?$/;
    const match = filteredValue.match(regex);

    if (!match) {
      const newValue = (filteredValue.length) ? `${countryCode} ${filteredValue}` : '';
      const selectionPosition = newValue.length - selectionEndOffset;

      handlePhoneChange(newValue);

      setTimeout(() => {
        input.setSelectionRange(selectionPosition, selectionPosition);
      }, 0);
      return;
    }

    const newFormattedPhone = countryCode + ' ' + match
      .slice(1)
      .filter((str) => (str)) // remove undefined values
      .reduce((str, substr) => {
      return (substr && str.length) ? `${str}-${substr}` : substr;
    }, '');

    const selectionPosition = newFormattedPhone.length - selectionEndOffset;

    handlePhoneChange(newFormattedPhone);

    setTimeout(() => {
      input.setSelectionRange(selectionPosition, selectionPosition);
    }, 0)
  }, []);

  return (
    <TextInput 
      icon="phone.svg"
      placeholder="Введите номер телефона"
      onChange={handleChange}
      maxLength={16}
      {...{value}} />
  )
}

export default PhoneInput;