import { Auth } from 'aws-amplify'
import { FC, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

const AuthLayout: FC = (props) => {
  const history = useHistory()

  useEffect(() => {
    ; (async () => {
      try {
        const user = await Auth.currentAuthenticatedUser()

        if (user) {
          history.push('/')
        }
      } catch (err) { }
    })()
  }, [])

  return <div>{props.children}</div>
}

export default AuthLayout
