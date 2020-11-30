import { createStyles, Grid, makeStyles, Theme } from "@material-ui/core"
import { FC } from "react"
import Data from "../components/Data"
import Header from "../components/Header"
import Footer from "../components/Footer"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: '4rem 2rem 4rem 2rem',
    },
  }),
)

const MainLayout: FC = ({ children }) => {
  const classes = useStyles();

  return (
    <>
      {/* Header */}
      <Header />

      {/* Container */}
      <Grid container className={ classes.container }>
        <Data />
        { children }
      </Grid>

      {/* Footer */}
      <Footer />
    </>
  )
}

export default MainLayout