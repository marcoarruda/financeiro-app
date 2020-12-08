import { Auth } from 'aws-amplify'
import { FC, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { AppContext } from '../contexts/AppContext'

const AuthLayout: FC = (props) => {
  const context = useContext(AppContext)
  const history = useHistory()

  useEffect(() => {
    (async () => {
      try {
        const user = await Auth.currentAuthenticatedUser()

        if (user) {
          history.push('/')
        }
      } catch (err) {

      }
    })()
  }, [])

  return (
    <div>
      { props.children }
    </div>
  )
}

export default AuthLayout
