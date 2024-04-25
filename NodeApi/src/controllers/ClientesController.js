import {prisma} from '../db.js';

export const listar = async(req, res, next) => {
    try{
        const clientes = await prisma.cliente.findMany({
            where: {
                estado: 1
            },
            include: {
                ciudad: {
                    select: {descripcion: true}
                },
            }
        });
        res.json(clientes);
    }
    catch(error){
        next(error);
    }
}

export const buscarId = async(req, res, next) => {
    try{
        const id = parseInt(req.params.id);
        const cliente = await prisma.cliente.findFirst({
            where: {
                id_cliente: id,
                estado: 1
            },
            include: {
                ciudad: {
                    select: {descripcion: true}
                },
            }
        });
        if(!cliente){
            res.json('Registro de cliente no encontrado...');
        }
        else{
            res.json(cliente)
        }
    }
    catch(error){
        next(error);
    }
}
export const buscarRuc = async(req, res, next) => {
    try{
        const ruc = parseInt(req.params.ruc);
        const cliente = await prisma.cliente.findFirst({
            where: {
                // id_cliente: id,
                ruc: ruc,
                estado: 1
            },
            include: {
                ciudad: {
                    select: {descripcion: true}
                },
            }
        });
        if(!cliente){
            res.json('Registro de cliente no encontrado...');
        }
        else{
            res.json(cliente)
        }
    }
    catch(error){
        next(error);
    }
}

export const insertar = async(req, res, next) => {
    try{
        const cliente = req.body;

        //se verifica si existe otro registro con el mismo ruc
        const antiguoCliente = await prisma.cliente.findFirst({
            where: {
                ruc: cliente.ruc
            }
        });

        if(antiguoCliente){
            //se activa nuevamente el registro eliminado anteriormente y se actualizan sus datos
            if(antiguoCliente.estado == 0){
                await prisma.cliente.update({
                    where: {
                        id_cliente: antiguoCliente.id_cliente
                    },
                    data: {
                        descripcion: cliente.descripcion,
                        telefono: cliente.telefono,
                        direccion: cliente.direccion,
                        email: cliente.email,
                        opera_credito: cliente.opera_credito,
                        id_ciudad: cliente.id_ciudad,
                        estado: 1                  
                    }
                });
                res.json('Registro de cliente creado...');
            }
            else{
                res.json('El cliente ya existe...');
            }
        }
        else{
            //se crea un nuevo registro si no existe otro
            await prisma.cliente.create({
                data: cliente
            });
            res.json('Registro de cliente creado...');
        }
    }
    catch(error){
        next(error);
    }
}

export const editar = async(req, res, next) => {
    try{
        const id = parseInt(req.params.id);
        const cliente = req.body;

        //verificar que el ruc no esté asociado al registro de otro cliente
        const clienteRuc = await prisma.cliente.findFirst({
            where: {
                ruc: cliente.ruc
            }
        });

        //si no está asociado a otro cliente, entonces se edita el registro
        if(clienteRuc){
            if(clienteRuc.id_cliente == id){
                await prisma.cliente.update({
                    where: {
                        id_cliente: id
                    },
                    data: {
                        descripcion: cliente.descripcion,
                        ruc: cliente.ruc,
                        telefono: cliente.telefono,
                        direccion: cliente.direccion,
                        email: cliente.email,
                        opera_credito: cliente.opera_credito,
                        id_ciudad: cliente.id_ciudad
                    }
                });
                res.json('Regristro de cliente editado...');
            }
            else{
                res.json('El RUC ingresado pertenece a otro cliente...');
            }
        }
        else{
            await prisma.cliente.update({
                where: {
                    id_cliente: id
                },
                data: {
                    descripcion: cliente.descripcion,
                    ruc: cliente.ruc,
                    telefono: cliente.telefono,
                    direccion: cliente.direccion,
                    email: cliente.email,
                    opera_credito: cliente.opera_credito,
                    id_ciudad: cliente.id_ciudad
                }
            });
            res.json('Regristro de cliente editado...');
        }
    }
    catch(error){
        next(error);
    }
}

export const eliminar = async(req, res, next) => {
    try{
        const id = parseInt(req.params.id);
        const clienteEliminado = await prisma.cliente.update({
            where: {
                id_cliente: id
            },
            data: {
                estado: 0
            }
        }); 
        res.json('Cliente eliminado...')
    }
    catch(error){
        next(error);
    }
}