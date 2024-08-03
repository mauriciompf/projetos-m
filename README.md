# Visão Geral

> Desenvolvido por **Maurício Farias**.

(ノ#-_-)ノ ミ┴┴

## Introdução

O projeto é uma vitrine das minhas habilidades técnicas como desenvolvedor web, contendo três projetos distintos em uma pequena plataforma interativa e acessível. Desenvolvido com [React](https://react.dev) e [Tailwind CSS](https://tailwindcss.com), este website reflete meu aprendizado e domínio dessas ferramentas, com ênfase especial em React. Esta demonstração destaca minha capacidade de criar interfaces de usuário responsivas e de implementar uma navegação eficiente e funcional.

## Projeto 1 - Ordenação e Filtro

Uma aplicação que demonstra a capacidade de filtrar e organizar de forma básica dados provenientes da API gratuita [DummyJSON](https://dummyjson.com/docs/users). O objetivo foi criar uma interface que permite aos usuários gerenciar e visualizar dados em uma tabela de forma eficiente. A aplicação utiliza uma tabela para exibir informações de usuários, oferecendo funcionalidades de ordenação e filtragem para facilitar a análise dos dados.

## Funcionalidades

### **Página Principal**

- Botões para alternar entre temas claro e escuro, permitindo que o usuário escolha o estilo visual que prefere.

- Links dos projetos em formato de grid, com cada caixa contendo um link que leva diretamente ao projeto correspondente.

- Todas as páginas dos projetos contêm um menu lateral, permitindo ao usuário navegar rapidamente entre os projetos.

### **Navegação**

- **Menu Lateral:**
  - Cabeçalho com o título "Projetos" e um link de retorno para a página principal.

  - Botão para minimizar ou maximizar o menu lateral, facilitando a navegação conforme a preferência do usuário.

  - Links para os projetos, cada um com um ícone e nome distintivos, facilitando a identificação e o acesso rápido.

  - Rodapé do menu com os mesmos botões de tema claro e escuro para manter a consistência em todas as páginas.
  
  - Linhas horizontais entre os elementos do menu para uma organização visual clara e ordenada.

### **Ordenação e Filtro**

- **Configuração de Parâmetros:**
  - Botão "Organizar": Ao clicar, uma caixa flutuante é exibido, permitindo ao usuário definir a coluna para ordenação e escolher entre crescente, decrescente ou padrão.
  
  - Botão "Filtrar": Semelhante ao botão de organizar, este botão abre uma interface para definir critérios de filtragem. Inclui um dropdown para selecionar a coluna e um filtro de status com opções "é" ou "não é", além de uma barra de busca dependendo da coluna selecionada.
  
- **Indicador de Resultados:**
  - Exibe a quantidade de resultados filtrados na tabela, atualizando dinamicamente conforme os parâmetros de filtragem são aplicados.

## Tecnologias Utilizadas

- **React**: Para construção da interface do usuário.
- **[TypeScript](https://www.typescriptlang.org)**: Para segurança de tipos e melhor experiência de desenvolvimento.
- **Tailwind CSS**: Para estilização da aplicação.
- **[Vite](https://vitejs.dev)**: Para desenvolvimento rápido e ferramenta de build.
- **[React Router](https://reactrouter.com/en/main)**: Para navegação entre diferentes visualizações e  useSearchParams() para gerenciar parâmetros de consulta na URL.
- **[tailwind-merge](https://www.npmjs.com/package/tailwind-merge)**: Para evitar duplicação de classes utilizando Tailwind CSS

## Atualizações

### Geral

- **Melhorias de Usabilidade:**
  - Exibir um pop-up no menu lateral para facilitar o retorno a página principal.
  - *Implementação de teclas de atalho para navegação rápida entre as páginas.*
<!-- - **Design e Estética:** -->
- **Acessibilidade e Feedback:**
  - Adição de uma página de erro 404 para informar ao usuário quando uma página não é encontrada.
  - *Implementação de uma interface de usuário de carregamento pendente em caso de carregamento lento.*
- **Melhorias Técnicas:**
  - *Inclusão de exemplos de código na documentação para ilustrar funcionalidades e uso.*
  - *Adição de uma seção detalhada de instalação e configuração na documentação.*
  - *Implementação de testes unitários utilizando [jest](https://jestjs.io) para garantir a estabilidade e qualidade do código.*
  - Publicação do site utilizando [GitHub Pages](https://pages.github.com) para facilitar o acesso e visualização online.
  - *Melhoria na performance utilizando ferramentas como [PageSpeed Insights](https://pagespeed.web.dev/).*

### Projeto 1

- **Documentação e Compreensão:**
  - *Adição de exemplos de código na documentação para ilustrar funcionalidades e uso.*
- **Funcionalidade**
  - Remover parâmetros dos status quando a coluna "sexo" for selecionada no filtro.
  - *Fixar registros no topo da tabela abaixo do cabeçalho*
  - *Adicionar filtro para a coluna de data de nascimento*
- **Interface e Design**:
  - Alteração do gif de carregamento para algo mais moderno e menos intrusivo.
  - Melhoria na responsividade da interface para dispositivos móveis.
- **Acessibilidade e Feedback:**
  - Limitação do número de caracteres nos campos de entrada para evitar erros de digitação.
  - *Melhoria na acessibilidade para garantir que todos os usuários possam interagir com a aplicação sem barreiras.*
  - Correção do filtro de telefone para permitir a adição de espaços.

### Projeto 2

- (Não iniciado)

### Projeto 3

- (Não iniciado)

---

*Obrigado pela atenção*.
