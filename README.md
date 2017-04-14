# DEV2

Esse é o repositório principal do trabalho de Desenvolvimento de Sistemas 2.

# Responsáveis

Professor(res) Responsável(veis):
    1.Régio Michelin

Grupo de Desenvolvimento:
    1. Adriel Domagalski
    2. Gabriel Portal
    3. Mathias Gheno
    4. Morgana Goulart

Instituição(ões):
    1. Instituto Federal de Ciências e Técnologias do Rio Grande do Sul Campus Restinga

# Sobre o Projeto

O foco do projeto é o desenvolvimento de uma aplicação Mobile. Essa aplicação tem como objetivo auxiliar estudantes que estão querendo ingressar em instituições de Ensino Superior. O foco da Aplicação são as Leituras Obrigatórias

# Arquitetura

    1. Pasta Mobile:
        1.1: Contem os arquivos necessários para a configuração e desenvolvimento do Mobile.
        1.2: Principais Tecnologias: Ionic, Cordova, Saas, PhoneGap, AngularJS.

    2. Pasta Rest:
        1.2: Servidor REST que fornece os dados para o Mobile.
        1.3: Principais Tecnologias: Node.JS, MongoDB, Express, Winston.


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



# Rodando o Servidor Rest (GNU/Linux - Ubuntu)

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






