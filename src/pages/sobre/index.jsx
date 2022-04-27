import styles from '../../styles/Sobre.module.scss'

export default function Sobre(props){
    return(
        <div className={styles.container}>
            <div className={styles.content}>
                <h1>Sobre mim</h1>
                <p>Sou Abraão Lincon, tenho 20 anos, sou quase formado em Gestão Empresarial (falta 1 semestre), sou uma pessoa muito positiva e calma.
                    <br/><br/>
                    Me considero uma pessoa muito criativa, adoro criar e testar coisas novas, gosto de estudar e tenho facilidade quando o conteúdo de estudo é útil e de meu interesse. Desde bem cedo tive facilidade com matemática e tudo que é lógico então odeio “decoreba”.
                    <br/> <br/>
                    Estudo desenvolvimento por prazer e pela diversidade de possibilidades que a programação nos trás. A satisfação de solucionar um problema ou implementar uma nova funcionalidade é incrível e compensa cada hora gasta lendo documentação. Em minha formação em gestão pude perceber o quanto a tecnologia é essencial nos negócios e consegue escalar os projetos.
                    <br/><br/>
                    Para saber mais sobre minhas experiências como desenvolvedor:
                </p>
                <a href='./dev'>
                    <div className={styles.buttonTree}>
                    <p>Desafio Dev</p>
                    </div>
                </a>
                <p>
                    Atualmente trabalho como Analista de Suporte, mas busco por uma oportunidade de trabalhar como desenvolvedor, nas minhas horas vagas invisto em meus projetos pessoais e no tempo restante descanso, porque morar sozinho não é moleza. 
                    <br/><br/>
                    Para entrar em contato comigo pode seguir os links abaixo, ou procurar por mim como Abraones.
                </p>
            </div>
            <a href='mailto:abraaobenites@gmail.com'>
                <div className={styles.buttonTree}>
                    <p>E-mail</p>
                </div>
            </a>
            <a href='https://instagram.com/Abraones_'>
                <div className={styles.buttonTree}>
                   <p>Instagram</p>
                </div>
            </a>
        </div>
    )
}