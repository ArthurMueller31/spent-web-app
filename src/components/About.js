import React from "react";
import "./Navbar.css"; // usando o estilo da navbar
import "./About.css";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <>
      <nav className="main-navbar">
        <img
          className="spent-logo"
          src="../spent-logo-text-right.png"
          alt="app-logo"
        />
        <Link to={"/"}>Voltar</Link>
      </nav>
      <div className="center">
        <div>
          <h1>Sobre o Spent</h1>
          <p>
            O site foi desenvolvido pensando na facilidade que iria trazer se
            fizesse a <strong>organização dos dados por você</strong>.
          </p>
          <p>
            Você vai no mercado, faz suas compras, e ainda se preocupa em
            anotá-las depois.
          </p>
          <p>
            Mas por qual motivo não achar uma maneira mais prática de
            armazená-las? Por esse motivo esse website foi pensado.
          </p>
          <p>
            Basta colocar o link da nota fiscal a qual você entrou no site do
            governo para conseguir, ou escaneou o QR-Code, e nós pegamos as
            informações para você.
          </p>
          <p>
            Você verá o mercado que foi comprado, o produto, o valor, e a data
            da compra. Assim, você pode gerenciar o quanto gastou e com o quê,
            deixando de precisar anotar manualmente ou se esforçar tentando
            entender as letrinhas apagadas da nota fiscal.
          </p>
          <h1>Meus dados estão seguros?</h1>
          <p>Sim, seus dados estão seguros.</p>
          <p>
            Nenhum dado é armazenado em quaisquer servidor, ou seja, são todos
            dados locais. O que isso quer dizer é que nem sequer vemos quais as
            compras que você está enviando usando o link, qual o valor etc.{" "}
            <strong>Nada</strong>.
          </p>
          <p>
            A desvantagem de ter dados armazenados localmente, é que eles apenas
            ficam salvos no seu navegador, então caso use qualquer outro que não
            seja aquele que cadastrou, você não verá suas compras e terá que
            colocar tudo novamente.
          </p>
          <h1>Futuramente</h1>
          <p>
            Essas desvantagens de ter que fazer tudo novamente serão arrumadas
            futuramente usando cadastro de usuário e banco de dados, para
            armazenar as notas fiscais. Reforçando a segurança, será
            implementado criptografia para garantir que ninguém além de você
            veja a sua nota fiscal.
          </p>
          <p>
            Um aplicativo para celular possivelmente irá ser lançado no futuro,
            com funções de escanear QR-Code, para ser mais prático e rápido (não
            tendo que pegar o link manualmente, faremos isso para você)
          </p>
          <p>
            Obrigado por ler até aqui, qualquer reclamação/sugestão de melhorias
            a respeito do serviço, fique à vontade para me{" "}
            <a href="https://mail.google.com/mail/u/0/?fs=1&tf=cm&to=arthurmueller31@gmail.com&su=Assunto&body=Mensagem">
              mandar um email
            </a>
            .
          </p>
          <p>
            <strong>
              Desenvolvido por{" "}
              <a
                href="https://www.linkedin.com/in/arthurmueller31/"
                target="blank"
              >
                Arthur Mueller
              </a>
            </strong>
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
