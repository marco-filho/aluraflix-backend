const video = {
    titulo: 'Buraco Negro | Nerdologia',
    descricao: 'Neste episódio do Nerdologia vamos ser sugados para dentro de um BURACO NEGRO!',
    url: 'ThG5RHBR7dA',
    categoriaId: 1
}

const categoria = {
    titulo: 'Azul',
    cor: '00f'
}

const req = {
    query: {},
    params: {}
}

const res = {
    _code: null,
    _response: null,
    status(code) {
        if(!code) return this._code
        this._code = code
        return this
    },
    json(response) {
        if(!response) return this.response
        this.response = response
        return this
    }
}

module.exports = {
    req: req,
    res: res,
    Video: video,
    Categoria: categoria,
    Videos: [
        {...video},
        {...video}
    ],
    Categorias: [
        {...categoria},
        {...categoria}
    ],
}