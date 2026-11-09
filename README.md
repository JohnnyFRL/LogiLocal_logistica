# GeoNexus — Sistema de Apoio à Localização de Instalações Logísticas

O **GeoNexus** é uma aplicação web desenvolvida como projeto acadêmico para apoiar decisões sobre a localização de centros de distribuição. A ferramenta reúne duas análises: o **método do centro de gravidade**, para sugerir uma localização teórica com base na demanda dos clientes, e a **comparação de instalações candidatas**, para identificar a opção com menor custo logístico estimado.

## Funcionalidades

### 1. Cadastro de clientes e análise do centro de gravidade

- Cadastro de clientes com nome, **longitude (X)**, **latitude (Y)** e demanda mensal (caixas).
- Listagem e exclusão dos clientes cadastrados.
- Armazenamento dos clientes no `localStorage` do navegador.
- Cálculo do centro de gravidade ponderado pela demanda, realizado no backend.
- Exibição das coordenadas calculadas e visualização dos clientes e do centro no mapa interativo.

### 2. Comparação de instalações candidatas

- Cadastro de possíveis instalações com nome, longitude (X), latitude (Y) e custo fixo mensal.
- Definição do custo unitário de transporte em **R$/caixa/km**.
- Estimativa do custo de transporte entre cada instalação e todos os clientes, considerando a demanda de cada um.
- Ranking das instalações pelo menor custo logístico total estimado.
- Exibição da instalação recomendada e da diferença de custo em relação à alternativa mais cara.

## Tecnologias

- **Next.js (App Router)** — frontend e rotas de API no mesmo projeto.
- **React e TypeScript** — interface e lógica da aplicação.
- **Tailwind CSS e CSS** — estilização.
- **Leaflet, React Leaflet e OpenStreetMap** — mapa interativo e marcadores geográficos.
- **localStorage** — persistência local dos clientes.

Não é necessário configurar um banco de dados para executar o MVP.

## Como executar o projeto

### Pré-requisitos

- Node.js e npm instalados (preferencialmente uma versão LTS compatível com a versão do Next.js do projeto).
- Acesso à internet para carregar os mapas do OpenStreetMap.

### Instalação

1. Clone o repositório e acesse a pasta do projeto:

   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd GeoNexus
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

4. Acesse [http://localhost:3000](http://localhost:3000).

### Verificar a compilação

```bash
npm run build
```

## Como usar

1. Na seção **Análise**, cadastre os clientes com coordenadas geográficas e demanda mensal.
2. Clique em **Calcular localização** para obter o centro de gravidade.
3. Observe no OpenStreetMap os **pontos verdes** (clientes) e o **ponto laranja** (centro calculado).
4. Na seção **Comparar instalações**, cadastre duas ou mais localizações candidatas, com seus respectivos custos fixos.
5. Informe o custo de transporte em **R$/caixa/km** e clique em **Comparar instalações**.
6. Consulte o ranking, o custo total estimado de cada alternativa e a instalação recomendada.

**Atenção à ordem das coordenadas:** no formulário, `X = longitude` e `Y = latitude`. Exemplo de Recife: `X = -34.8770`, `Y = -8.0476`. Utilize ponto como separador decimal.

## Metodologia de cálculo

### Centro de gravidade

O centro de gravidade é calculado pela média ponderada das coordenadas de cada cliente pela sua demanda:

\[
X_c = \frac{\sum_{i=1}^{n} X_i D_i}{\sum_{i=1}^{n} D_i}
\qquad
Y_c = \frac{\sum_{i=1}^{n} Y_i D_i}{\sum_{i=1}^{n} D_i}
\]

Em que:

- `X_i`: longitude do cliente `i`;
- `Y_i`: latitude do cliente `i`;
- `D_i`: demanda mensal do cliente `i`.

A aplicação utiliza a média ponderada de latitude e longitude como **aproximação regional**. Trata-se de uma referência teórica, e não de uma localização ótima garantida no terreno.

### Comparação de instalações

Para cada instalação candidata, a distância até cada cliente é estimada em quilômetros pela **fórmula de Haversine**. Em seguida:

\[
C_{transporte} = \sum_{i=1}^{n} (d_i \times D_i \times c)
\]

\[
C_{total} = C_{fixo} + C_{transporte}
\]

Em que:

- `d_i`: distância geográfica aproximada em quilômetros entre a instalação e o cliente `i`;
- `D_i`: demanda mensal do cliente `i`, em caixas;
- `c`: custo de transporte, em R$/caixa/km;
- `C_fixo`: custo fixo mensal da instalação.

A instalação com **menor custo total estimado** ocupa a primeira posição do ranking.

## Cenário de teste

### Clientes

| Cliente | Longitude (X) | Latitude (Y) | Demanda (caixas/mês) |
|---|---:|---:|---:|
| Recife | -34.8770 | -8.0476 | 100 |
| Olinda | -34.8553 | -8.0089 | 200 |
| Jaboatão | -35.0150 | -8.1128 | 150 |

O centro de gravidade esperado é aproximadamente **X = -34,9134** e **Y = -8,0521**, com demanda total de **450 caixas/mês**.

### Instalações candidatas

| Instalação | Longitude (X) | Latitude (Y) | Custo fixo mensal |
|---|---:|---:|---:|
| CD Recife | -34.8770 | -8.0476 | R$ 5.000,00 |
| CD Olinda | -34.8553 | -8.0089 | R$ 4.500,00 |

Com custo de transporte de **R$ 0,50/caixa/km**, a comparação deve recomendar **CD Olinda** neste cenário, considerando o modelo de distâncias em linha reta.

## Organização do projeto

```text
src/
├── app/
│   ├── api/
│   │   ├── calcular/
│   │   └── comparar/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── ClienteForm.tsx
│   ├── ResultadoAnalise.tsx
│   ├── MapaLocalizacao.tsx
│   └── ComparacaoInstalacoes.tsx
├── lib/
│   ├── centroGravidade.ts
│   ├── compararInstalacoes.ts
│   └── storage.ts
└── types/
    ├── clients.ts
    └── instalacao.ts
```

A estrutura acima resume os principais arquivos do projeto; outros arquivos auxiliares podem estar presentes no repositório.

## Limitações

- O OpenStreetMap é utilizado para **visualização**, não para obter rotas rodoviárias.
- A distância pela fórmula de Haversine representa uma aproximação **em linha reta**, sem trânsito, ruas, pedágios ou tempo de viagem.
- O centro de gravidade utiliza uma média ponderada regional de coordenadas geográficas; não considera disponibilidade de terrenos, zoneamento ou infraestrutura.
- Os clientes ficam salvos **somente no navegador e perfil utilizados**. O `localStorage` não é um banco de dados compartilhado.
- O cadastro das instalações candidatas é mantido no estado da interface e pode ser perdido ao atualizar a página.
- Os resultados são **estimativas de apoio à decisão** e não substituem estudos logísticos e financeiros detalhados.

## Contexto acadêmico

Projeto desenvolvido para aplicação prática de conceitos da disciplina de **Logística**, especialmente localização de instalações, centro de gravidade e comparação de alternativas com base em custos.

## Licença

Projeto acadêmico. A licença de uso ainda não foi definida.
