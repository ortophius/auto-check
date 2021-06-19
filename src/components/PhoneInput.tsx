import { reverse } from "dns";
import React, { ChangeEvent, createRef, RefObject, useState } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import TextInput, { TextInputProps } from "./TextInput";

type PhoneInputProps = {
  onChange?: (phone: string) => void,
  value: string,
}

// interface PhoneInputProps extends Exclude<TextInputProps, 'onChange'> {
//   onChange?: (phone: string) => void,
//   value: string,
// }

interface PhoneInputState {
  maxLength: number,
  placeholder: string,
  icon: string,
  caretPosition: number,
}

// const PhoneInput = function({ onChange, value = '' }: PhoneInputProps & Pick<TextInputProps, 'value'>) {
//   const handlePhoneChange = useCallback((value: string) => {
//     if (onChange) onChange(value);
//   }, [onChange]);

//   const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
//     const input = e.currentTarget
//     const { value, selectionEnd } = input;
//     const selectionEndOffset = value.length - (selectionEnd || 0);

//     const phoneLength = 10;

//     const filteredValue = value
//       .replace(/^7/, '')
//       .replace(/\+\d/, '')
//       .replace(/[^0-9]/g, '')

//     const countryCode = '+7';
//     const regex = /^(\d{3})(\d{0,3})?(\d{0,2})?(\d{0,2})?$/;
//     const match = filteredValue.match(regex);

//     if (!match) {
//       const newValue = (filteredValue.length) ? `${countryCode} ${filteredValue}` : '';
//       const selectionPosition = newValue.length - selectionEndOffset;

//       handlePhoneChange(newValue);

//       setTimeout(() => {
//         input.setSelectionRange(selectionPosition, selectionPosition);
//       }, 0);
//       return;
//     }

//     const newFormattedPhone = countryCode + ' ' + match
//       .slice(1)
//       .filter((str) => (str)) // remove undefined values
//       .reduce((str, substr) => {
//       return (substr && str.length) ? `${str}-${substr}` : substr;
//     }, '');

//     const selectionPosition = newFormattedPhone.length - selectionEndOffset;

//     handlePhoneChange(newFormattedPhone);

//     setTimeout(() => {
//       input.setSelectionRange(selectionPosition, selectionPosition);
//     }, 0)
//   }, []);

//   return (
//     <TextInput 
//       icon="phone.svg"
//       placeholder="Введите номер телефона"
//       onChange={handleChange}
//       maxLength={16}
//       {...{value}} />
//   )
// }

class PhoneInput extends React.Component<PhoneInputProps, PhoneInputState> {

  protected textInput: RefObject<HTMLInputElement>;

  constructor(props: PhoneInputProps) {
    super(props);
    this.textInput = createRef<HTMLInputElement>();
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      maxLength: 16,
      placeholder: 'Введите номер телефона',
      icon: 'phone.svg',
      caretPosition: 0,
    };
  }

  handleChange() {
    if (!this.textInput.current) return;
    const delimeter = '-';
    const textInput = this.textInput.current;
    const oldValue = this.props.value;
    const currentValue = textInput.value;
    
    const countryCode = '7';
    const regex = /^(\d{0,3})?(\d{0,3})?(\d{0,2})?(\d{0,2})?$/;

    const filteredValue = currentValue
      .replace(new RegExp(`^\\+?${countryCode}`), '')
      .replace(/[^\d]/g, '')

    if (!filteredValue.length) {
      this.props.onChange?.('');
      return;
    }

    const match = filteredValue.match(regex);

    if (!match) return;

    const newValue = '+7 ' + match
      .slice(1)
      .filter(Boolean)
      .reduce((str, substr) => {
        return `${str}${(str.length) ? delimeter : ''}${substr}`;
      }, '')

    const { selectionStart, selectionEnd } = textInput;
    let caretPosition = (selectionStart) ? selectionStart : 0;
    const lastDelimsCount = this.getDelimsCount(oldValue.slice(0, Number(selectionStart)), delimeter);
    const newDelimsCount = this.getDelimsCount(newValue.slice(0, Number(selectionStart)), delimeter);

    if (!oldValue.length) caretPosition += 3;

    caretPosition += newDelimsCount - lastDelimsCount;

    this.setState({ caretPosition });

    this.props.onChange?.(newValue);
  }

  private getDelimsCount(str: string, delimeter: string): number {
    const match = str.match(new RegExp(`\\${delimeter}`, 'g'));
    return (match) ? match.length : 0;
  }

  componentDidUpdate() {
    if (!window || !this.textInput.current) return;

    const textInput = this.textInput.current;

    window.requestAnimationFrame(() => {
      textInput.selectionStart = this.state.caretPosition;
      textInput.selectionEnd = this.state.caretPosition;
    })
  }

  shouldComponentUpdate() {
    if (this.props.value !== this.textInput.current?.value) return true;
    else return false;
  }

  render() {
    return <TextInput 
    icon={this.state.icon}
    placeholder={this.state.placeholder}
    onChange={this.handleChange}
    value={this.props.value}
    ref={this.textInput}
    maxLength={this.state.maxLength} />
  }
}

export default PhoneInput;