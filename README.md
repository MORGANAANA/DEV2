# DEV2

Esse é o repositório principal do trabalho de Desenvolvimento de Sistemas 2.

# Responsáveis

Professor(res) Responsável(veis):

    1. Régio Michelin

Grupo de Desenvolvimento:

    1. Adriel Domagalski
    2. Gabriel Portal
    3. Mathias Gheno
    4. Morgana Goulart

Instituição(ões) Responsável(eis):

    1. Instituto Federal de Educação Ciência e Tecnologia do Rio Grande do Sul, Campus Restinga

# Sobre o Projeto

O foco do projeto é o desenvolvimento de uma aplicação Mobile. Essa aplicação tem como objetivo auxiliar estudantes que estão querendo ingressar em instituições de Ensino Superior. O foco da Aplicação são as Leituras Obrigatórias

# Arquitetura

    1. Pasta Mobile:
        1.1: Contem os arquivos necessários para a configuração e desenvolvimento do Mobile.
        1.2: Principais Tecnologias: Ionic, Cordova, Saas, PhoneGap, AngularJS.

    2. Pasta Rest:
        1.2: Servidor REST que fornece os dados para o Mobile.
        1.3: Principais Tecnologias: Node.JS, MongoDB, Express, Winston.

# Dependências Necessárias

Para o funcionamento do projeto você ter instalado no seu sistema operacional tais dependências:

    1. MongoDB
    2. Ionic
    3. Cordova
    4. Node.JS

# Instalando Dependências Necessárias (GNU/Linux)

    1. Instale o Node.JS no seu Sistema Operacional:

   > curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -

   > sudo apt-get install -y nodejs


    2. Instale o MongoDB no seu Sistema Operacional:

   > sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6

   > echo "deb [ arch=amd64,arm64 ] http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list

   > sudo apt-get update

   > sudo apt-get install -y mongodb-org

   > sudo gedit /etc/systemd/system/mongodb.service

    Adicione esses dados ao arquivo de texto:

    [Unit]
    Description=High-performance, schema-free document-oriented database
    After=network.target

    [Service]
    User=mongodb
    ExecStart=/usr/bin/mongod --quiet --config /etc/mongod.conf

    [Install]
    WantedBy=multi-user.target


   > sudo systemctl start mongodb

   > sudo systemctl enable mongodb

    3. Instalando o Ionic no Sistema Operacional

   > sudo npm install -g ionic cordova


# Instalando dependências necessárias no Windows

1. Instalando o MongoDB

    1.1 Faça o download em https://www.mongodb.com/download-center#community escolha a plataforma windows

    1.2. Faça a instalação do executável normalmente

    1.3. Copie o caminhdo do arquivo mongod.exe dentro da pasta de instalação do MongoDB ( Meu Computador > Arquivos de Programa > mongodb > server > 3.4 > bin > mongod.exe )

    1.4. Em 'Editar as Variáveis de Ambiente por Conta Própria' no Painel de Controle crie um 'novo', onde 'nomde da variavel' é: mongod e 'valor da variavel' é o endereço copiado no ultimo passo

    1.5. Abra o CMD ( WINDOWS + R > cmd > ENTER) e digite mongod

    1.6. Abra outro CMD e digite mongo
    
    1.7 **[Observação]**: Você não precisa utilizar o CMD para concluir a execução, basta executar o mongod.exe e o mongo.exe toda a vez que for utilizar o MongoDB

2. Instalando o Node.JS

    2.1: Acesse https://nodejs.org/en/download/ e faça o download do .msi de instalação do node.js
    
    2.2: Avance os passos de instalação normalmente
    
    2.3: teste o sucesso de instação no CMD
        
> node -v 
   
3. Instalando o Ionic e o Cordova

    3.1 No CMD digite:
        
> npm install ionic cordova -g 
   
   
# Adicionando dados no MongoDB (GNU/LINUX - Ubuntu & Windows)

    1. Inicie o mongod (O servidor)
    
   > mongod
   
    2. Entre na pasta Rest/Dados
    
   > cd Rest/dados
   
    3. Dentro da pasta execute o comando mongoimport
    
   > mongoimport --db app_livro --collection livro -drop --file livro.json 
   
   > mongoimport --db app_livro --collection questao --drop --file questao.json 

Se o windows não reconhecer o comando mongoimport você terá que fazer um caminho diferente

    1. copie os arquivo de Rest/dados para o C:\do Windows
    2. Acesse a pasta /bin no diretório de instalação do MongoDB
    3. No CMD execute
    
   > mongoimport --db app_livro --collection livro -drop --file **[caminhdoDoArquivo.json]**
      
   > mongoimport --db app_livro --collection questao --drop --file **[CaminhoDoArquivo.json]**
   
Exemplo:

   > mongoimport --db app_livro --collection questao --drop --file C:\livro.json
   
   > mongoimport --db app_livro --collection questao --drop --file C:\questao.json

# Rodando o Servidor Rest (GNU/Linux - Ubuntu & Windows )

    1. Baixe o projeto:

   > git clone https://github.com/MORGANAANA/DEV2.git

    2. Entre na pasta do projeto:

   > cd DEV2

    3. Entre na pasta do Rest

   > cd Rest

    4. Instale as dependências do NodeJS

   > npm install

    4. Rode o servidor

   > node index.js

# Rodando o Mobile (GNU/Linux - Ubuntu & Windows)

    1. Entre na pasta Mobile
    
   > cd Mobile
   
    2. Rode o Ionic
    
   > ionic serve --lab
   


