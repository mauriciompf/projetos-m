# Projetos-m

> Desenvolvido por [**Maurício**](https://github.com/mauriciompf)

(ノ#-_-)ノ ミ┴┴

## 🌠 Introdução

O projeto é uma vitrine das minhas habilidades técnicas como desenvolvedor web, contendo três projetos distintos em uma pequena plataforma interativa e acessível. Desenvolvido com [React](https://react.dev) e [Tailwind CSS](https://tailwindcss.com), este website reflete meu aprendizado e domínio dessas ferramentas, com ênfase especial em React.

## 📊 Projeto 1 -  Tabela (Ordenação e Filtro)

Demonstra a capacidade de filtrar e organizar de forma básica dados provenientes da API gratuita [DummyJSON](https://dummyjson.com/docs/users). O objetivo foi criar uma interface que permite aos usuários gerenciar e visualizar dados em uma tabela.

## 🖼️ Projeto 2 - Galeria (Gerenciamento)

Permite aos usuários gerenciar e visualizar álbuns de fotos. A aplicação apresenta um carrossel de fotos e um botão para adicionar novas galerias à direita. Os usuários podem criar, visualizar e gerenciar galerias (albums), fazendo upload de fotos, expandindo imagens para visualização em tela cheia e deletando fotos ou galerias. Além disso, oferece interações como arrastar e soltar imagens e adicionar imagens via URLs.

## 🕗 Projeto 3 - Hora Atual (Relógio Digital)

Exibe informações detalhadas sobre a data, hora, e localização do usuário, além de fornecer múltiplos fusos horários ao redor do mundo e barras de progresso diário e anual.

## ⚙️ Funcionalidades

### **Navegação**

- Cada página de cada projeto contêm um menu lateral de navegação podendo ser minimizado ou maximizado;

- Altere entre os temas claro e escuro;

- Links dos projetos, com cada caixa contendo um link que leva diretamente ao projeto correspondente.

### **Tabela**

- **Configuração de Parâmetros**:
  - **Organizar**: Permite ao usuário definir a coluna para ordenação e ordernar os valores entre crescente ou decrescente.
  
  - **Filtro**: Define critérios de filtragem. Selecione a coluna e um filtro de status com opções "é" ou "não é", além de uma barra de busca dependendo da coluna selecionada.
  
- **Indicador de Resultados**:
  - Exibe a quantidade de resultados filtrados na tabela, atualizando dinamicamente conforme os parâmetros de filtragem são aplicados.

### **Galeria**

- **Configurações**:

  - Permite a criação de novos álbuns;

  - Cada álbum possui seu próprio estado, incluindo título e imagens;

  - Detecta cliques fora dos modais e fecha-os;

  - Permite o upload de multiplas imagens;

  - Suporta a inserção de URLs para importar imagens, com validação para garantir URLs válidas (somente imagens);

  - Implementa a funcionalidade de arrastar e soltar imagens, com validação para garantir que as imagens carregadas sejam aceitáveis;

- **Modo Edição**:

  - Permite adicionar o álbum à visualização principal.

  - **Deletar Album**: Deleta o álbum, com confirmação antes de excluir;

  - **Salvar Album**: Salva as alterações conforme suas modificações dentro do album;

  - **Deletar Imagem**: Exibe um botão "Deletar" ao passar o mouse sobre a imagem, com confirmação antes da exclusão;

  - **Expandir Imagem**: Exibe um botão "Expandir" ao passar o mouse sobre a imagem;

  - **Redirecionamento**: Após cada ação de criar/salvar/deletar, redireciona para a visualização principal.

- **Carrossel**:

  - **Navegação**: Permite a navegação entre próximo e anterior de imagens do album principal.

  - **Apresentação Dinâmica**: Implementa uma apresentação automática das imagens do album principal;

  - **Expansão de Imagens**: Permite a visualização em tela cheia entre cada imagem do album principal, com botões para fechar e navegar entre as imagens expandidas. Ao entrar na expansão de imagens do album principal, para a apresentação dinâmica.

### **Hora atual**

- Determina a hora com base na "localização" do usuário (_get.geojs.io/v1/ip/geo/\<ip>_) obtida pelo [endereço IP](https://api.ipify.org/?format=json).

- **Fuso Horário Atual**: Exibe a hora atual com base no fuso horário do usuário.

- **Exibe Data Atual**:

  - **Dia da Semana**: Mostra o dia da semana (ex.: Segunda-feira).

  - **Data Completa**: Exibe a data no formato dd / mmmm / yyyy.

  - **Número da Semana**: Mostra o número da semana atual no ano (ex.: 26ª semana).

  - **Texto de Saudação**: Mostra uma saudação personalizada de acordo com a hora do dia (ex.: "Bom Dia" ou "Boa Noite").

- **Exibe a Localização do Usuário**: Cidade, Estado/Região e País

- Exibe a hora em várias cidades ao redor do mundo

- **Porcentagem do Dia**: Mostra uma barra que representa a porcentagem do dia que já passou.

- **Porcentagem do Ano Decorrido**: Adiciona uma barra que exibe a porcentagem do ano que já passou.

## 🛠️ Tecnologias Utilizadas

- **React**: Para construção da interface do usuário.
- **[TypeScript](https://www.typescriptlang.org)**: Para segurança de tipos e melhor experiência de desenvolvimento.
- **Tailwind CSS**: Para estilização da aplicação.
- **[Vite](https://vitejs.dev)**: Para desenvolvimento rápido e ferramenta de build.
- **[React Router](https://reactrouter.com/en/main)**: Para navegação entre diferentes visualizações e  useSearchParams() para gerenciar parâmetros de consulta na URL.
- **[tailwind-merge](https://www.npmjs.com/package/tailwind-merge)**: Para evitar duplicação de classes utilizando Tailwind CSS

---

**_Obrigado pela atenção_**.
