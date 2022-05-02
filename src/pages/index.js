import styles from '../styles/Home.module.scss'
import Contador from '../components/Contador'; 
import Tree from '../components/Tree'


 function Home() {

    return (
        <>
            <Tree/>
            <div className={styles.container}>
                <Contador />
            </div>

        </>
    )
 }

 export default  Home
