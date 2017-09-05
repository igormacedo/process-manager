## Setting up environment ##
1. Clone the repository, create the virtual environment and install the requirements
```
[~]$ git clone {url} processmanager
[~]$ cd processmanager
[processmanager]$ virtualenv venv
[processmanager]$ source venv/bin/activate # for linux
[processmanager]$ ./venv/Script/activate # for windows
(venv)[processmanager]$ pip install -r requirements.txt
```

## How to compile Python/C Process Manager Module ##
Go to c-module folder and run
```
python setup.py build
```

And add the procmanager.so file to the same folder as views.py

## How to run the program ##
Execute the following command
```
python run.py
```
To avoid errors, run without debug mode. And use Ctrl+F5 for reloading page without cache, when testing code

## Test programs ##
There are two test programs in tests/, which can be used for visualization on the Process Manager:
-   An infinite loop: this program is going to consume 100% of the core it is allocated to;
-   High memory usage: this program is going to do many malloc calls which will take up a lot of memory

To compile these programs, go to tests and run `make`. Then, simply run `./inf_loop` and `./high_mem` to have fun.

## Enunciado ##
Escreva um programa em C/C++ para gerenciar processos no SO (Linux), com as seguintes características:

-   Interface gráfica com listagem dos processos, indicando % de uso de CPU e Status.
-   Gráfico de uso de CPUs (opcional) dos processos.
-   Função de selecionar processos a serem listados (filtro).
-   Utilizar por exemplo o comando ps –auf | grep <nome_a ser_selecionado>.
-   Pode ser utilizado o comando pstree.
-   Função de matar, suspender ou continuar a execução de um determinado processo (escolher pelo seu PID).
-   Função para escolher em qual CPU um determinado processo (escolher pelo seu PID) irá executar.

No vídeo de apresentação:

-   Apresentar o grupo (integrantes, Disciplina, Universidade, semestre, ano).
-   Explicar brevemente como o programa foi desenvolvido
-   Testar as funcionalidade  filtro, para, continuar e matar processos.
-   Testar funcionalidade de alocação de CPU.
-   Exibir as interfaces funcionando. Pode utilizar o programa htop para efeito de comparação.
-   Exibir o gráfico de uso de CPU (opcional).

Sugestão para listas os processos:

-   Para quem for fazer em Linux, utilizar as informações contidas no diretório /proc.
-   Redirecionar o comando ps para um arquivo.
-   A cada segundo, dar refresh na tela.

Data de Entrega: postar o vídeo até 23:59 do dia 04-set-2017.

## Authors ##
-   Igor Macedo - **igormacedo94 at gmail.com**
-   Cadu Bentzen - **cadubentzen at gmail.com**
