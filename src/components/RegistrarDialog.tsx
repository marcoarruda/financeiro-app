import {
  DialogActions,
  DialogContent,
  InputAdornment,
  TextField
} from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AppContext } from '../contexts/AppContext'
import NumberFormatCustom from './NumberFormatCustom'
import AutoComplete from '@material-ui/lab/Autocomplete'

type SimpleDialogProps = {
  open: boolean
  onClose: () => void
  tipoRegistro: 'entrada' | 'saida'
}

type FormData = {
  descricao: string
  valor: number
}

function RegistrarDialog(props: SimpleDialogProps) {
  const { onClose, open, tipoRegistro } = props

  const [labels, setLabels] = useState<string[]>([])
  const context = useContext(AppContext)

  useEffect(() => {
    const newLabels: string[] = []

    for (const registro of context.registros) {
      if (registro.tipo === tipoRegistro) {
        if (!newLabels.find((label) => label === registro.descricao)) {
          newLabels.push(registro.descricao)
        }
      }
    }

    setLabels(newLabels)
  }, [context.registros, tipoRegistro])

  const { register, handleSubmit } = useForm()

  const onSubmit = ({ valor, descricao }: FormData) => {
    const registro = {
      tipo: tipoRegistro,
      descricao,
      valor
    }

    context.addRegistro(registro)
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle id="form-dialog-title">
          Registrar {tipoRegistro === 'entrada' ? 'Entrada' : 'Saida'}
        </DialogTitle>
        <DialogContent>
          <AutoComplete
            options={labels}
            getOptionLabel={(option) => option}
            freeSolo
            renderInput={(params) => (
              <TextField
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
          <TextField
            margin="dense"
            name="valor"
            id="valor"
            label="Valor"
            type="string"
            inputRef={register({
              setValueAs: (value) => {
                return Number(value.replaceAll('.', '').replaceAll(',', '.'))
              },
              required: true
            })}
            InputProps={{
              inputComponent: NumberFormatCustom as any,
              startAdornment: (
                <InputAdornment position="start">R$</InputAdornment>
              )
            }}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancelar
          </Button>
          <Button type="submit" color="primary">
            Salvar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default RegistrarDialog
