import {
  Button,
  ButtonGroup,
  colors,
  Grid,
  ListItem,
  List,
  Divider,
  Paper
} from '@material-ui/core'
import { FC, Fragment, useContext, useMemo, useState } from 'react'
import { PieChart, Pie, Tooltip, Cell } from 'recharts'
import { AppContext } from '../contexts/AppContext'
import numeral from 'numeral'

const Grafico: FC = () => {
  const [tipo, setTipo] = useState<'entrada' | 'saida' | 'todos'>('todos')
  const context = useContext(AppContext)

  const total = context.valorEntrada + context.valorSaida

  const dataFiltrada = useMemo(() => {
    const data: {
      name: string
      value: number
      tipo: string
      percent: string
    }[] = []

    for (const registro of context.registros) {
      if (registro.tipo === tipo) {
        const dataProcurada = data.find(
          (e) => e.name === registro.descricao && registro.tipo === e.tipo
        )
        if (dataProcurada) {
          dataProcurada.value += registro.valor
        } else {
          data.push({
            name: registro.descricao,
            value: registro.valor,
            tipo: registro.tipo,
            percent: '0'
          })
        }
      }
    }

    for (const dado of data) {
      const percent =
      dado.tipo === 'entrada'
        ? dado.value / context.valorEntrada
        : dado.value / context.valorSaida
      dado.percent = numeral(percent * 100).format('0.0')
    }

    return data
  }, [context.valorEntrada, context.valorSaida, tipo])

  const data =
    tipo === 'todos'
      ? [
          {
            name: 'Entrada',
            value: context.valorEntrada,
            tipo: 'entrada',
            percent: numeral((context.valorEntrada / total) * 100).format('0.0')
          },
          {
            name: 'Saida',
            value: context.valorSaida,
            tipo: 'saida',
            percent: numeral((context.valorSaida / total) * 100).format('0.0')
          }
        ]
      : dataFiltrada

  const COLORS = [
    '#0088FE',
    '#00C49F',
    '#FFBB28',
    '#FF8042',
    '#8932a8',
    '#a88e32',
    '#328ca8'
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
            style={{ backgroundColor: colors.green[600], color: 'white' }}
            onClick={() => {
              changeTipo('entrada')
            }}>
            Entrada
          </Button>
          <Button
            style={{ backgroundColor: colors.red.A700, color: 'white' }}
            onClick={() => {
              changeTipo('saida')
            }}>
            Saida
          </Button>
          <Button
            style={{ backgroundColor: colors.blue.A700, color: 'white' }}
            onClick={() => {
              changeTipo('todos')
            }}>
            Todos
          </Button>
        </ButtonGroup>
      </Grid>
      <Grid container item justify="center">
        {context ? (
          context.valorEntrada && context.valorSaida > 0 ? (
            <Grid item container justify="center">
              <PieChart
                width={300}
                height={300}
                margin={{ top: 0, left: 0, right: 0, bottom: 0 }}>
                <Pie
                  style={{ overflow: 'visible', margin: '0' }}
                  data={data}
                  labelLine={false}
                  // label={true}
                  label={renderCustomizedLabel}
                  cursor="pointer"
                  isAnimationActive={false}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value">
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
              <Paper
                style={{
                  width: '100%',
                  overflowY: 'scroll',
                  maxHeight: '25vh'
                }}
                elevation={0}>
                <List>
                  {data.map((registro, index) => (
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
            <>Nenhum registro encontrado</>
          )
        ) : (
          <>Nenhum registro encontrado</>
        )}
      </Grid>
    </Grid>
  )
}

export default Grafico
