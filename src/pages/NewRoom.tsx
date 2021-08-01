import { Link } from "react-router-dom";

import IllustrationIMG from "../assets/illustration.svg";
import LogoIMG from "../assets/logo.svg";

import { useAuth } from "../hooks/auth";

import { Button } from "../components/Button";

import "../styles/auth.scss";

export function NewRoom() {
  const { user } = useAuth();

  return (
    <div id="page-auth">
      <aside>
        <img src={IllustrationIMG} alt="Illustration" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas de sua audiência em tempo-real</p>
      </aside>

      <main>
        <div className="main-content">
          <img src={LogoIMG} alt="Letmeask" />

          <h2>Criar uma nova sala</h2>

          <form>
            <input type="text" placeholder="Digite o nome da sala" />
            <Button type="submit">Criar sala</Button>
          </form>

          <p>
            Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
