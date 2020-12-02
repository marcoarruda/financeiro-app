import NumberFormat from 'react-number-format'

type NumberFormatCustomProps = {
  inputRef: (instance: NumberFormat | null) => void
  onChange: (event: { target: { name: string; value: string } }) => void
  name: string
}

const NumberFormatCustom = (props: NumberFormatCustomProps) => {
  const { inputRef, onChange, ...other } = props

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value
          }
        })
      }}
      thousandSeparator="."
      decimalSeparator=","
      decimalScale={2}
      fixedDecimalScale
    />
  )
}

export default NumberFormatCustom
