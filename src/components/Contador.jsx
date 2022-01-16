
function Contador(props){

    
    const stopEat = new Date(2021, 4, 3)
    const diff = new Date() - stopEat.getTime();

    const day = 1000* 60 * 60 * 24;
    const timeDays = Math.floor(diff/day)

    let anos = timeDays/365
    let anosDecimal = anos - Math.floor(anos)

    let meses = anosDecimal*12
    let mesesDecimal = meses - Math.floor(meses)

    let dias = Math.floor(mesesDecimal*30)


    return (
        <div>
            <h1>Sem carne há:</h1>
            <p> {Math.floor(anos)} anos, {Math.floor(meses)} meses e {Math.floor(dias)} dias  </p> 
        </div>
    )
}


export default Contador