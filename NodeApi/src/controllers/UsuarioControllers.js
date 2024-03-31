import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
// El controller de los usuarios se ralizo para tener compatibilidad con los demas modulos.
// utilizando el mismo metodo de la base de datos.
// Por eso las sentencias SQL 

export const insertarUsuario = async (req, res, next) => {
    try {
        const { id_persona, id_perfil, login, password } = req.body;
        const user = await prisma.$queryRaw`
            INSERT INTO usuario (id_persona, id_perfil, login, password, estado) 
            VALUES (${id_persona}, ${id_perfil}, ${login}, SHA2(${password}, 256), 1);
        `;
        res.json(user);
    } catch (error) {
        next(error);
    }
}


export const buscarUsuarioActivo = async (req, res, next) => {
    try {
        const { login, password } = req.body;
        const usuario = await prisma.$queryRaw`
            SELECT * FROM usuario 
            WHERE login = ${login} 
            AND password = SHA2(${password}, 256) 
            AND estado = 1;
        `;
        res.json(usuario);
    } catch (error) {
        next(error);
    }
}
