import {
  DialogActions,
  DialogContent,
  InputAdornment,
  TextField
} from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { AppContext } from '../contexts/AppContext'
import NumberFormatCustom from './NumberFormatCustom'

type SimpleDialogProps = {
  open: boolean
  onClose: () => void
  registroSelecionado: any
}

type FormData = {
  descricao: string
  valor: number
}

function EditarDialog (props: SimpleDialogProps) {
  const { onClose, open, registroSelecionado } = props

  const { register, handleSubmit } = useForm()
  const context = useContext(AppContext)

  const onSubmit = ({ valor, descricao }: FormData) => {
    const registro = {
      id: registroSelecionado.id,
      tipo: registroSelecionado.tipo,
      data: registroSelecionado.data,
      descricao,
      valor
    }
    console.log(registro)
    context?.editarRegistro(registro)
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <form onSubmit={handleSubmit(onSubmit)}>
      <DialogTitle id="form-dialog-title">Editar registro de { registroSelecionado?.tipo === 'entrada' ? 'Entrada' : 'Saida' }</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            { context?.registros.map((registro) => (<Fragment key={registro.id}>{registro.descricao} { registro.valor }<br/></Fragment>)) }
          </DialogContentText> */}
          <TextField
            autoFocus
            margin="dense"
            name="descricao"
            id="descricao"
            label="Descrição"
            type="text"
            value={registroSelecionado?.descricao}
            inputRef={register}
            fullWidth
          />
          <TextField
            margin="dense"
            name="valor"
            id="valor"
            label="Valor"
            type="string"
            value={registroSelecionado?.valor}
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

// const Registrar: FC = () => {
//   const [open, setOpen] = useState(false)
//   const [selectedValue, setSelectedValue] = useState(emails[1])

//   const handleClickOpen = () => {
//     setOpen(true)
//   }

//   const handleClose = (value: string) => {
//     setOpen(false)
//     setSelectedValue(value)
//   }

//   return (
//     <div>
//       <Typography variant="subtitle1">Selected: {selectedValue}</Typography>
//       <br />
//       <Button variant="outlined" color="primary" onClick={handleClickOpen}>
//         Open simple dialog
//       </Button>
//       <SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose} />
//     </div>
//   )
// }

export default EditarDialog
