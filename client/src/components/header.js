import './styles/styleHeader.css'
import logo from '../assets/logo-west.png'
import name from '../assets/logo-name.png'
import phone from '../assets/phone-call-head.png'
import clock from '../assets/clock-head.png'

function Header() {

    return (
        <>
<header>
    <img className={"logo"} src={logo}/>
    <img className={"name"} src={name}/>
    <div  className={"phoneContainer"}>
        <img className={"phoneLogo"} src={phone}/>
        <p>Брест:</p>
        <div>
            <p>+375 (29) 250-02-02</p>
            <p>+375 (29) 735-03-03</p>
        </div>
    </div>
    <div className={"clockContainer"}>
        <img className={"clockLogo"} src={clock}/>
        <div>
            <b>Мы работаем</b>
            <p>8:30 - 17:30</p>
            <p>Сб: 9:00 - 14:00</p>
            <p>Выходной: Вс</p>
        </div>
    </div>
</header>
        </>
    );
}

export default Header;