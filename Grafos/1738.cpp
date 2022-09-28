// Algoritmos em Grafos (2022/1/570/COI-A/2332) //
// T2 (1738) - Version 1.5.3 //

/* 
Codinome: Grupo
Integrantes:
1. Derik Leonardo Rosvadoski Konisk
2. Paula Yanagawa Nizer
3. Vitor Siqueira
*/

#include <bits/stdc++.h> // Bibliotecas.
using namespace std;     // C++.
#define INF 999999999    // Infinito.
#define alf 26           // Letras do alfabeto.
#define maxN 201         // Define o valor máximo de N.
// Define cada no e seus respectivos valores
// [Posição de vertice A] [Posição de vertice B] ["Peso da aresta" definido pelo alfabeto]
int no[maxN][maxN][alf];
int n, u, v, flag; // Quantidade de vertices, Vertice inicial, Vertice final e caminho.
string s; // "Peso" do vertice

void iniciaGrafo() {                // Função para iniciar o Grafo.
  for (int i = 0; i < n; i++) {     // Roda i, que é o vertice inicial.
    for (int j = 0; j < n; j++) {   // Roda j, que é o vertice objetivo.
      for (int p = 0; p < alf; p++) // Roda p, que é o peso.
        no[i][j][p] = INF;          // Define tudo como INF.
    }
  }
}

void floydWarshall() {                // Função para iniciar o FlodyWarshall.
  for (int p = 0; p < n; p++) {       // Define os vertices vizinhos.
    for (int i = 0; i < n; i++) {     // Roda i, que é o vertice inicial.
      for (int j = 0; j < n; j++) {   // Roda j, que é o vertice objetivo.
        for (int a = 0; a < alf; a++) // Roda a, que é o peso.
          no[i][j][a] = min(no[i][j][a], no[i][p][a] + no[p][j][a]); // Verifica o caminho mais curto dos nós para os nós
      }
    }
  }
}

bool vazio(int x) { // Verifica se determinada variavel esta vazia
  if (!x) {
    return true;
  }
  return false;
}

void definePeso(){
    for (int i = 0; i < s.size(); i++) { // Passa pelos nós e define os pesos
        no[u][v][s[i] - 'a'] = 1; 
      }
}

void temCaminho(){
    for (int i = 0; i < alf; i++) {
        if (no[u][v][i] != INF) {// Se tiver caminho escrever a letra que corresponde
          cout << (char)(i + 'a'); // Escrevendo a letra correspondente ao caminho
          flag = 1; // Flag indicando que existe caminho.
        }
      }
}

void subtrai(){
    --u; // Passa por todos os elementos que seria de u ate 1
    --v; // Passa por todos os elementos que seria de v ate 1
}

int main() {
  while (1) { // Irá continuar a ser repetido ate que ocorra algum evento que o pare
    cin >> n; // Pede a quantidade de vertices.
    if (vazio(n)) { // Se n for nullo termina o codigo.
      return 0;
    }
    iniciaGrafo(); // Chamada da função de criação do grafo.
    while (1) { // Irá continuar a ser repetido ate que ocorra algum evento que o pare
      cin >> u >> v;  // Entra com os elementos A e B.
      if (vazio(u) && vazio(v)) { // Verifica se algum dos elementos é nulo e para o while caso ambos forem vazio
        break;
      }
      cin >> s; // Entra com o peso
      subtrai(); // Subtrai por 1 o valor de U e V
      definePeso(); // Define o peso das arestas
    }
    floydWarshall(); // Chamada da função FlodyWarshall.
    while (1) { // Irá continuar a ser repetido ate que ocorra algum evento que o pare
      cin >> u >> v;
      if (vazio(u) && vazio(v)) {// Verifica se algum dos elementos é nulo e para o while caso ambos forem vazio
        break;
      }
      subtrai(); // Subtrai por 1 o valor de U e V
      flag = 0; // Flag para definir se existe ou não caminho
      temCaminho();
      if (vazio(flag)) { // Se não tiver caminho.
        cout << '-'; // Escreve quando não existe caminho.
      }
      cout << endl;
    }
    cout << endl;
  }
}