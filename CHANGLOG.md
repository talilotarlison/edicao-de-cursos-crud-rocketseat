É possível passar dados entre páginas utilizando a URL e pegar esses dados na outra página com **JavaScript**. O que você quer fazer é passar um parâmetro de consulta (query parameter) via URL e pegar esse valor na outra página usando JavaScript.

Aqui está um exemplo passo a passo para você entender como fazer isso:

### Passo 1: Passar o ID na URL (na página inicial)

Você pode gerar um link que passe um parâmetro `id` para outra página. No seu caso, a URL seria algo como `user.html?id=12`.

Exemplo de link na página inicial (`index.html`):

```html
<a href="user.html?id=12">Ir para a página do usuário 12</a>
```

Quando o usuário clicar no link, ele será redirecionado para `user.html` com o parâmetro `id=12` na URL.

### Passo 2: Capturar o Valor da URL na Página de Destino (`user.html`)

Agora, na página `user.html`, você pode usar JavaScript para **capturar** o valor do parâmetro `id` da URL.

#### Exemplo de como pegar o valor na página `user.html`:

```html
<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Página do Usuário</title>
</head>
<body>
  <h1>Página do Usuário</h1>
  <p>Usuário ID: <span id="user-id"></span></p>

  <script>
    // Função para pegar o parâmetro 'id' da URL
    function getUrlParameter(name) {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(name);
    }

    // Pega o valor do parâmetro 'id'
    const userId = getUrlParameter('id');

    // Exibe o valor na página
    document.getElementById('user-id').textContent = userId;
  </script>
</body>
</html>
```

### Explicação do Código:

1. **`getUrlParameter(name)`**: Esta função usa o método `URLSearchParams` para pegar o valor do parâmetro `name` da URL. O método `window.location.search` retorna a parte da URL que contém os parâmetros de consulta (exemplo: `?id=12`).

2. **`urlParams.get(name)`**: O `get()` busca o valor do parâmetro especificado na URL, nesse caso, `id`.

3. **`document.getElementById('user-id').textContent = userId;`**: Após pegar o valor do parâmetro, você pode manipulá-lo na página. Aqui, ele é inserido dentro de um elemento com o `id="user-id"`, o que vai exibir o valor na tela.

### Passo 3: Exemplo de Como Funciona

1. Quando você acessar a página `index.html` e clicar no link **Ir para a página do usuário 12**, você será redirecionado para `user.html?id=12`.

2. Na página `user.html`, o JavaScript vai pegar o valor `12` do parâmetro `id` da URL e exibirá esse valor na página.

---

### Passos Adicionais (se necessário)

* **Validação de Dados**: É sempre bom validar o valor que vem da URL para evitar erros. Por exemplo, verificar se o valor de `id` realmente existe e é um número válido.

  Exemplo de validação simples:

  ```javascript
  const userId = getUrlParameter('id');
  if (userId && !isNaN(userId)) {
    document.getElementById('user-id').textContent = userId;
  } else {
    document.getElementById('user-id').textContent = 'ID inválido';
  }
  ```

* **Redirecionamento Condicional**: Se o parâmetro `id` não existir ou for inválido, você pode redirecionar o usuário para outra página ou exibir uma mensagem de erro.

### Considerações:

* Esse método só funciona para **pequenos volumes de dados** que você deseja passar entre páginas. Se você precisar de mais dados ou dados mais complexos, talvez seja melhor usar **localStorage**, **sessionStorage**, ou até mesmo fazer uma requisição para um servidor para pegar as informações.

---

Para deixar a barra de rolagem cinza em toda a página, use CSS com as propriedades scrollbar-color (para navegadores como Firefox) e os seletores ::-webkit-scrollbar, ::-webkit-scrollbar-track e ::-webkit-scrollbar-thumb (para navegadores baseados em Webkit como Chrome e Safari). Você deve aplicar um seletor body ou html a esses estilos para que eles afetem a página inteira.
Exemplo de código CSS
```css
/* Para Firefox e outros navegadores que suportam scrollbar-color */
body {
  scrollbar-color: #888 #f1f1f1; /* Cor do "thumb" e cor do "track" */
  scrollbar-width: thin; /* Outros valores: 'auto', 'none' */
}

/* Para navegadores baseados em Webkit (Chrome, Safari, Edge) */
body::-webkit-scrollbar {
  width: 12px; /* Largura da barra de rolagem */
}

body::-webkit-scrollbar-track {
  background: #f1f1f1; /* Cor de fundo do trilho */
}

body::-webkit-scrollbar-thumb {
  background: #888; /* Cor da barra (o "thumb") */
}

/* Para dar um efeito de hover (opcional) */
body::-webkit-scrollbar-thumb:hover {
  background: #555;
}
```
### Como aplicar

- Em um arquivo CSS externo: Adicione-o diretamente ao seu arquivo .css, aplicando-o ao seletor body.
