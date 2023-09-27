import { ChangeEvent } from 'react';
import styles from './ExelPage.module.scss'
import { $api } from '../../shared/api/api';

export default function ExelPage() {

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.item(0);

    if (!file) return
    if (file.name.split('.')[file.name.split('.').length - 1] !== 'xls' && file.name.split('.')[file.name.split('.').length - 1] !== 'xlsx') return

    const formData = new FormData();

    formData.append("file", file);
    $api
      .post('/upload/students', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        
        console.log(response);
      })
      .catch((error) => {
        
        console.log(error);
      });
  }


  return (
    <div className={styles.main}>
      <input type="file" className={styles.file} accept='.xls' onChange={onChange} />
    </div>
  )
}
