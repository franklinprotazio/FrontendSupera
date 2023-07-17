import { ReactComponent as GithubIcon } from 'assets/img/github.svg';
import './styles.css';

function Navbar() {

    return (
        <header>
            <nav className="container">
                <div className="dsmovie-nav-content">
                    <h1>Transferencias</h1>
                    <a href="https://github.com/diego-freittas">
                        <div className="dsmovie-contact-container">
                            <GithubIcon />
                            <p className="dsmovie-contact-link">Franclin Protazio</p>
                        </div>
                    </a>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;