import { useSelector } from 'react-redux'
import styles from './StudentsPage.module.scss'
import { createStatementThunk, exludeStudentWithIdThunk, selectStudents, selectStudentsError, selectStudentsGroup, selectStudentsLoading, selectStudentsSaved, setStudentReason, switchStudentPresention } from '../../store/slices/studentsSlice'
import { useAppDispatch } from '../../store/hooks'
import { ChangeEvent, useCallback } from 'react'
import { selectGroups } from '../../store/slices/groupsSlice'

export const StudentsPage = () => {

    const students = useSelector(selectStudents)
    const studentsLoading = useSelector(selectStudentsLoading)
    const studentsError = useSelector(selectStudentsError)
    const saved = useSelector(selectStudentsSaved)
    const groupId = useSelector(selectStudentsGroup)
    const groups = useSelector(selectGroups)

    const dispatch = useAppDispatch()

    const submitHandler = useCallback(
        () => {
            dispatch(createStatementThunk())
        },
        [dispatch],
    )

    const reasonHandler = useCallback(
        (id: number, text: string) => {
            dispatch(setStudentReason({
                id: id,
                reason: text
            }))
        },
        [dispatch],
    )


    return (
        <div className={styles.main}>
            <h2 className={styles.groupName}>{groups?.find((it) => {
                return it.id === groupId
            }) ? `Группа ${groups?.find((it) => {
                return it.id === groupId
            })?.name}` : 'Выберите группу'}</h2>
            <div className={styles.wrapper}>
                {
                    studentsLoading && <>Loading...</>
                }
                {
                    studentsError && <>{studentsError}</>
                }
                {
                    !studentsLoading && students?.map((item) => {
                        return <div className={styles.student} key={item.id}>
                            <div className={styles.student_data_wrapper}>
                                <div className={styles.student_data}>
                                    <img src="src\assets\student.svg" alt="" />
                                    <div>
                                        <p className={styles.title}>Студент</p>
                                        <p>{`${item.fullname}`}</p>
                                    </div>
                                </div>
                                <div className={styles.student_data}>
                                    <img src="src\assets\parent.svg" alt="" />
                                    <div>
                                        <p className={styles.title}>Родитель</p>
                                        <p>{`${item.fullnameParent}`}</p>
                                    </div>
                                </div>
                                <div className={styles.student_data}>
                                    <img src="src\assets\phone.svg" alt="" />
                                    <div>
                                        <p>{`${item.numberParent}`}</p>
                                    </div>
                                </div>

                                {/* <p>{`${item.isExcluded}`}</p>
                                <p>{`${item.wasPresent}`}</p> */}
                            </div>
                            <textarea className={styles.reason} onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
                                reasonHandler(item.id, event.currentTarget.value)
                            }} disabled={item.wasPresent} placeholder='Причина остутствия' value={item.reason} />
                            <div className={styles.buttons}>
                                <button className={styles.button} onClick={() => {
                                    dispatch(switchStudentPresention(item.id))
                                }}>{item.wasPresent === true ? 'Отсутствует' : 'Присутствует'}</button>
                                <button className={styles.button} disabled={item.isExcluded} onClick={() => {
                                    dispatch(exludeStudentWithIdThunk(item.id))
                                }}>{item.isExcluded === true ? 'Исключен' : 'Исключить'}</button>
                            </div>
                        </div>
                    })
                }
                <div style={{
                    padding: '20px'
                }} />
            </div>
            <button disabled={saved} className={`${styles.submit} ${saved && styles.disabled_button}`} onClick={submitHandler} >Сохранить</button>
        </div>
    )
}
