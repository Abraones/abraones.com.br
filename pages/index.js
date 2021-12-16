import styles from '../styles/styles.module.scss'
 
/* function Contador(){
    return
} */


 function Home() {

    const day = 1000* 60 * 60 * 24;

    const stopEat = new Date(2021, 4, 3)
    const date = new Date();
    
    const diff = date.getTime() - stopEat.getTime();
    const timeDays = Math.floor(diff/day)

        let anos = timeDays/365
        let anosDecimal = anos - Math.floor(anos)

        let meses = anosDecimal*12
        let mesesDecimal = meses - Math.floor(meses)

        let dias = Math.floor(mesesDecimal*30)
        
    
    //console.log(texto)
    //console.log(stopEat)

    return (
        <div className={styles.container}>
            <p> Sem carne há: </p>
            <p> {Math.floor(anos)} anos, {Math.floor(meses)} meses e {Math.floor(dias)} dias  </p>            

        </div>
    )
 }

 export default  Home
