import { useCallback, useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { selectGroups, getGroupsThunk, selectGroupsLoading, selectGroupsError } from '../../store/slices/groupsSlice'
import styles from './GroupsPage.module.scss'
import { StudentsPage } from '../studetsPage/StudentsPage'
import { getStudentsWithGropeIdThunk, selectStudentsGroup } from '../../store/slices/studentsSlice'

export default function GroupsPage() {

    const groups = useAppSelector(selectGroups)
    const selected = useAppSelector(selectStudentsGroup)
    const groupsIsLoading = useAppSelector(selectGroupsLoading)
    const groupsError = useAppSelector(selectGroupsError)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getGroupsThunk())
    }, [dispatch])

    const gropeClickHandler = useCallback(
        (id: string) => {
            dispatch(getStudentsWithGropeIdThunk(id))
        },
        [dispatch]
    )


    return (
        <>
            <StudentsPage />
            <div className={styles.groups}>
                <div className={styles.header}>
                    <img src="src\assets\paper.svg" alt="" />
                    <h2>Список групп</h2>
                </div>
                <div className={styles.scroll_wrapper}>
                    {
                        groupsIsLoading && <>Загрузка групп...</>
                    }
                    {
                        groupsError && <>{groupsError}</>
                    }
                    {
                        !groupsIsLoading && groups?.map((item) => {
                            return <h1 className={`${styles.item} ${selected === item.id && styles.active}`} key={item.id} onClick={() => {
                                gropeClickHandler(item.id)
                            }} >{item.name}</h1>
                        })
                    }
                </div>
            </div>
        </>
    )
}
