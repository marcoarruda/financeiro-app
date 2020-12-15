import { DialogActions, DialogContent, TextField } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import React, { useContext, useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { AppContext } from '../contexts/AppContext'
import AutoComplete from '@material-ui/lab/Autocomplete'
import NumberFormat from 'react-number-format'
import CircularProgress from '@material-ui/core/CircularProgress'

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
  const [loading, setLoading] = useState(false)
  const { addRegistro, registros, setNotification } = useContext(AppContext)

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
  }, [registros, tipoRegistro])

  const { handleSubmit, control } = useForm({
    defaultValues: {
      descricao: '',
      valor: ' '
    }
  })

  const onSubmit = async ({ valor, descricao }: FormData) => {
    const valorNumber = Number(
      valor?.split(' ')[1].split('.').join('').replace(',', '.')
    )
    if (descricao.trim().length === 0) {
      setNotification('Descrição não pode ser vazia')
      return
    }

    if (valorNumber <= 0) {
      setNotification('Valor deve ser maior que 0')
      return
    }

    const registro = {
      tipo: tipoRegistro,
      descricao: descricao.trim(),
      valor: valorNumber
    }

    console.log({ valor, descricao })

    try {
      setLoading(true)
      await addRegistro(registro)
      onClose()
    } finally {
      setLoading(false)
    }
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
                onInputChange={(_, data) => props.onChange(data)}
                onChange={(_, data) => props.onChange(data)}
              />
            )}
            control={control}
            name="descricao"
          />
          <Controller
            as={
              <NumberFormat
                customInput={TextField}
                thousandSeparator="."
                decimalSeparator=","
                decimalScale={2}
                prefix="R$ "
                fixedDecimalScale
                defaultValue=" "
              />
            }
            inputProps={{
              inputMode: 'numeric'
            }}
            label="Valor"
            control={control}
            name="valor"
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={onClose}
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
