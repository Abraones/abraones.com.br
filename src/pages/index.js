import styles from '../styles/Home.module.scss'
import Contador from '../components/Contador'; 
import Parallax from '../components/Parallax'
/* function Contador(){
    return
} */


 function Home() {

    return (
        <>
            <Parallax />
        <div className={styles.container}>
            <Contador />
        </div>
        </>
    )
 }

 export default  Home
