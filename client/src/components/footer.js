import logo from '../assets/logo-west.png'
import './styles/styleHeader.css'
import './styles/styleFooter.css'

function Footer() {
    return (
        <>
<footer>
    <img className={"logo containerText"} src={logo}/>
    <div className={"containerText"}>
        <p>Арматура</p>
        <p>Труба профильная</p>
        <p>Оцинкованный лист</p>
        <p>Уголок</p>
        <p>Швеллер</p>
    </div>
    <div className={"containerText"}>
        <p>Профлист</p>
        <p>Профнастил</p>
        <p>Поликарбонат</p>
        <p>Сетка рабица</p>
    </div>
    <div className={"containerText dostavka"}>
<p>О компании Новости Доставка Контакты</p>
        <p className={"sityText"}>Чаще всего доставляем товар в: Брест, Кобрин, Каменец, Жабинка, Малорита, Пружаны, Береза, Дрогичин, Иваново</p>
    </div>
</footer>
        </>
    );
}

export default Footer;