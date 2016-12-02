<custom-parsers>
  <h1>{ title }</h1>

  <script>
    const name = 'bublé and cssnext'
    this.title = `Hello ${ name }!`
  </script>

  <style>
    :scope {
      --riot-color: #f04;
    }
    h1 {
      color: var(--riot-color);
      border-bottom: 1px solid var(--riot-color);
    }
  </style>
</custom-parsers>
