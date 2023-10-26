

export const usuariosGet = (req, res) => {
    const params = req.query;
    console.log("🚀 ~ file: user.controller.js:12 ~ usuariosPut ~ params:", params)

    res.json({
        msg: "get API - controlador",
        params
    })
}
export const usuariosPut = (req, res) => {

    res.json({
        msg: "put API - controlador"
    })
}
export const usuariosPost = (req, res) => {
    const body = req.body;
    res.json({
        msg: "post API - controlador",
        body
    })
}

export const usuariosGetById = (req, res) => {
    const { id } = req.params;
    res.json({
        id,
        msg: "get by id API - controlador"
    })
}
export const usuariosDelete = (req, res) => {

    res.json({
        msg: "delete API - controlador"
    })
}
export const usuariosPatch = (req, res) => {

    res.json({
        msg: "patch API - controlador"
    })
}