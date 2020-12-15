import { DialogActions, DialogContent, TextField } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import React, { ReactNode, useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AppContext, Registro } from '../contexts/AppContext'
import AutoComplete from '@material-ui/lab/Autocomplete'
import CircularProgress from '@material-ui/core/CircularProgress'
import MomentUtils from '@date-io/moment'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import moment from 'moment'
import 'moment/locale/pt-br'
import IntlCurrencyInput from 'react-intl-currency-input'

moment.locale('pt-br')

type SimpleDialogProps = {
  open: boolean
  onClose: () => void
  registroSelecionado: Registro
}

type FormData = {
  descricao: string
  data: Date
}

function EditarDialog(props: SimpleDialogProps) {
  const { onClose, open, registroSelecionado } = props
  const { editarRegistro, registros } = useContext(AppContext)
  const [labels, setLabels] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [dataRegistro, setDataRegistro] = useState<Date>(new Date())
  const [valorRegistro, setValorRegistro] = useState(0)

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

  useEffect(() => {
    const newLabels: string[] = []
    for (const registro of registros) {
      if (registro.tipo === registroSelecionado.tipo) {
        if (!newLabels.find((label) => label === registro.descricao)) {
          newLabels.push(registro.descricao)
        }
      }
    }

    setDataRegistro(registroSelecionado.data)
    setValorRegistro(registroSelecionado.valor)

    setLabels(newLabels)
  }, [registros, registroSelecionado])

  const { register, handleSubmit } = useForm()

  const handleChangeValor = (
    event: any,
    value: number,
    maskedValue: string
  ) => {
    setValorRegistro(value)
  }

  const onSubmit = async ({ descricao }: FormData) => {
    try {
      setLoading(true)
      const registro = {
        id: registroSelecionado.id,
        tipo: registroSelecionado.tipo,
        data: dataRegistro,
        descricao,
        valor: valorRegistro
      }
      await editarRegistro(registro)
      onClose()
    } finally {
      setLoading(false)
    }
  }

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Dialog open={open} aria-labelledby="form-dialog-title">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle id="form-dialog-title">
            Editar registro de{' '}
            {registroSelecionado?.tipo === 'entrada' ? 'Entrada' : 'Saída'}
          </DialogTitle>
          <DialogContent>
            <AutoComplete
              options={labels.sort((a, b) => (a < b ? -1 : 1))}
              defaultValue={registroSelecionado.descricao}
              getOptionLabel={(option) => option}
              freeSolo
              renderInput={(params) => (
                <TextField
                  autoFocus
                  {...params}
                  name="descricao"
                  label="Descrição"
                  inputRef={register({
                    required: true,
                    minLength: 2
                  })}
                />
              )}
            />
            <IntlCurrencyInput
              currency="BRL"
              config={currencyConfig}
              onChange={handleChangeValor}
              defaultValue={valorRegistro}
              component={TextField as ReactNode}
              label="Valor"
              inputProps={{
                inputMode: 'numeric'
              }}
              style={{ marginTop: '10px' }}
            />
            <DatePicker
              style={{ marginTop: '10px' }}
              fullWidth={true}
              name="data"
              format="DD/MM/YYYY"
              label="Data"
              onChange={(date) => {
                setDataRegistro(date?.toDate() as Date)
              }}
              value={moment(dataRegistro)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="primary">
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
    </MuiPickersUtilsProvider>
  )
}

export default EditarDialog
