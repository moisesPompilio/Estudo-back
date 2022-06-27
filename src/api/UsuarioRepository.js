module.exports = (app) => {
    const listar = async (req, res) => {
        const usuarios = await app.db("usuario").select("*"); 
        return res.json(usuarios); 
    }
    const getByName = async (req, res) => {
       const usuario = await app.db("usuario").where({name: req.body.name})
       return res.json()
    }
}