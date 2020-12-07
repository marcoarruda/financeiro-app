import {
  DialogActions,
  DialogContent,
  DialogContentText
} from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import { useContext } from 'react'
import { AppContext } from '../contexts/AppContext'

type SimpleDialogProps = {
  open: boolean
  onClose: () => void
  registroId: string | undefined
}

function RemoveDialog (props: SimpleDialogProps) {
  const { onClose, open, registroId } = props

  const context = useContext(AppContext)

  const onSubmit = () => {
    context.removeRegistro(registroId)
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Excluir Registro</DialogTitle>
        <DialogContent>
        <DialogContentText id="alert-dialog-description">
            Tem certeza que deseja excluir este registro?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={onSubmit} color="primary" autoFocus>
            Sim
          </Button>
        </DialogActions>
    </Dialog>
  )
}

export default RemoveDialog
