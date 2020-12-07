import {
  Button,
  ButtonGroup,
  colors,
  Grid,
  ListItem,
  List,
  Divider,
  Paper,
  Typography
} from '@material-ui/core'
import { FC, Fragment, useContext, useEffect, useState } from 'react'
import { PieChart, Pie, Cell } from 'recharts'
import { AppContext, Registro } from '../contexts/AppContext'
import numeral from 'numeral'
import moment from 'moment'

const Grafico: FC = () => {
  const [tipo, setTipo] = useState<'entrada' | 'saida' | 'todos'>('todos')
  const context = useContext(AppContext)
  const [data, setData] = useState<
    {
      name: string
      value: number
      tipo: string
      percent: string
    }[]
  >([])
  const [registros, setRegistros] = useState<Registro[]>([])

  useEffect(() => {
    const registrosNovos = context.registros.filter((registro) =>
      moment(registro.data).isSame(context.data, context.tipoData)
    )

    setRegistros(registrosNovos)
  }, [context.registros, context.tipoData, context.data])

  useEffect(() => {
    const newData: {
      name: string
      value: number
      tipo: string
      percent: string
    }[] = []

    if (tipo === 'todos') {
      const total = context.valorEntrada + context.valorSaida

      if (context.valorEntrada > 0) {
        newData.push({
          name: 'Entrada',
          value: context.valorEntrada,
          tipo: 'entrada',
          percent: numeral((context.valorEntrada / total) * 100).format('0.0')
        })
      }

      if (context.valorSaida > 0) {
        newData.push({
          name: 'Saída',
          value: context.valorSaida,
          tipo: 'saida',
          percent: numeral((context.valorSaida / total) * 100).format('0.0')
        })
      }
      return setData(newData)
    }

    for (const registro of registros) {
      if (registro.tipo === tipo) {
        const dataProcurada = newData.find(
          (e) => e.name === registro.descricao && registro.tipo === e.tipo
        )
        if (dataProcurada) {
          dataProcurada.value += registro.valor
        } else {
          newData.push({
            name: registro.descricao,
            value: registro.valor,
            tipo: registro.tipo,
            percent: '0'
          })
        }
      }
    }

    for (const dado of newData) {
      const percent =
        dado.tipo === 'entrada'
          ? dado.value / context.valorEntrada
          : dado.value / context.valorSaida
      dado.percent = numeral(percent * 100).format('0.0')
    }

    newData.sort((a, b) => numeral(b.percent).value() - numeral(a.percent).value())

    setData(newData)
  }, [context.valorEntrada, context.valorSaida, tipo, registros])

  const COLORS = [
    colors.green[500],
    colors.red.A700,
    '#FFBB28',
    '#FF8042',
    '#8932a8',
    '#a88e32',
    '#328ca8',
    colors.pink[300],
    colors.blue[500]
  ]

  const RADIAN = Math.PI / 180

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central">
        {`${percent}%`}
      </text>
    )
  }

  const changeTipo = (tipo: 'entrada' | 'saida' | 'todos') => {
    setTipo(tipo)
  }

  return (
    <Grid item container direction="column">
      <Grid item container justify="center">
        <ButtonGroup>
          <Button
            onClick={() => {
              changeTipo('entrada')
            }}
            disabled={ tipo === 'entrada' }
            >
            Entrada
          </Button>
          <Button
            onClick={() => {
              changeTipo('todos')
            }}
            disabled={ tipo === 'todos' }
            >
            Geral
          </Button>
          <Button
            onClick={() => {
              changeTipo('saida')
            }}
            disabled={ tipo === 'saida' }
            >
            Saída
          </Button>
        </ButtonGroup>
      </Grid>
      <Grid container item justify="center">
        {data.length > 0 ? (
          <Grid item container justify="center">
            <PieChart
              width={220}
              height={220}
              margin={{ top: 0, left: 0, right: 0, bottom: 0 }}>
              <Pie
                style={{ overflow: 'visible', margin: '0' }}
                data={data}
                labelLine={false}
                // label={true}
                label={renderCustomizedLabel}
                cursor="pointer"
                isAnimationActive={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value">
                {data.map((entry: any, index: number) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
            <Paper
              style={{
                width: '100%',
                overflowY: 'scroll',
                maxHeight: '25vh'
              }}
              elevation={0}>
              <List>
                {data.map((registro: any, index: number) => (
                  <Fragment key={registro.name}>
                    <ListItem
                      button
                      style={{ color: COLORS[index % COLORS.length] }}>
                      R$ {numeral(registro.value).format('0,0.00')} -{' '}
                      {registro.name} - {registro.percent}%
                    </ListItem>
                    {index !== data.length - 1 ? <Divider /> : null}
                  </Fragment>
                ))}
              </List>
            </Paper>
          </Grid>
        ) : (
          <Typography variant="subtitle1" style={{ marginTop: '10rem' }}>Nenhum registro encontrado</Typography>
        )}
      </Grid>
    </Grid>
  )
}

export default Grafico
