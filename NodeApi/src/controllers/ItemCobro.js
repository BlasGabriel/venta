import {prisma} from "../db.js";

export const listar = async(req, res, next) => {
    try{
        const itemCobros = await prisma.item_cobro.findMany({});
        res.json(itemCobros);
    }
    catch(error){
        next(error);
    }
}

export const buscarId = async(req, res, next) => {
    try{
        const id = parseInt(req.params.id);
        const itemCobro = await prisma.item_cobro.findFirst({
            where: {
                id_item_cobro: id
            }
        });
        res.json(itemCobro);
    }
    catch(error){
        next(error);
    }
}

export const buscarCuenta = async(req, res, next) => {
    try{
        const id_cuenta = parseInt(req.params.id_cuenta);

        const itemCobro = await prisma.item_cobro.findMany({
            where: {
                id_cuenta_cobrar: id_cuenta
            }
        });
        res.json(itemCobro);
    }
    catch(error){
        next(error);
    }
}

export const insertar = async(req, res, next) => {
    try{
        const itemCobro = req.body;
        
        //verificar que la cuenta exista y esté habilitada
        const cuenta_cobro = await prisma.cuenta_cobrar.findFirst({
            where: {
                id_cuenta_cobrar: itemCobro.id_cuenta_cobrar,
                estado: 1
            }
        });

        //se crea el item cobro si existe la cuenta
        if(cuenta_cobro){
            await prisma.item_cobro.create({
                data: itemCobro
            });
            res.json('Registro de item de cobro creado...');
        }
        else{
            //se emite el siguiente mensaje si la cuenta de cobro ingresada no existe
            res.json('La cuenta de cobro no existe...');
        }
    }
    catch(error){
        next(error);
    }
}

export const editar = async(req, res, next) => {
    try{
        const id = parseInt(req.params.id);
        const itemCobro = req.body;
        
        //verificar que la cuenta exista y esté habilitada
        const cuenta_cobro = await prisma.cuenta_cobrar.findFirst({
            where: {
                id_cuenta_cobrar: itemCobro.id_cuenta_cobrar,
                estado: 1
            }
        });

        //se modifica el item cobro si existe la cuenta
        if(cuenta_cobro){
            await prisma.item_cobro.update({
                data: itemCobro,
                where: {
                    id_item_cobro: id
                }
            });
            res.json('Registro de item de cobro editado...');
        }
        else{
            //se emite el siguiente mensaje si la cuenta de cobro ingresada no existe
            res.json('La cuenta de cobro no existe...');
        }
    }
    catch(error){
        next(error);
    }
}

export const eliminar = async(req, res, next) => {
    try{
        const id = parseInt(req.params.id);

        await prisma.item_cobro.delete({
            where: {
                id_item_cobro: id
            }
        });
        res.json('Registro de item de cobro eliminado...');
    }
    catch(error){
        next(error);
    }
}