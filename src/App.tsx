import { useCallback, useState } from 'react'
import styles from './App.module.scss'
import GroupsPage from './pages/groups/GroupsPage'
import ExelPage from './pages/exel/ExelPage'

function App() {

  const [nav, setNav] = useState(0)

  const navigateToGroups = useCallback(
    () => {
      setNav(0)
    },
    [setNav],
  )

  const navigateToExel = useCallback(
    () => {
      setNav(1)
    },
    [setNav],
  )


  return (
    <div className={styles.wrapper}>
      <div className={styles.navigation}>
        <div className={styles.nav_header}>
          <img src="src\assets\discovery.png" alt="" />
          <h3>Навигация</h3>
        </div>
        <div className={styles.nav_item}>
          <img src="src\assets\users.png" alt="" />
          <a onClick={navigateToGroups} >Группы</a>
        </div>
        <a className={styles.nav_item} onClick={navigateToExel} >Загрузить exel</a>
      </div>
      {
        nav === 0 && <GroupsPage />
      }
      {
        nav === 1 && <ExelPage />
      }
    </div>
  )
}

export default App
