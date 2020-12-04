import { Button, ButtonGroup, colors, Grid } from '@material-ui/core'
import { FC, useContext, useState } from 'react'
import { PieChart, Pie, Tooltip, Cell } from 'recharts'
import { AppContext } from '../contexts/AppContext'
import numeral from 'numeral'

const Grafico: FC = () => {
  const [tipo, setTipo] = useState<'entrada' | 'saida' | 'todos'>('todos')
  const context = useContext(AppContext)

  const dataFitrada = () => {
    const datas = []
    if (context) {
      for (const registro of context?.registros) {
        const dataProcurada = datas.find(e => e.name === registro.descricao && registro.tipo === tipo)
        if (dataProcurada) {
          dataProcurada.value += registro.valor
        } else {
          datas.push({
            name: registro.descricao,
            value: registro.valor
          })
        }
      }
    }

    return datas
  }
  const data = tipo === 'todos' ? [
    { name: 'Entrada', value: context?.valorEntrada },
    { name: 'Saida', value: context?.valorSaida }
  ] : tipo === 'entrada' ? [
    { name: 'Entrada', value: context?.valorEntrada },
    { name: 'Saida', value: context?.valorSaida }
  ] : [
    { name: 'Entrada', value: context?.valorEntrada },
    { name: 'Saida', value: context?.valorSaida }
  ]

  const COLORS = [colors.green[600], colors.red[600]]

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
          fill={colors.grey[900]}
          textAnchor={x > cx ? 'start' : 'end'}
          dominantBaseline="central">
          {`R$ ${numeral(data[index].value).format('0,0.00')}`}
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
        {context ? context.valorEntrada && context.valorSaida > 0 ? (<PieChart width={300} height={300}>
          <Pie
            data={data}
            labelLine={false}
            label={renderCustomizedLabel}
            cursor="pointer"
            isAnimationActive={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>) : (<>Nenhum registro encontrado</>) : (<>Nenhum registro encontrado</>)}
      </Grid>
    </Grid>
  )
}

export default Grafico
