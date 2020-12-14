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
import { AppContext, Registro } from '../contexts/AppContext'
import NumberFormatCustom from './NumberFormatCustom'
import AutoComplete from '@material-ui/lab/Autocomplete'
import CircularProgress from '@material-ui/core/CircularProgress'

type SimpleDialogProps = {
  open: boolean
  onClose: () => void
  registroSelecionado: Registro
}

type FormData = {
  descricao: string
  valor: number
  data: Date
}

function EditarDialog(props: SimpleDialogProps) {
  const { onClose, open, registroSelecionado } = props

  const { register, handleSubmit } = useForm()
  const { editarRegistro, registros } = useContext(AppContext)
  const [labels, setLabels] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const newLabels: string[] = []

    for (const registro of registros) {
      if (registro.tipo === registroSelecionado.tipo) {
        if (!newLabels.find((label) => label === registro.descricao)) {
          newLabels.push(registro.descricao)
        }
      }
    }

    setLabels(newLabels)
  }, [registros, registroSelecionado])

  const onSubmit = async ({ valor, descricao }: FormData) => {
    try {
      setLoading(true)
      const registro = {
        id: registroSelecionado.id,
        tipo: registroSelecionado.tipo,
        data: registroSelecionado.data,
        descricao,
        valor
      }
      await editarRegistro(registro)
      onClose()
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} aria-labelledby="form-dialog-title">
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle id="form-dialog-title">
          Editar registro de{' '}
          {registroSelecionado?.tipo === 'entrada' ? 'Entrada' : 'Saída'}
        </DialogTitle>
        <DialogContent>
          <AutoComplete
            options={labels.sort((a, b) => a < b ? -1 : 1)}
            defaultValue={registroSelecionado.descricao}
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
            defaultValue={registroSelecionado.valor}
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

export default EditarDialog
