import { Container, Paper } from "@material-ui/core";
import { FC, useState } from "react";

const Login: FC = () => {
  const [cadastro, setCadastro] = useState<boolean>(false)

  return (
    <Container component="main">
      <Paper elevation={3}>
        <h1>Login</h1>
      </Paper>
    </Container>
  )
}

export default Login