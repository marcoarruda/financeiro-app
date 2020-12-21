import { DialogActions, DialogContent, TextField } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import React, { ReactNode, useContext, useEffect, useState } from 'react'
import { useForm, Controller, ControllerRenderProps } from 'react-hook-form'
import { AppContext } from '../contexts/AppContext'
import AutoComplete from '@material-ui/lab/Autocomplete'
import CircularProgress from '@material-ui/core/CircularProgress'
import IntlCurrencyInput from 'react-intl-currency-input'

type SimpleDialogProps = {
  open: boolean
  onClose: () => void
  tipoRegistro: 'entrada' | 'saida'
}

type FormData = {
  descricao: string
  valor: string
}

function RegistrarDialog(props: SimpleDialogProps) {
  const { onClose, open, tipoRegistro } = props

  const [labels, setLabels] = useState<string[]>([])
  const [defaultLabels, setDefaultLabels] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [valor, setValor] = useState(0)
  const { addRegistro, registros, setNotification } = useContext(AppContext)
  const { handleSubmit, control } = useForm({
    defaultValues: {
      descricao: ''
    }
  })

  useEffect(() => {
    const newLabels: string[] = []

    for (const registro of registros) {
      if (registro.tipo === tipoRegistro) {
        if (!newLabels.find((label) => label === registro.descricao)) {
          newLabels.push(registro.descricao)
        }
      }
    }

    setLabels(newLabels)
    setDefaultLabels(newLabels)
  }, [registros, tipoRegistro])

  const currencyConfig = {
    locale: 'pt-BR',
    formats: {
      number: {
        BRL: {
          style: 'currency',
          currency: 'BRL',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }
      }
    }
  }

  const handleChangeValor = (
    event: any,
    value: number,
    maskedValue: string
  ) => {
    setValor(value)
  }

  const onSubmit = async ({ descricao }: FormData) => {
    if (descricao.trim().length === 0) {
      setNotification('Descrição não pode ser vazia')
      return
    }

    if (valor <= 0) {
      setNotification('Valor deve ser maior que 0')
      return
    }

    const registro = {
      tipo: tipoRegistro,
      descricao: descricao.trim(),
      valor
    }

    console.log({ valor, descricao })

    try {
      setLoading(true)
      await addRegistro(registro)
      onClose()
    } finally {
      setLoading(false)
      setValor(0)
    }
  }

  const changeFunction = (props: ControllerRenderProps) => (
    _: any,
    data: string
  ) => {
    if (!data || data === '') {
      setLabels(defaultLabels)
    } else {
      const newLabels = defaultLabels.filter((label) =>
        label.toLowerCase().includes(data?.toLowerCase())
      )

      setLabels(newLabels)
    }

    props.onChange(data)
  }

  return (
    <Dialog open={open} aria-labelledby="form-dialog-title">
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle id="form-dialog-title">
          Registrar {tipoRegistro === 'entrada' ? 'Entrada' : 'Saida'}
        </DialogTitle>
        <DialogContent>
          <Controller
            render={(props) => (
              <AutoComplete
                {...props}
                options={labels.sort((a, b) => (a < b ? -1 : 1))}
                getOptionLabel={(option) => option}
                freeSolo
                renderInput={(params) => (
                  <TextField autoFocus {...params} label="Descrição" />
                )}
                onInputChange={changeFunction(props)}
                onChange={changeFunction(props)}
              />
            )}
            control={control}
            name="descricao"
          />
          <IntlCurrencyInput
            style={{ marginTop: '10px' }}
            currency="BRL"
            config={currencyConfig}
            onChange={handleChangeValor}
            component={TextField as ReactNode}
            label="Valor"
            defaultValue={valor}
            inputProps={{
              inputMode: 'numeric'
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              onClose()
              setValor(0)
            }}
            color="primary"
            style={{ marginRight: '10px' }}>
            Cancelar
          </Button>
          <Button
            type="submit"
            color="primary"
            disabled={loading}
            startIcon={loading && <CircularProgress size={14} />}>
            Salvar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default RegistrarDialog
