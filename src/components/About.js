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
            Por exemplo, você vai no mercado, faz suas compras, e ainda se
            preocupa em anotá-las depois.
          </p>
          <p>
            Mas por qual motivo não achar uma maneira mais prática de
            armazená-las?
          </p>
          <p>
            <strong>Por esse motivo esse website foi pensado</strong>.
          </p>
          <p>
            Basta colar ou digitar o link da nota fiscal a qual você entrou no site do
            governo para conseguir, ou escaneou o QR-Code, e{" "}
            <strong>nós pegamos as informações para você</strong>.
          </p>
          <p>
            Você verá o estabelecimento que foi comprado, o produto, o valor, e a data
            da compra. Assim, você pode gerenciar o quanto gastou e com o quê,
            deixando de precisar anotar manualmente ou se esforçar tentando
            entender as letrinhas apagadas da nota fiscal.
          </p>

          <h1>Por que usar nosso site?</h1>
          <p>
            Em resposta breve: para armazenar seus gastos com{" "}
            <strong>facilidade</strong>.
          </p>
          <p>
            Para cada compra que fizer, caso seja uma pessoa que controla as
            despesas, pegando nota fiscal, uma por uma, e var colocando os dados
            no Excel ou qualquer outra ferramenta, iria levar muito mais tempo
            do que simplesmente colar o link e deixar que o nosso site faça isso
            por você.
          </p>
          <p>
            Por isso o Spent foi pensado, para{" "}
            <strong>facilitar e otimizar seu tempo</strong>.
          </p>

          <h1>Como Funciona e Limitações</h1>
          <p>
            Você pode começar adicionando seus gastos, simplesmente colando o
            link abaixo de onde está escrito "Insira o link aqui". Então,
            aguarde para que nosso site possa coletar as informações para você.
          </p>
          <p>
            Deverá ser visto uma tabela contendo qual o local que você comprou,
            o produto que foi comprado, o valor, e data.
          </p>
          <p>
            Por enquanto, o serviço está limitado ao estado de Santa Catarina,
            devido diferenças na nota fiscal comparado à outras regiões.
          </p>
          <p>
            De exemplo, este é o modelo que o site da nota fiscal apresenta.
            Qualquer compra que for feita e este é o site apresentado quando se
            vê a nota fiscal, nosso site deve reconhecer.
          </p>
          <p>Abaixo você pode ver um exemplo:</p>
          <img src="/exemplo-nota-fiscal.png" alt="exemplo de nota fiscal" />

          <p>
            Até o momento, serão guardadas as informações localmente, ou seja,
            se você trocar de dispositivo, limpar os dados do navegador ou
            utilizar outro, eles não estarão disponíveis.
          </p>
          <p>
            Já estamos trabalhando para implementar banco de dados e cadastro de
            usuários, eliminando esse problema.
          </p>

          <h1>Meus dados estão seguros?</h1>
          <p>
            Sim, <strong>seus dados estão seguros</strong>.
          </p>
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
            Essas desvantagens, ditas anteriormente, de ter que cadastrar tudo
            novamente, serão arrumadas futuramente usando cadastro de usuário e
            banco de dados, para armazenar as notas fiscais.
          </p>
          <p>
            Fazer planilhas para você (automaticamente com Excel ou outra
            maneira), por exemplo, além de outras melhorias, serão implementadas
            numa atualização futura.
          </p>
          <p>
            Um aplicativo para celular possivelmente irá ser lançado, com
            funções de escanear QR-Code, para ser mais prático e rápido (não
            tendo que pegar o link manualmente).
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
