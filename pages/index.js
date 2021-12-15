import styles from '../styles/styles.module.scss'
 
/* function Contador(){
    return
} */


 function Home() {

    const stopEat = new Date(2021, 4, 3)
    const today = new Date();
    const semCarne = today - stopEat;


    console.log(today)
    console.log(stopEat)

    return (
        <div className={styles.container}>
            <p> Abraones não come carne há:</p>
            <div className={styles.contador} >
                
            </div>

        </div>
    )
 }

 export default  Home
